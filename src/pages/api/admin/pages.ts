export const prerender = false;

import type { APIRoute } from 'astro';
import { setPageContent } from '../../../lib/db';

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { updates } = body;
  if (!updates || typeof updates !== 'object') {
    return new Response(JSON.stringify({ error: 'Missing updates object' }), { status: 400 });
  }

  for (const [key, value] of Object.entries(updates)) {
    await setPageContent(db, key, String(value));
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
