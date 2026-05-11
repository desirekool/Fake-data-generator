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
fs.rmSync(oldDir, { recursive: true });
console.log('Renamed src/providers -> src/provider\n');

// ============================
// STEP 2: Move tests & update imports
// ============================
let moved = 0;
function walkMove(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkMove(fp);
    } else if (entry.name.endsWith('.test.ts')) {
      const rel = path.relative(srcDir, fp);
      const parts = rel.split(path.sep);
      const ti = parts.indexOf('__tests__');
      if (ti === -1) continue;

      // New path: tests/provider/address/address.test.ts
      const newParts = [testsDir, ...parts.slice(1, ti), parts[parts.length - 1]];
      const newPath = path.join(...newParts);

      let content = fs.readFileSync(fp, 'utf-8');

      // All old test imports use ../../../ to reach src root
      // New tests use ../../src to reach src root
      content = content.split("'../../../index'").join("'../../src/index'");
      content = content.split('"../../../index"').join('"../../src/index"');
      content = content.split("'../../../dictionary'").join("'../../src/dictionary'");
      content = content.split('"../../../dictionary"').join('"../../src/dictionary"');
      content = content.split("'../../../generator'").join("'../../src/generator'");
      content = content.split('"../../../generator"').join('"../../src/generator"');

      fs.mkdirSync(path.dirname(newPath), { recursive: true });
      fs.writeFileSync(newPath, content);
      fs.unlinkSync(fp);
      moved++;
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
        try { fs.rmSync(fp, { recursive: true }); } catch(e) {}
      } else cleanEmpty(fp);
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

console.log(`Moved ${moved} test files. src/providers -> src/provider -> tests/\n`);