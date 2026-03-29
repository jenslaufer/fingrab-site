# FinGrab Site

Landing page and SEO blog for the FinGrab Chrome extension. Exports financial data from Yahoo Finance as CSV.

Live at [fingrab.app](https://fingrab.app).

## Stack

Vue 3 + Vite + Tailwind CSS v4 + Vue Router (hash mode) + @unhead/vue (SEO).

## Structure

```
src/
  components/
    Home.vue              # Landing page (hero, features, FAQ, CTA)
    BlogHome.vue          # Blog listing
    BlogArticle.vue       # Article wrapper (dynamic routing)
    RelatedArticles.vue   # Cross-linking component
    PrivacyPolicy.vue
    articles/             # 9 blog article components
  blog/
    articles.js           # Article metadata (slug, title, date)
  main.js                 # Router config + content props
  style.css               # Tailwind + prose styling
```

## Blog Articles (9)

Stock data export, Excel analysis, portfolio tracking, stock screeners, Yahoo Finance API alternatives, Google Finance, technical analysis, performance comparison.

## Development

```bash
npm install
npm run dev       # Dev server
npm run build     # Production build
npm test          # Vitest (jsdom)
```

## Deployment

GitHub Actions on push to `main` -> builds -> publishes to `site` branch -> GitHub Pages with CNAME `fingrab.app`.
