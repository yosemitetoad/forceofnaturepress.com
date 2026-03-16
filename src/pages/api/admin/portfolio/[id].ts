export const prerender = false;

import type { APIRoute } from 'astro';
import { getPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '../../../../lib/db';

export const PUT: APIRoute = async ({ params, request, locals }) => {
  const db = locals.runtime.env.DB;
  const id = Number(params.id);

  const existing = await getPortfolioItem(db, id);
  if (!existing) {
    return new Response(JSON.stringify({ error: 'Item not found' }), { status: 404 });
  }

  try {
    const body = await request.json();
    await updatePortfolioItem(db, id, body);
    return new Response(JSON.stringify({ ok: true }));
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to update item' }), { status: 400 });
  }
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const db = locals.runtime.env.DB;
  const id = Number(params.id);

  await deletePortfolioItem(db, id);
  return new Response(JSON.stringify({ ok: true }));
};
