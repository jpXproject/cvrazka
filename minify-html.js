/**
 * minify-html.js — Build script untuk production deploy
 * 
 * Cara pakai:
 *   node minify-html.js
 * 
 * Hasil: file *.min.html di folder /dist/
 * Atau: jalankan dengan argumen --inplace untuk timpa file asli
 */

const fs = require('fs');
const path = require('path');

const HTML_FILES = [
  'index.html',
  'layanan.html',
  'tentang.html',
  'portofolio.html',
  'kontak.html',
  'admin.html'
];

const JS_FILES = [
  'supabase-loader.js'
];

const inplace = process.argv.includes('--inplace');
const outDir = inplace ? '.' : 'dist';

if (!inplace && !fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// === MINIFIERS ===

function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove whitespace around brackets
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*,\s*/g, ',')
    // Collapse multiple spaces
    .replace(/\s+/g, ' ')
    // Remove trailing semicolons before }
    .replace(/;}/g, '}')
    // Trim
    .trim();
}

function minifyJS(js) {
  return js
    // Remove single-line comments
    .replace(/\/\/.*$/gm, '')
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    // Restore necessary spaces after keywords
    .replace(/\b(var|let|const|if|else|for|while|function|return|typeof|new|delete|try|catch|finally|switch|case|break|continue|do|in|of|class|import|export|default|from|async|await)\s+/g, '$1 ')
    // Remove spaces around parens and brackets
    .replace(/\s*\(\s*/g, '(')
    .replace(/\s*\)\s*/g, ')')
    .replace(/\s*\{\s*/g, '{')
    .replace(/\s*\}\s*/g, '}')
    .replace(/\s*\[\s*/g, '[')
    .replace(/\s*\]\s*/g, ']')
    // Remove spaces around operators
    .replace(/\s*([+\-*/%=<>!&|^~?:])\s*/g, '$1')
    // Fix template literal spacing
    .replace(/`\s+/g, '`')
    .replace(/\s+`/g, '`')
    // Remove trailing semicolons before }
    .replace(/;\s*}/g, '}')
    .trim();
}

function minifyHTML(html) {
  return html
    // Remove HTML comments (but not conditionals)
    .replace(/<!--[\s\S]*?-->/g, '')
    // Collapse whitespace in text nodes
    .replace(/>\s+</g, '><')
    .replace(/>\s+/g, '> ')
    .replace(/\s+</g, ' <')
    // Collapse multiple spaces
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// === PROCESS HTML FILES ===

for (const file of HTML_FILES) {
  if (!fs.existsSync(file)) {
    console.log(`⚠️  ${file} not found, skipping`);
    continue;
  }

  let html = fs.readFileSync(file, 'utf8');
  const originalSize = html.length;

  // Minify inline CSS inside <style> tags
  html = html.replace(/<style>([\s\S]*?)<\/style>/g, (match, css) => {
    return '<style>' + minifyCSS(css) + '</style>';
  });

  // Minify inline JS inside <script> tags (except data-* attributes)
  html = html.replace(/<script>([\s\S]*?)<\/script>/g, (match, js) => {
    // Don't minify if it contains template literals with HTML (can break)
    if (js.includes('innerHTML') || js.includes('insertAdjacentHTML')) {
      // Still remove comments, but preserve whitespace in template literals
      const cleaned = js
        .replace(/\/\/.*$/gm, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      return '<script>' + cleaned + '</script>';
    }
    return '<script>' + minifyJS(js) + '</script>';
  });

  // Minify HTML structure
  html = minifyHTML(html);

  const minSize = html.length;
  const savings = ((1 - minSize / originalSize) * 100).toFixed(1);
  console.log(`📄 ${file}: ${originalSize} → ${minSize} B (${savings}% saved)`);

  const outPath = inplace ? file : outDir + '/' + file.replace('.html', '.min.html');
  fs.writeFileSync(outPath, html, 'utf8');
}

// === PROCESS JS FILES ===

for (const file of JS_FILES) {
  if (!fs.existsSync(file)) {
    console.log(`⚠️  ${file} not found, skipping`);
    continue;
  }

  let js = fs.readFileSync(file, 'utf8');
  const originalSize = js.length;

  const minified = minifyJS(js);
  const minSize = minified.length;
  const savings = ((1 - minSize / originalSize) * 100).toFixed(1);
  console.log(`📜 ${file}: ${originalSize} → ${minSize} B (${savings}% saved)`);

  const outPath = inplace ? file : outDir + '/' + file.replace('.js', '.min.js');
  fs.writeFileSync(outPath, minified, 'utf8');
}

console.log('\n✅ Minifikasi selesai!');
if (!inplace) {
  console.log('📂 Hasil ada di folder /dist/');
  console.log('💡 Gunakan: node minify-html.js --inplace untuk timpa file asli');
}
