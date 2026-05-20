export const prerender = false;

import type { APIRoute } from 'astro';
import { saveWholesaleFormConfig } from '../../../lib/db';
import type { WholesaleFormConfig } from '../../../lib/db';

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  let body: any;
  try { body = await request.json(); } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const config = body.config as WholesaleFormConfig;
  if (!config || !Array.isArray(config.sections)) {
    return new Response(JSON.stringify({ error: 'Invalid config' }), { status: 400 });
  }

  await saveWholesaleFormConfig(db, config);
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
