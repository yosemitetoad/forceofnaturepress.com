import { defineMiddleware } from 'astro:middleware';
import { validateSession, getPageContent } from './lib/db';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
  const isLoginPage = pathname === '/admin/login' || pathname === '/admin/login/';
  const isLoginApi = pathname === '/api/admin/login' || pathname === '/api/admin/login/';
  const isUnderConstruction = pathname === '/under-construction' || pathname === '/under-construction/';
  const isApiRoute = pathname.startsWith('/api/');

  // Admin session gate
  if (isAdminRoute && !isLoginPage && !isLoginApi) {
    const db = context.locals.runtime.env.DB;
    const sessionToken = context.cookies.get('admin_session')?.value;

    if (!sessionToken || !(await validateSession(db, sessionToken))) {
      if (pathname.startsWith('/api/')) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return context.redirect('/admin/login');
    }

    return next();
  }

  // Maintenance mode gate — public pages only, not API routes or the under-construction page itself
  // Guard against prerender context where runtime is unavailable
  if (!isAdminRoute && !isApiRoute && !isUnderConstruction) {
    const db = context.locals.runtime?.env?.DB;
    if (db) {
      const maintenanceMode = await getPageContent(db, 'maintenance_mode');
      if (maintenanceMode === '1') {
        return context.redirect('/under-construction');
      }
    }
  }

  return next();
});
