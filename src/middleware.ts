import { defineMiddleware } from 'astro:middleware';
import { validateSession } from './lib/db';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Only gate /admin and /api/admin routes (but not /admin/login)
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
  const isLoginPage = pathname === '/admin/login' || pathname === '/admin/login/';
  const isLoginApi = pathname === '/api/admin/login' || pathname === '/api/admin/login/';

  if (!isAdminRoute || isLoginPage || isLoginApi) {
    return next();
  }

  const db = context.locals.runtime.env.DB;
  const sessionToken = context.cookies.get('admin_session')?.value;

  if (!sessionToken || !(await validateSession(db, sessionToken))) {
    // API routes get 401, pages get redirected
    if (pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return context.redirect('/admin/login');
  }

  return next();
});
