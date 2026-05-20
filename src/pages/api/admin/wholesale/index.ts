export const prerender = false;

import type { APIRoute } from 'astro';
import {
  createWholesaleItem, reorderWholesaleItems, batchUpdateWholesaleItems,
  createWholesaleCategory, updateWholesaleCategoryLabel, updateWholesaleCategoryDescription,
  deleteWholesaleCategory, reorderWholesaleCategories, syncWholesaleFromShop,
} from '../../../../lib/db';

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;

  let body: any;
  try { body = await request.json(); } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  if (body.action === 'sync') {
    const added = await syncWholesaleFromShop(db);
    return new Response(JSON.stringify({ ok: true, added }), { status: 200 });
  }

  if (body.action === 'reorder') {
    if (!Array.isArray(body.ids)) return new Response(JSON.stringify({ error: 'ids required' }), { status: 400 });
    await reorderWholesaleItems(db, body.ids);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (body.action === 'reorder-categories') {
    if (!Array.isArray(body.slugs)) return new Response(JSON.stringify({ error: 'slugs required' }), { status: 400 });
    await reorderWholesaleCategories(db, body.slugs);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (body.action === 'batch-update') {
    if (!Array.isArray(body.ids) || body.ids.length === 0) {
      return new Response(JSON.stringify({ error: 'ids must be a non-empty array' }), { status: 400 });
    }
    const fields: { wholesalePrice?: number; rrp?: number; moq?: number; category?: string | null; published?: boolean } = {};
    if (body.wholesalePrice !== undefined && body.wholesalePrice !== '') fields.wholesalePrice = Number(body.wholesalePrice);
    if (body.rrp !== undefined && body.rrp !== '') fields.rrp = Number(body.rrp);
    if (body.moq !== undefined && body.moq !== '') fields.moq = Number(body.moq);
    if (body.category !== undefined) fields.category = body.category || null;
    if (body.published !== undefined) fields.published = Boolean(body.published);
    await batchUpdateWholesaleItems(db, body.ids, fields);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (body.action === 'create-category') {
    const label = String(body.label ?? '').trim();
    if (!label) return new Response(JSON.stringify({ error: 'label required' }), { status: 400 });
    let slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    // Ensure uniqueness
    const existing = await db.prepare('SELECT slug FROM wholesale_categories WHERE slug = ?').bind(slug).first();
    if (existing) slug = slug + '-' + Date.now().toString(36);
    await createWholesaleCategory(db, slug, label);
    return new Response(JSON.stringify({ ok: true, slug, label }), { status: 201 });
  }

  if (body.action === 'update-category-label') {
    const { slug, label } = body;
    if (!slug || !label) return new Response(JSON.stringify({ error: 'slug and label required' }), { status: 400 });
    await updateWholesaleCategoryLabel(db, String(slug), String(label).trim());
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (body.action === 'update-category-description') {
    const { slug, description } = body;
    if (!slug) return new Response(JSON.stringify({ error: 'slug required' }), { status: 400 });
    await updateWholesaleCategoryDescription(db, String(slug), String(description ?? '').trim());
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (body.action === 'delete-category') {
    const { slug } = body;
    if (!slug) return new Response(JSON.stringify({ error: 'slug required' }), { status: 400 });
    await deleteWholesaleCategory(db, String(slug));
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  // Create item
  const { sku, title, description = '', wholesalePrice = 0, rrp = 0, moq = 1, published = false, wholesaleCategory } = body;
  if (!sku) return new Response(JSON.stringify({ error: 'sku required' }), { status: 400 });
  const id = await createWholesaleItem(db, {
    sku,
    title: title || null,
    image: body.image || null,
    description,
    wholesalePrice: Number(wholesalePrice),
    rrp: Number(rrp),
    moq: Number(moq),
    published,
    wholesaleCategory: wholesaleCategory || null,
  });
  return new Response(JSON.stringify({ ok: true, id }), { status: 201 });
};
