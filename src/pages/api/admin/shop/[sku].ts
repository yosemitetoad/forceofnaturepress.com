export const prerender = false;

import type { APIRoute } from 'astro';
import { getShopItem, updateShopItem, deleteShopItem, renameShopItemSku } from '../../../../lib/db';

export const PUT: APIRoute = async ({ params, request, locals }) => {
  const db = locals.runtime.env.DB;
  const { sku } = params;

  const existing = await getShopItem(db, sku!);
  if (!existing) {
    return new Response(JSON.stringify({ error: 'Item not found' }), { status: 404 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  // Rename SKU first if it changed
  const newSku = body.sku?.trim();
  const effectiveSku = (newSku && newSku !== sku) ? newSku : sku!;
  if (newSku && newSku !== sku) {
    const conflict = await getShopItem(db, newSku);
    if (conflict) {
      return new Response(JSON.stringify({ error: 'SKU already in use' }), { status: 409 });
    }
    await renameShopItemSku(db, sku!, newSku);
  }

  await updateShopItem(db, effectiveSku, {
    title: body.title,
    category: body.category,
    price: body.price != null ? Number(body.price) : undefined,
    image: body.image,
    etsyListingId: body.etsyListingId || undefined,
    sortOrder: body.sortOrder != null ? Number(body.sortOrder) : undefined,
    wholesaleEnabled: body.wholesaleEnabled !== undefined ? Boolean(body.wholesaleEnabled) : undefined,
  });

  return new Response(JSON.stringify({ ok: true, sku: effectiveSku }));
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const db = locals.runtime.env.DB;
  const { sku } = params;

  await deleteShopItem(db, sku!);
  return new Response(JSON.stringify({ ok: true }));
};
