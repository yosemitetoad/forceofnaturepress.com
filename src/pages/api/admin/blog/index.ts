import type { APIRoute } from 'astro';
import { createBlogPost } from '../../../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  const body = await request.json();

  if (!body.title || !body.slug) {
    return new Response(JSON.stringify({ error: 'Title and slug are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const id = await createBlogPost(db, {
      title: body.title,
      slug: body.slug,
      content: body.content ?? '',
      excerpt: body.excerpt ?? '',
      coverImage: body.coverImage,
      published: body.published ?? false,
      tags: body.tags,
      commentsEnabled: body.commentsEnabled,
      author: body.author,
    });
    return new Response(JSON.stringify({ id }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    const isDupe = err.message?.includes('UNIQUE constraint');
    return new Response(
      JSON.stringify({ error: isDupe ? 'A post with that slug already exists' : 'Failed to create post' }),
      { status: isDupe ? 409 : 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
