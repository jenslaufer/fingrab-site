import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './routes.js'
import './style.css'

// vite-ssg manages the router history (HTML5 history on the client,
// memory history while prerendering) — no hash mode. The route list to
// prerender lives in ssgOptions.includedRoutes (vite.config.js).
export const createApp = ViteSSG(App, { routes })
