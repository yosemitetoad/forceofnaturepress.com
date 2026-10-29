export const prerender = false;

import type { APIRoute } from 'astro';
import { createRetailer, updateRetailer, deleteRetailer } from '../../../lib/db';

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;

  let body: any;
  try { body = await request.json(); } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  if (body.action === 'create') {
    const name = String(body.name ?? '').trim();
    if (!name) return new Response(JSON.stringify({ error: 'name required' }), { status: 400 });
    const id = await createRetailer(db, {
      name,
      storeType: String(body.storeType ?? '').trim(),
      city: String(body.city ?? '').trim(),
      state: String(body.state ?? '').trim(),
      url: String(body.url ?? '').trim() || null,
    });
    return new Response(JSON.stringify({ ok: true, id }), { status: 201 });
  }

  if (body.action === 'update') {
    const id = Number(body.id);
    if (!id) return new Response(JSON.stringify({ error: 'id required' }), { status: 400 });
    const fields: Parameters<typeof updateRetailer>[2] = {};
    if (body.name !== undefined) fields.name = String(body.name).trim();
    if (body.storeType !== undefined) fields.storeType = String(body.storeType).trim();
    if (body.city !== undefined) fields.city = String(body.city).trim();
    if (body.state !== undefined) fields.state = String(body.state).trim();
    if (body.url !== undefined) fields.url = String(body.url ?? '').trim() || null;
    if (body.active !== undefined) fields.active = Boolean(body.active);
    await updateRetailer(db, id, fields);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (body.action === 'delete') {
    const id = Number(body.id);
    if (!id) return new Response(JSON.stringify({ error: 'id required' }), { status: 400 });
    await deleteRetailer(db, id);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: 'Unknown action' }), { status: 400 });
};
