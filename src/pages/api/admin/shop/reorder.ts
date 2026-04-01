export const prerender = false;

import type { APIRoute } from 'astro';
import { updateShopItem } from '../../../../lib/db';

// PUT /api/admin/shop/reorder
// Body: { skus: string[] } — ordered list, index becomes sort_order * 10
export const PUT: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;

  let body: { skus?: string[] };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { skus } = body;
  if (!Array.isArray(skus) || skus.length === 0) {
    return new Response(JSON.stringify({ error: 'skus must be a non-empty array' }), { status: 400 });
  }

  try {
    await db.batch(
      skus.map((sku, i) =>
        db.prepare('UPDATE shop_items SET sort_order = ?, updated_at = datetime(\'now\') WHERE sku = ?')
          .bind(i * 10, sku)
      )
    );
    return new Response(JSON.stringify({ ok: true }));
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to update order' }), { status: 500 });
  }
};
