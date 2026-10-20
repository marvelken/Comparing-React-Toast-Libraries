import { execSync } from 'child_process'
import { readdirSync, writeFileSync, mkdirSync } from 'fs'
import { basename, join } from 'path'

const root = join(import.meta.dirname, '..')
const entriesDir = join(root, 'src', 'entries')
const entries = readdirSync(entriesDir)
  .filter(f => f.endsWith('.tsx'))
  .map(f => basename(f, '.tsx'))

for (const entry of entries) {
  const outDir = `dist-${entry}`
  const htmlFile = `entry-${entry}.html`

  // Create a minimal HTML file pointing to this entry
  writeFileSync(
    join(root, htmlFile),
    `<!doctype html>
<html lang="en">
  <head><meta charset="UTF-8" /></head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/entries/${entry}.tsx"></script>
  </body>
</html>`
  )

  console.log(`\n=== Building: ${entry} → ${outDir} ===`)
  try {
    execSync(
      `npx vite build --outDir ${outDir} --config vite.config.ts`,
      {
        cwd: root,
        stdio: 'inherit',
        env: {
          ...process.env,
          VITE_ENTRY: htmlFile,
        },
      }
    )
    console.log(`✓ ${entry} built successfully`)
  } catch (e) {
    console.error(`✗ ${entry} build failed:`, e.message)
  }
}
