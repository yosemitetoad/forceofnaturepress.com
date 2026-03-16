export const prerender = false;

import type { APIRoute } from 'astro';
import { deleteSession } from '../../../lib/db';

export const POST: APIRoute = async ({ cookies, locals, redirect }) => {
  const token = cookies.get('admin_session')?.value;
  if (token) {
    const db = locals.runtime.env.DB;
    await deleteSession(db, token);
  }

  cookies.delete('admin_session', { path: '/' });
  return redirect('/admin/login');
};
