#!/usr/bin/env node
// Usage: node scripts/update-listing.mjs
// Walks through all listings missing a direct Etsy link and prompts for the URL.

import { readFileSync, writeFileSync } from 'fs';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const SHOP_FILE = join(__dir, '../src/data/shop.ts');

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q, resolve));

async function main() {
  let shopTs = readFileSync(SHOP_FILE, 'utf8');

  // Find all entries missing etsyListingId
  const entryPattern = /\{\s*sku:\s*'([^']+)'[^}]*title:\s*'([^']+)'[^}]*\}/gs;
  const missing = [];
  let m;
  while ((m = entryPattern.exec(shopTs)) !== null) {
    if (!m[0].includes('etsyListingId')) {
      missing.push({ sku: m[1], title: m[2] });
    }
  }

  if (missing.length === 0) {
    console.log('All listings already have direct links!');
    rl.close(); return;
  }

  console.log(`\n${missing.length} listings need direct links. Press Enter to skip any.\n`);

  for (const item of missing) {
    const input = (await ask(`"${item.title}"\n  Etsy URL (or Enter to skip): `)).trim();

    if (!input) { console.log('  Skipped.\n'); continue; }

    const match = input.match(/\/listing\/(\d+)/);
    if (!match) { console.log('  No listing ID found in URL — skipped.\n'); continue; }

    const listingId = match[1];

    // Re-read in case previous iteration changed it
    shopTs = readFileSync(SHOP_FILE, 'utf8');

    const skuEscaped = item.sku.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const blockRegex = new RegExp(`(\\{[^}]*sku:\\s*'${skuEscaped}'[^}]*)(\\s*\\},)`, 's');

    if (!blockRegex.test(shopTs)) {
      console.log(`  Could not find entry for SKU '${item.sku}' — skipped.\n`);
      continue;
    }

    const updated = shopTs.replace(blockRegex, `$1\n    etsyListingId: '${listingId}',$2`);
    writeFileSync(SHOP_FILE, updated, 'utf8');
    console.log(`  Linked to listing ${listingId}\n`);
  }

  rl.close();
  console.log('Done! Run "git add src/data/shop.ts && git commit -m \'Add direct listing links\' && git push" when ready.');
}

main().catch(err => { console.error(err); process.exit(1); });
