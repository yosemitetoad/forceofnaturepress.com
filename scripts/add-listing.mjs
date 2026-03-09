#!/usr/bin/env node
// Usage: node scripts/add-listing.mjs
// Interactive prompt to add a new Etsy listing to src/data/shop.ts

import { readFileSync, writeFileSync } from 'fs';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const SHOP_FILE = join(__dir, '../src/data/shop.ts');

const CATEGORIES = [
  { key: 'stickers',       label: 'Sticker' },
  { key: 'sticker-sheets', label: 'Sticker Sheet' },
  { key: 'keychains',      label: 'Keychain' },
  { key: 'earrings',       label: 'Earrings' },
  { key: 'buttons',        label: 'Button / Pin' },
  { key: 'magnets',        label: 'Magnet' },
  { key: 'prints',         label: 'Print' },
  { key: 'gift-sets',      label: 'Gift Set / Bundle' },
];

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q, resolve));

async function main() {
  console.log('\n--- Add Etsy Listing to Shop ---\n');

  // Listing URL
  let listingId = '';
  while (!listingId) {
    const url = await ask('Etsy listing URL: ');
    const match = url.match(/\/listing\/(\d+)/);
    if (match) {
      listingId = match[1];
    } else {
      console.log('  Could not find listing ID in URL. Paste the full Etsy listing URL.');
    }
  }

  // Check for duplicate
  const shopTs = readFileSync(SHOP_FILE, 'utf8');
  if (shopTs.includes(listingId)) {
    console.log(`\nListing ${listingId} is already in shop.ts — nothing to do.`);
    rl.close();
    return;
  }

  // Title
  const title = (await ask('Listing title: ')).trim();

  // Price
  let price = 0;
  while (!price) {
    const raw = await ask('Price (numbers only, e.g. 4 or 4.50): ');
    price = parseFloat(raw);
    if (isNaN(price)) { console.log('  Enter a number.'); price = 0; }
  }

  // Category
  console.log('\nCategories:');
  CATEGORIES.forEach((c, i) => console.log(`  ${i + 1}. ${c.label}`));
  let category = '';
  while (!category) {
    const raw = await ask('Pick a number: ');
    const idx = parseInt(raw) - 1;
    if (idx >= 0 && idx < CATEGORIES.length) {
      category = CATEGORIES[idx].key;
    } else {
      console.log('  Enter a number from the list.');
    }
  }

  // Image URL
  console.log('\nFor the image: open the listing on Etsy, right-click the main photo, copy image address.');
  const image = (await ask('Image URL (or press Enter to skip): ')).trim();

  rl.close();

  // Build entry
  const entry = `  {
    sku: '${listingId}',
    title: '${title.replace(/'/g, "\\'")}',
    category: '${category}',
    price: ${price},
    image: '${image}',
    etsyListingId: '${listingId}',
  },`;

  const updated = shopTs.replace(/^];$/m, `${entry}\n];`);
  writeFileSync(SHOP_FILE, updated, 'utf8');

  console.log(`\nDone! Added "${title}" to shop.ts as '${category}'.`);
  console.log('Refresh the shop page in your browser to see it.');
}

main().catch(err => { console.error(err); process.exit(1); });
