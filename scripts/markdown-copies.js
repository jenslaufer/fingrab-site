// Write a Markdown copy next to every prerendered page (dist/x.html ->
// dist/x.md), converted from the same HTML visitors get. llms.txt links them.
import { readFileSync, writeFileSync } from 'node:fs'
import TurndownService from 'turndown'

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' })
const attr = (node, name) => node.getAttribute?.(name) ?? ''
// Rules added later win, so the most specific comes last.
// Tailwind `block` spans and buttons render as their own lines; keep them apart.
turndown.addRule('block', {
    filter: node => node.nodeName === 'BUTTON' || /(^|\s)block(\s|$)/.test(attr(node, 'class')),
    replacement: content => `\n\n${content.trim()}\n\n`,
})
// A card link wrapping a heading becomes a linked heading plus its text.
turndown.addRule('cardLink', {
    filter: node => node.nodeName === 'A' && node.querySelector('h1,h2,h3,h4,h5,h6'),
    replacement: (content, node) => {
        const heading = node.querySelector('h1,h2,h3,h4,h5,h6')
        const text = node.querySelector('p')?.textContent.trim()
        return `[${heading.textContent.trim()}](${attr(node, 'href')})${text ? `: ${text}` : ''}`
    },
})
// Decorative numbers and icons ("01", "+") carry no content.
turndown.addRule('decorative', { filter: node => attr(node, 'aria-hidden') === 'true', replacement: () => '' })

const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
const pick = (html, re) => decode(html.match(re)?.[1] ?? '')

export function toMarkdown(html, url, base) {
    const title = pick(html, /<title>([^<]*)<\/title>/)
    const description = pick(html, /<meta name="description" content="([^"]*)"/)
    const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1]
    if (!main) throw new Error(`markdown-copies: no <main> in ${url}`)
    const body = turndown.turndown(main).replace(/\]\(\//g, `](${base}/`)
    return [`# ${title}`, description && `> ${description}`, `Source: ${url}`, body].filter(Boolean).join('\n\n') + '\n'
}

// routes: prerendered paths like '/', '/blog/x'; dist: absolute build dir.
export function writeMarkdownCopies(dist, routes, base) {
    for (const route of routes) {
        const file = route === '/' ? '/index' : route
        const html = readFileSync(`${dist}${file}.html`, 'utf-8')
        writeFileSync(`${dist}${file}.md`, toMarkdown(html, `${base}${route}`, base))
    }
}
