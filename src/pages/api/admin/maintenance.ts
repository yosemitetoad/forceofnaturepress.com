import type { APIRoute } from 'astro';
import { getPageContent, setPageContent } from '../../../lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const db = locals.runtime.env.DB;
  const value = await getPageContent(db, 'maintenance_mode');
  return new Response(JSON.stringify({ enabled: value === '1' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  const { enabled } = await request.json();
  await setPageContent(db, 'maintenance_mode', enabled ? '1' : '0');
  return new Response(JSON.stringify({ ok: true, enabled }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
