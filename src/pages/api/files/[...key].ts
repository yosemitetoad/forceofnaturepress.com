import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ params, locals }) => {
  const bucket = locals.runtime.env.UPLOADS;
  const key = params.key;

  if (!key || !key.startsWith('downloads/')) {
    return new Response('Not found', { status: 404 });
  }

  const object = await bucket.get(key);
  if (!object) {
    return new Response('Not found', { status: 404 });
  }

  const contentType = object.httpMetadata?.contentType || 'application/octet-stream';
  const filename = key.replace('downloads/', '');

  const headers = new Headers();
  headers.set('Content-Type', contentType);
  headers.set('Cache-Control', 'public, max-age=86400');

  // PDFs open inline in browser; everything else downloads
  if (contentType === 'application/pdf') {
    headers.set('Content-Disposition', `inline; filename="${filename}"`);
  } else {
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
  }

  return new Response(object.body, { headers });
};
