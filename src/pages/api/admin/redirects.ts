import type { APIRoute } from 'astro';
import { getAllRedirects, createRedirect, deleteRedirect } from '../../../lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const db = locals.runtime.env.DB;
  const redirects = await getAllRedirects(db);
  return new Response(JSON.stringify({ redirects }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  const { fromPath, toPath } = await request.json();

  if (!fromPath || !toPath) {
    return new Response(JSON.stringify({ error: 'fromPath and toPath are required' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!fromPath.startsWith('/')) {
    return new Response(JSON.stringify({ error: 'From path must start with /' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  await createRedirect(db, fromPath, toPath);
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  const { id } = await request.json();
  await deleteRedirect(db, id);
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
