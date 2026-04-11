import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const bucket = locals.runtime.env.UPLOADS;

  const list = await bucket.list({ prefix: 'downloads/' });

  const files = list.objects.map((obj) => ({
    key: obj.key,
    name: obj.key.replace('downloads/', ''),
    size: obj.size,
    uploaded: obj.uploaded,
    url: `/api/files/${obj.key}`,
  }));

  return new Response(JSON.stringify({ files }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ request, locals }) => {
  const bucket = locals.runtime.env.UPLOADS;

  const { key } = await request.json();

  if (!key || !key.startsWith('downloads/')) {
    return new Response(JSON.stringify({ error: 'Invalid key' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await bucket.delete(key);

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
