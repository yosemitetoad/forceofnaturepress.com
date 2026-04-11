import { defineMiddleware } from 'astro:middleware';
import { validateSession, getPageContent, getRedirect } from './lib/db';

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

  // Redirect + maintenance mode gate — public pages only, not API routes or special pages
  if (!isAdminRoute && !isApiRoute && !isUnderConstruction) {
    const db = context.locals.runtime?.env?.DB;
    if (db) {
      const [redirect, maintenanceMode] = await Promise.all([
        getRedirect(db, pathname),
        getPageContent(db, 'maintenance_mode'),
      ]);
      if (redirect) {
        return context.redirect(redirect, 301);
      }
      if (maintenanceMode === '1') {
        return context.redirect('/under-construction');
      }
    }
  }

  return next();
});
