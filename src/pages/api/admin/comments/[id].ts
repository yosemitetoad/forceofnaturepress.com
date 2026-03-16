import type { APIRoute } from 'astro';
import { approveComment, deleteComment } from '../../../../lib/db';

export const prerender = false;

export const PUT: APIRoute = async ({ params, locals }) => {
  const db = locals.runtime.env.DB;
  const id = Number(params.id);
  await approveComment(db, id);
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const db = locals.runtime.env.DB;
  const id = Number(params.id);
  await deleteComment(db, id);
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
