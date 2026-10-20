import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs'
import { join, extname } from 'path'
import { gzipSync, brotliCompressSync, constants } from 'zlib'

const root = join(import.meta.dirname, '..')
const resultsDir = join(root, 'results')

function sumAssets(distDir) {
  const assetsDir = join(distDir, 'assets')
  let raw = 0, gzip = 0, brotli = 0
  let files
  try {
    files = readdirSync(assetsDir)
  } catch {
    return { raw: 0, gzip: 0, brotli: 0 }
  }
  for (const f of files) {
    const ext = extname(f)
    if (ext === '.js' || ext === '.css') {
      const buf = readFileSync(join(assetsDir, f))
      raw += buf.length
      gzip += gzipSync(buf, { level: 9 }).length
      brotli += brotliCompressSync(buf, {
        params: { [constants.BROTLI_PARAM_QUALITY]: 11 }
      }).length
    }
  }
  return { raw, gzip, brotli }
}

const entries = readdirSync(root)
  .filter(d => d.startsWith('dist-') && statSync(join(root, d)).isDirectory())
  .map(d => d.replace('dist-', ''))

const results = {}
for (const entry of entries) {
  results[entry] = sumAssets(join(root, `dist-${entry}`))
}

const baseline = results.baseline || { raw: 0, gzip: 0, brotli: 0 }

const output = {}
for (const [name, sizes] of Object.entries(results)) {
  if (name === 'baseline') {
    output[name] = { ...sizes, added_raw: 0, added_gzip: 0, added_brotli: 0 }
  } else {
    output[name] = {
      ...sizes,
      added_raw: sizes.raw - baseline.raw,
      added_gzip: sizes.gzip - baseline.gzip,
      added_brotli: sizes.brotli - baseline.brotli,
    }
  }
}

writeFileSync(join(resultsDir, 'bundle-size.json'), JSON.stringify(output, null, 2))

// Print table
console.log('\n| Library | Raw Total | Gzip Total | Brotli Total | Raw Added | Gzip Added | Brotli Added |')
console.log('|---|---|---|---|---|---|---|')
for (const [name, s] of Object.entries(output).sort((a, b) => a[1].added_gzip - b[1].added_gzip)) {
  console.log(`| ${name} | ${s.raw} | ${s.gzip} | ${s.brotli} | ${s.added_raw} | ${s.added_gzip} | ${s.added_brotli} |`)
}
