import { describe, it, expect } from 'vitest'
import { createRouter, createMemoryHistory } from 'vue-router'
import { routes } from '../src/routes.js'
import { articles } from '../src/blog/articles.js'

// vite-ssg prerenders every static page as a FLAT file (dist/privacy.html), and
// GitHub Pages serves that file at both /privacy and /privacy.html. The .html URL
// is the one pasted into external forms that reject fragments — e.g. the Chrome
// Web Store privacy-policy field.
//
// Before the fix, the SPA had no route for /privacy.html: it hydrated, missed,
// and the catch-all redirected to '/'. A visitor saw the prerendered policy for a
// blink and then the homepage — a privacy-policy URL that shows no policy.
const resolve = async path => {
    const router = createRouter({ history: createMemoryHistory(), routes })
    await router.push(path)
    return router.currentRoute.value
}

// What the URL actually renders — the identity that must match the clean URL.
const componentOf = route => route.matched.at(-1)?.components?.default

describe('.html URLs of prerendered pages', () => {
    it.each([
        ['/privacy.html', '/privacy'],
        ['/blog.html', '/blog'],
        ['/stock-prices-in-excel.html', '/stock-prices-in-excel'],
    ])('%s stays on its page instead of redirecting to the homepage', async (htmlPath, cleanPath) => {
        const route = await resolve(htmlPath)

        expect(route.path).toBe(htmlPath)
        expect(componentOf(route)).toBe(componentOf(await resolve(cleanPath)))
        expect(componentOf(route)).not.toBe(componentOf(await resolve('/')))
    })

    it('serves the article for a blog .html URL', async () => {
        const { slug } = articles[0]
        const route = await resolve(`/blog/${slug}.html`)

        expect(componentOf(route)).toBe(componentOf(await resolve(`/blog/${slug}`)))
        // BlogArticle looks the article up by this param — with the .html suffix
        // still attached the lookup misses and rendering throws on `article.title`.
        expect(route.params.slug).toBe(slug)
    })
})
