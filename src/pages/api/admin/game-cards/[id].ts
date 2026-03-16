export const prerender = false;

import type { APIRoute } from 'astro';
import { updateGameCard, deleteGameCard } from '../../../../lib/db';

export const PUT: APIRoute = async ({ params, request, locals }) => {
  const db = locals.runtime.env.DB;
  const id = Number(params.id);

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  await updateGameCard(db, id, body);
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const db = locals.runtime.env.DB;
  const id = Number(params.id);
  await deleteGameCard(db, id);
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
