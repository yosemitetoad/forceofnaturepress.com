import type { APIRoute } from 'astro';

export const prerender = false;

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

  // Validate file type
  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  if (!allowed.includes(file.type)) {
    return new Response(JSON.stringify({ error: 'Only image files are allowed (jpg, png, gif, webp, svg)' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Limit to 10MB
  if (file.size > 10 * 1024 * 1024) {
    return new Response(JSON.stringify({ error: 'File too large (max 10MB)' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Generate a unique filename
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  const key = `uploads/${timestamp}-${random}.${ext}`;

  // Upload to R2
  await bucket.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
  });

  const url = `/api/images/${key}`;

  return new Response(JSON.stringify({ url, key }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
