export const prerender = false;

import type { APIRoute } from 'astro';
import {
  updateWhatsNewItem,
  archiveWhatsNewItem,
  restoreWhatsNewItem,
  deleteWhatsNewItem,
} from '../../../../lib/db';

export const PUT: APIRoute = async ({ params, request, locals }) => {
  const db = locals.runtime.env.DB;
  const id = Number(params.id);

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { title, text, linkText, linkUrl } = body;
  const updatedAt = await updateWhatsNewItem(db, id, { title, text, linkText, linkUrl });
  return new Response(JSON.stringify({ ok: true, updatedAt }), { status: 200 });
};

// DELETE = archive (soft delete)
export const DELETE: APIRoute = async ({ params, locals }) => {
  const db = locals.runtime.env.DB;
  const id = Number(params.id);
  await archiveWhatsNewItem(db, id);
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

// POST with action = restore | delete
export const POST: APIRoute = async ({ params, request, locals }) => {
  const db = locals.runtime.env.DB;
  const id = Number(params.id);

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  if (body.action === 'restore') {
    await restoreWhatsNewItem(db, id);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (body.action === 'delete') {
    await deleteWhatsNewItem(db, id);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: 'Unknown action' }), { status: 400 });
};
