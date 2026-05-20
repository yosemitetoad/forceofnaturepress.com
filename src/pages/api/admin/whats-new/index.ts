export const prerender = false;

import type { APIRoute } from 'astro';
import { createWhatsNewItem, reorderWhatsNewItems } from '../../../../lib/db';

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  if (body.action === 'reorder') {
    const ids: number[] = body.ids;
    if (!Array.isArray(ids)) {
      return new Response(JSON.stringify({ error: 'ids must be an array' }), { status: 400 });
    }
    await reorderWhatsNewItems(db, ids);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const { title = '', text = '', linkText = '', linkUrl = '' } = body;
  const result = await createWhatsNewItem(db, { title, text, linkText, linkUrl });
  return new Response(JSON.stringify({ ok: true, ...result }), { status: 201 });
};
