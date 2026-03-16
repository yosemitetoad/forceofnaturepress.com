export const prerender = false;

import type { APIRoute } from 'astro';
import { recordEvent } from '../../lib/db';

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 204 });
  }

  const { type, sku, page } = body;
  if (!type || !page) return new Response(null, { status: 204 });

  const eventType = type === 'click' ? 'product_click' : 'page_view';
  const referrer = request.headers.get('referer') ?? undefined;

  try {
    await recordEvent(db, eventType, page, sku ?? undefined, referrer);
  } catch {
    // Silently fail -- analytics should never break the user experience
  }

  return new Response(null, { status: 204 });
};
