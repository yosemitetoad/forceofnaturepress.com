import type { APIRoute } from 'astro';
import { getBlogPostById, createComment } from '../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  const body = await request.json();

  const { postId, authorName, content } = body;

  if (!postId || !authorName?.trim() || !content?.trim()) {
    return new Response(JSON.stringify({ error: 'Name and comment are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (authorName.trim().length > 100) {
    return new Response(JSON.stringify({ error: 'Name is too long' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (content.trim().length > 5000) {
    return new Response(JSON.stringify({ error: 'Comment is too long (max 5000 characters)' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Verify post exists and has comments enabled
  const post = await getBlogPostById(db, postId);
  if (!post || !post.published || !post.commentsEnabled) {
    return new Response(JSON.stringify({ error: 'Comments are not available for this post' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await createComment(db, postId, authorName.trim(), content.trim());
    return new Response(JSON.stringify({ ok: true, message: 'Comment submitted for review' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to submit comment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
