export const prerender = false;

import type { APIRoute } from 'astro';
import { createShopItem, getShopItem } from '../../../../lib/db';

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { sku, title, category, price, image, etsyListingId } = body;

  if (!sku || !title || !category || price == null || !image) {
    return new Response(JSON.stringify({ error: 'Missing required fields: sku, title, category, price, image' }), { status: 400 });
  }

  const existing = await getShopItem(db, sku);
  if (existing) {
    return new Response(JSON.stringify({ error: `Item with SKU "${sku}" already exists` }), { status: 409 });
  }

  await createShopItem(db, {
    sku,
    title,
    category,
    price: Number(price),
    image,
    etsyListingId: etsyListingId || undefined,
  });

  return new Response(JSON.stringify({ ok: true, sku }), { status: 201 });
};
