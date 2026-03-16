import type { APIRoute } from 'astro';
import { updateBlogPost, deleteBlogPost } from '../../../../lib/db';

export const prerender = false;

export const PUT: APIRoute = async ({ params, request, locals }) => {
  const db = locals.runtime.env.DB;
  const id = Number(params.id);
  const body = await request.json();

  try {
    await updateBlogPost(db, id, {
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt,
      coverImage: body.coverImage,
      published: body.published,
      tags: body.tags,
      commentsEnabled: body.commentsEnabled,
      author: body.author,
    });
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    const isDupe = err.message?.includes('UNIQUE constraint');
    return new Response(
      JSON.stringify({ error: isDupe ? 'A post with that slug already exists' : 'Failed to update post' }),
      { status: isDupe ? 409 : 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const db = locals.runtime.env.DB;
  const id = Number(params.id);
  await deleteBlogPost(db, id);
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
