export const prerender = false;

import type { APIRoute } from 'astro';
import { getShopItem, updateShopItem, deleteShopItem } from '../../../../lib/db';

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

  await updateShopItem(db, sku!, {
    title: body.title,
    category: body.category,
    price: body.price != null ? Number(body.price) : undefined,
    image: body.image,
    etsyListingId: body.etsyListingId || undefined,
    sortOrder: body.sortOrder != null ? Number(body.sortOrder) : undefined,
  });

  return new Response(JSON.stringify({ ok: true }));
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const db = locals.runtime.env.DB;
  const { sku } = params;

  await deleteShopItem(db, sku!);
  return new Response(JSON.stringify({ ok: true }));
};
