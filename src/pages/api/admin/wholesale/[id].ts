export const prerender = false;

import type { APIRoute } from 'astro';
import { updateWholesaleItem, deleteWholesaleItem } from '../../../../lib/db';

export const PUT: APIRoute = async ({ params, request, locals }) => {
  const db = locals.runtime.env.DB;
  const id = Number(params.id);

  let body: any;
  try { body = await request.json(); } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { sku, title, description, wholesalePrice, rrp, moq, published, wholesaleCategory } = body;
  await updateWholesaleItem(db, id, {
    ...(sku !== undefined && { sku }),
    ...('title' in body && { title: title || null }),
    ...(description !== undefined && { description }),
    ...(wholesalePrice !== undefined && { wholesalePrice: Number(wholesalePrice) }),
    ...(rrp !== undefined && { rrp: Number(rrp) }),
    ...(moq !== undefined && { moq: Number(moq) }),
    ...(published !== undefined && { published: Boolean(published) }),
    ...('wholesaleCategory' in body && { wholesaleCategory: wholesaleCategory || null }),
    ...('image' in body && { image: body.image || null }),
  });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const db = locals.runtime.env.DB;
  const id = Number(params.id);
  await deleteWholesaleItem(db, id);
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
