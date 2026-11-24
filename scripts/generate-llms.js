// Generate public/llms.txt (llmstxt.org) from the same sources as the pages:
// the article list and the product facts in config.js. The .md files it links
// are written at build time next to each page (scripts/markdown-copies.js).
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { articles } from '../src/blog/articles.js'
import { FREE_EXPORTS, PRODUCT_SUMMARY, SITE_URL, STORE_URL } from '../src/config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = resolve(__dirname, '../public/llms.txt')

const link = (title, path, note) => `- [${title}](${SITE_URL}${path})${note ? `: ${note}` : ''}`

const txt = `# FinGrab

> ${PRODUCT_SUMMARY}

FinGrab adds a button to Yahoo Finance quote pages (stocks, ETFs, indices). One click exports date, open, high, low, close, adjusted close and volume as CSV, in daily, weekly or monthly intervals. The data comes straight from Yahoo Finance and is processed locally in the browser. No signup, no API key.

Pricing: 6 months of prices are free, always, in every interval. 1 year, 2 years, 5 years and full history: ${FREE_EXPORTS} free exports, then the paid plan. Payment runs through ExtPay.

## Pages

${link('FinGrab home', '/index.md', 'what FinGrab does, how it works, what it exports, FAQ')}
${link('Get stock prices into Excel without code', '/stock-prices-in-excel.md', 'step-by-step walkthrough, CSV columns, alternatives, FAQ')}

## Guides

${articles.map(a => link(a.title, `/blog/${a.slug}.md`, a.description)).join('\n')}

## Optional

- [Install FinGrab from the Chrome Web Store](${STORE_URL})
${link('Privacy policy', '/privacy.md', 'permissions and data handling')}
${link('Blog index', '/blog.md')}
- [Contact](mailto:jens.laufer@solytics.de)
`

writeFileSync(outPath, txt)
console.log(`llms.txt written with ${articles.length} guides`)
