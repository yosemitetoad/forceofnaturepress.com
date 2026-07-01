export const prerender = false;

import type { APIRoute } from 'astro';
import { createEvent, updateEvent, deleteEvent, reorderEvents } from '../../../lib/db';

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;

  let body: any;
  try { body = await request.json(); } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  if (body.action === 'create') {
    const name = String(body.name ?? '').trim();
    if (!name) return new Response(JSON.stringify({ error: 'name required' }), { status: 400 });
    const id = await createEvent(db, {
      name,
      dateLabel: String(body.dateLabel ?? '').trim(),
      hours: String(body.hours ?? '').trim(),
      location: String(body.location ?? '').trim(),
      description: String(body.description ?? '').trim(),
      url: String(body.url ?? '').trim() || null,
      venueType: String(body.venueType ?? '').trim(),
      entryType: String(body.entryType ?? '').trim(),
      isUpcoming: body.isUpcoming !== false,
    });
    return new Response(JSON.stringify({ ok: true, id }), { status: 201 });
  }

  if (body.action === 'update') {
    const id = Number(body.id);
    if (!id) return new Response(JSON.stringify({ error: 'id required' }), { status: 400 });
    const fields: Parameters<typeof updateEvent>[2] = {};
    if (body.name !== undefined) fields.name = String(body.name).trim();
    if (body.dateLabel !== undefined) fields.dateLabel = String(body.dateLabel).trim();
    if (body.hours !== undefined) fields.hours = String(body.hours).trim();
    if (body.location !== undefined) fields.location = String(body.location).trim();
    if (body.description !== undefined) fields.description = String(body.description).trim();
    if (body.url !== undefined) fields.url = String(body.url).trim() || null;
    if (body.venueType !== undefined) fields.venueType = String(body.venueType).trim();
    if (body.entryType !== undefined) fields.entryType = String(body.entryType).trim();
    if (body.isUpcoming !== undefined) fields.isUpcoming = Boolean(body.isUpcoming);
    await updateEvent(db, id, fields);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (body.action === 'delete') {
    const id = Number(body.id);
    if (!id) return new Response(JSON.stringify({ error: 'id required' }), { status: 400 });
    await deleteEvent(db, id);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (body.action === 'reorder') {
    if (!Array.isArray(body.ids)) return new Response(JSON.stringify({ error: 'ids required' }), { status: 400 });
    await reorderEvents(db, body.ids.map(Number));
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: 'Unknown action' }), { status: 400 });
};
