export const prerender = false;

import type { APIRoute } from 'astro';
import { createGameCard } from '../../../../lib/db';

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { title, category, description, image, link, linkType, status, sortOrder } = body;

  if (!title || !category || !description || !image) {
    return new Response(JSON.stringify({ error: 'Missing required fields: title, category, description, image' }), { status: 400 });
  }

  const id = await createGameCard(db, {
    title, category, description, image,
    link: link || '',
    linkType: linkType || 'play',
    status: status || 'published',
    sortOrder: sortOrder != null ? Number(sortOrder) : undefined,
  });

  return new Response(JSON.stringify({ ok: true, id }), { status: 201 });
};
