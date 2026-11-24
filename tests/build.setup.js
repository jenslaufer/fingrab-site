// Builds dist/ once before the suite. Tests that read the build output share
// it; building per file would race on dist/ when vitest runs files in parallel.
import { execSync } from 'node:child_process'

export default function setup() {
    execSync('npm run build', { stdio: 'inherit' })
}
