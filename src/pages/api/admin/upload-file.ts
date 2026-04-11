import type { APIRoute } from 'astro';

export const prerender = false;

const ALLOWED_TYPES: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/epub+zip': 'epub',
  'application/zip': 'zip',
  'text/plain': 'txt',
  'text/csv': 'csv',
};

function sanitizeFilename(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-{2,}/g, '-')
    .toLowerCase()
    .slice(0, 200);
}

export const POST: APIRoute = async ({ request, locals }) => {
  const bucket = locals.runtime.env.UPLOADS;

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file || !file.size) {
    return new Response(JSON.stringify({ error: 'No file provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!ALLOWED_TYPES[file.type]) {
    return new Response(JSON.stringify({ error: 'File type not allowed. Accepted: PDF, EPUB, ZIP, TXT, CSV' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 50MB limit
  if (file.size > 50 * 1024 * 1024) {
    return new Response(JSON.stringify({ error: 'File too large (max 50MB)' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const safeName = sanitizeFilename(file.name);
  const key = `downloads/${safeName}`;

  await bucket.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
  });

  const url = `/api/files/${key}`;

  return new Response(JSON.stringify({ url, key, name: safeName }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
