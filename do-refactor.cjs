#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve('.');
const srcDir = path.join(root, 'src');
const testsDir = path.join(root, 'tests');
const oldDir = path.join(srcDir, 'providers');
const newDir = path.join(srcDir, 'provider');

// ============================
// STEP 1: Copy providers -> provider
// ============================
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const sp = path.join(src, entry.name);
    const dp = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(sp, dp);
    else fs.copyFileSync(sp, dp);
  }
}
copyDir(oldDir, newDir);
console.log('Copied src/providers -> src/provider');
fs.rmSync(oldDir, { recursive: true });
console.log('Removed src/providers');

// ============================
// STEP 2: Move tests to tests/ dir (flattened)
// ============================
let moved = 0;
function walkMove(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkMove(fp);
    } else if (entry.name.endsWith('.test.ts')) {
      const rel = path.relative(srcDir, fp);          // provider/address/__tests__/address.test.ts
      const parts = rel.split(path.sep);
      const ti = parts.indexOf('__tests__');
      if (ti === -1) continue;

      // tests/provider/address/address.test.ts
      const newParts = [testsDir, ...parts.slice(1, ti), parts[parts.length - 1]];
      const newPath = path.join(...newParts);

      let content = fs.readFileSync(fp, 'utf-8');

      // Depth from tests/: tests/address/address.test.ts = segments.length
      const testRel = path.relative(testsDir, newPath);
      const segments = testRel.split(path.sep);
      const ups = segments.length;  // go up past all dirs including the test dir level
      const prefix = '../'.repeat(ups) + 'src/';

      // Replace old import paths
      const maps = {
        "'../../../index'": `"${prefix}index"`,
        '"../../../index"': `"${prefix}index"`,
        "'../../dictionary'": `"${prefix}dictionary"`,
        '"../../dictionary"': `"${prefix}dictionary"`,
        "'../../generator'": `"${prefix}generator"`,
        '"../../generator"': `"${prefix}generator"`,
      };
      for (const [old, nw] of Object.entries(maps)) {
        if (content.includes(old)) content = content.split(old).join(nw);
      }

      fs.mkdirSync(path.dirname(newPath), { recursive: true });
      fs.writeFileSync(newPath, content);
      fs.unlinkSync(fp);
      moved++;
      console.log(`  ${rel} -> tests/${segments.join('/')}`);
    }
  }
}
walkMove(newDir);

// Clean empty __tests__ dirs
function cleanEmpty(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '__tests__') {
        fs.rmSync(fp, { recursive: true });
      } else {
        cleanEmpty(fp);
      }
    }
  }
}
cleanEmpty(newDir);

// ============================
// STEP 3: Update src/index.ts imports
// ============================
const indexPath = path.join(srcDir, 'index.ts');
let idx = fs.readFileSync(indexPath, 'utf-8');
idx = idx.replace(/\.\/providers\//g, './provider/');
fs.writeFileSync(indexPath, idx);

// ============================
// STEP 4: Update provider source imports (../../ -> ../ etc)
// ============================
function fixImports(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fixImports(fp);
    } else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.test.ts')) {
      let c = fs.readFileSync(fp, 'utf-8');
      let ch = false;
      // provider/X/index.ts has depth 1 from provider/ -> ../../generator = src/generator
      // should be ../generator
      if (c.includes('../../generator')) {
        c = c.split('"../../generator"').join('"../generator"');
        c = c.split("'../../generator'").join("'../generator'");
        ch = true;
      }
      if (c.includes('../../dictionary')) {
        c = c.split('"../../dictionary"').join('"../dictionary"');
        c = c.split("'../../dictionary'").join("'../dictionary'");
        ch = true;
      }
      if (ch) {
        fs.writeFileSync(fp, c);
        console.log(`  Fixed imports: ${path.relative(srcDir, fp)}`);
      }
    }
  }
}
fixImports(newDir);

console.log(`\nDone! Moved ${moved} test files. src/providers -> src/provider -> tests/`);