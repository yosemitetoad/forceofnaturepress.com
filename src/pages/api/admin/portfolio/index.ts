export const prerender = false;

import type { APIRoute } from 'astro';
import { createPortfolioItem } from '../../../../lib/db';

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;

  try {
    const body = await request.json();
    const id = await createPortfolioItem(db, body);
    return new Response(JSON.stringify({ ok: true, id }));
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to create portfolio item' }), { status: 400 });
  }
};
