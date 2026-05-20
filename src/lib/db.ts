import type { ShopItem, ShopCategory } from '../data/shop';

// D1 row shape (snake_case columns → camelCase ShopItem)
interface ShopRow {
  sku: string;
  title: string;
  category: ShopCategory;
  price: number;
  image: string;
  etsy_listing_id: string | null;
  sort_order: number;
  wholesale_enabled: number;
  created_at: string;
  updated_at: string;
}

function rowToItem(row: ShopRow): ShopItem {
  return {
    sku: row.sku,
    title: row.title,
    category: row.category,
    price: row.price,
    image: row.image,
    ...(row.etsy_listing_id ? { etsyListingId: row.etsy_listing_id } : {}),
    wholesaleEnabled: row.wholesale_enabled !== 0,
  };
}

// ── Queries ─────────────────────────────────────────────────────────────────

export async function getAllShopItems(db: D1Database): Promise<ShopItem[]> {
  const { results } = await db
    .prepare('SELECT * FROM shop_items ORDER BY sort_order ASC')
    .all<ShopRow>();
  return (results ?? []).map(rowToItem);
}

export async function getShopItem(db: D1Database, sku: string): Promise<ShopItem | null> {
  const row = await db
    .prepare('SELECT * FROM shop_items WHERE sku = ?')
    .bind(sku)
    .first<ShopRow>();
  return row ? rowToItem(row) : null;
}

export async function getShopItemsByCategory(db: D1Database, category: ShopCategory): Promise<ShopItem[]> {
  const { results } = await db
    .prepare('SELECT * FROM shop_items WHERE category = ? ORDER BY sort_order ASC')
    .bind(category)
    .all<ShopRow>();
  return (results ?? []).map(rowToItem);
}

export async function getShopCategories(db: D1Database): Promise<{slug: string, label: string}[]> {
  const { results } = await db
    .prepare("SELECT DISTINCT category FROM shop_items WHERE category IS NOT NULL AND category != '' ORDER BY category")
    .all<{ category: string }>();
  return (results ?? []).map((r: { category: string }) => ({
    slug: r.category,
    label: r.category.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
  }));
}

export async function getNextSortOrder(db: D1Database): Promise<number> {
  const row = await db
    .prepare('SELECT MAX(sort_order) as max_order FROM shop_items')
    .first<{ max_order: number | null }>();
  return (row?.max_order ?? 0) + 1;
}

// ── Mutations ───────────────────────────────────────────────────────────────

export interface ShopItemInput {
  sku: string;
  title: string;
  category: ShopCategory;
  price: number;
  image: string;
  etsyListingId?: string;
  sortOrder?: number;
  wholesaleEnabled?: boolean;
}

export async function createShopItem(db: D1Database, item: ShopItemInput): Promise<void> {
  const sortOrder = item.sortOrder ?? await getNextSortOrder(db);
  await db
    .prepare(
      `INSERT INTO shop_items (sku, title, category, price, image, etsy_listing_id, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(item.sku, item.title, item.category, item.price, item.image, item.etsyListingId ?? null, sortOrder)
    .run();
}

export async function updateShopItem(db: D1Database, sku: string, item: Partial<ShopItemInput>): Promise<void> {
  const sets: string[] = [];
  const values: (string | number | null)[] = [];

  if (item.title !== undefined) { sets.push('title = ?'); values.push(item.title); }
  if (item.category !== undefined) { sets.push('category = ?'); values.push(item.category); }
  if (item.price !== undefined) { sets.push('price = ?'); values.push(item.price); }
  if (item.image !== undefined) { sets.push('image = ?'); values.push(item.image); }
  if (item.etsyListingId !== undefined) { sets.push('etsy_listing_id = ?'); values.push(item.etsyListingId ?? null); }
  if (item.sortOrder !== undefined) { sets.push('sort_order = ?'); values.push(item.sortOrder); }
  if (item.wholesaleEnabled !== undefined) { sets.push('wholesale_enabled = ?'); values.push(item.wholesaleEnabled ? 1 : 0); }

  if (sets.length === 0) return;

  sets.push("updated_at = datetime('now')");
  values.push(sku);

  await db
    .prepare(`UPDATE shop_items SET ${sets.join(', ')} WHERE sku = ?`)
    .bind(...values)
    .run();
}

export async function deleteShopItem(db: D1Database, sku: string): Promise<void> {
  await db.prepare('DELETE FROM shop_items WHERE sku = ?').bind(sku).run();
}

export async function renameShopItemSku(db: D1Database, oldSku: string, newSku: string): Promise<void> {
  await db.prepare('UPDATE shop_items SET sku = ? WHERE sku = ?').bind(newSku, oldSku).run();
  await db.prepare('UPDATE wholesale_items SET sku = ? WHERE sku = ?').bind(newSku, oldSku).run();
  await db.prepare('UPDATE analytics_events SET sku = ? WHERE sku = ?').bind(newSku, oldSku).run();
}

export async function syncWholesaleFromShop(db: D1Database): Promise<number> {
  const { results: existing } = await db
    .prepare('SELECT sku FROM wholesale_items')
    .all<{ sku: string }>();
  const existingSkus = new Set((existing ?? []).map(r => r.sku));

  const maxRow = await db
    .prepare('SELECT COALESCE(MAX(sort_order), 0) AS m FROM wholesale_items')
    .first<{ m: number }>();
  let sortOrder = (maxRow?.m ?? 0) + 1;

  const { results: shopItems } = await db
    .prepare('SELECT sku, price FROM shop_items WHERE wholesale_enabled = 1')
    .all<{ sku: string; price: number }>();

  const toAdd = (shopItems ?? []).filter(s => !existingSkus.has(s.sku));

  for (const item of toAdd) {
    await db
      .prepare(
        'INSERT INTO wholesale_items (sku, description, wholesale_price, rrp, moq, published, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)'
      )
      .bind(item.sku, '', 0, item.price, 1, 0, sortOrder++)
      .run();
  }

  return toAdd.length;
}

// ── Sessions ────────────────────────────────────────────────────────────────

export async function createSession(db: D1Database, token: string, expiresAt: string): Promise<void> {
  await db
    .prepare('INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)')
    .bind(token, expiresAt)
    .run();
}

export async function validateSession(db: D1Database, token: string): Promise<boolean> {
  const row = await db
    .prepare("SELECT token FROM admin_sessions WHERE token = ? AND expires_at > datetime('now')")
    .bind(token)
    .first();
  return !!row;
}

export async function deleteSession(db: D1Database, token: string): Promise<void> {
  await db.prepare('DELETE FROM admin_sessions WHERE token = ?').bind(token).run();
}

export async function cleanExpiredSessions(db: D1Database): Promise<void> {
  await db.prepare("DELETE FROM admin_sessions WHERE expires_at <= datetime('now')").run();
}

// ── Analytics ───────────────────────────────────────────────────────────────

export async function recordEvent(
  db: D1Database,
  eventType: 'page_view' | 'product_click',
  page: string,
  sku?: string,
  referrer?: string,
): Promise<void> {
  await db
    .prepare('INSERT INTO analytics_events (event_type, sku, page, referrer) VALUES (?, ?, ?, ?)')
    .bind(eventType, sku ?? null, page, referrer ?? null)
    .run();
}

export interface DailyStat {
  date: string;
  views: number;
  clicks: number;
}

export async function getDailyStats(db: D1Database, days: number = 30): Promise<DailyStat[]> {
  const { results } = await db
    .prepare(
      `SELECT
        date(created_at) as date,
        SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) as views,
        SUM(CASE WHEN event_type = 'product_click' THEN 1 ELSE 0 END) as clicks
      FROM analytics_events
      WHERE created_at >= datetime('now', ?)
      GROUP BY date(created_at)
      ORDER BY date ASC`
    )
    .bind(`-${days} days`)
    .all<DailyStat>();
  return results ?? [];
}

export interface TopItem {
  sku: string;
  title: string;
  clicks: number;
  image: string;
}

export async function getTopClickedItems(db: D1Database, limit: number = 10, days: number = 30): Promise<TopItem[]> {
  const { results } = await db
    .prepare(
      `SELECT e.sku, s.title, COUNT(*) as clicks, s.image
      FROM analytics_events e
      LEFT JOIN shop_items s ON e.sku = s.sku
      WHERE e.event_type = 'product_click'
        AND e.sku IS NOT NULL
        AND e.created_at >= datetime('now', ?)
      GROUP BY e.sku
      ORDER BY clicks DESC
      LIMIT ?`
    )
    .bind(`-${days} days`, limit)
    .all<TopItem>();
  return results ?? [];
}

export interface CategoryStat {
  category: string;
  clicks: number;
}

export async function getCategoryClicks(db: D1Database, days: number = 30): Promise<CategoryStat[]> {
  const { results } = await db
    .prepare(
      `SELECT s.category, COUNT(*) as clicks
      FROM analytics_events e
      JOIN shop_items s ON e.sku = s.sku
      WHERE e.event_type = 'product_click'
        AND e.created_at >= datetime('now', ?)
      GROUP BY s.category
      ORDER BY clicks DESC`
    )
    .bind(`-${days} days`)
    .all<CategoryStat>();
  return results ?? [];
}

export interface AnalyticsSummary {
  totalViews: number;
  totalClicks: number;
  uniqueItemsClicked: number;
}

export async function getAnalyticsSummary(db: D1Database, days: number = 30): Promise<AnalyticsSummary> {
  const row = await db
    .prepare(
      `SELECT
        SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) as totalViews,
        SUM(CASE WHEN event_type = 'product_click' THEN 1 ELSE 0 END) as totalClicks,
        COUNT(DISTINCT CASE WHEN event_type = 'product_click' THEN sku END) as uniqueItemsClicked
      FROM analytics_events
      WHERE created_at >= datetime('now', ?)`
    )
    .bind(`-${days} days`)
    .first<AnalyticsSummary>();
  return row ?? { totalViews: 0, totalClicks: 0, uniqueItemsClicked: 0 };
}

export interface ItemDailyStat {
  date: string;
  clicks: number;
}

export async function getItemClickStats(db: D1Database, sku: string, days: number = 30): Promise<{
  totalClicks: number;
  dailyClicks: ItemDailyStat[];
}> {
  const countRow = await db
    .prepare(
      `SELECT COUNT(*) as total FROM analytics_events
       WHERE event_type = 'product_click' AND sku = ?
       AND created_at >= datetime('now', ?)`
    )
    .bind(sku, `-${days} days`)
    .first<{ total: number }>();

  const { results } = await db
    .prepare(
      `SELECT date(created_at) as date, COUNT(*) as clicks
       FROM analytics_events
       WHERE event_type = 'product_click' AND sku = ?
       AND created_at >= datetime('now', ?)
       GROUP BY date(created_at)
       ORDER BY date ASC`
    )
    .bind(sku, `-${days} days`)
    .all<ItemDailyStat>();

  return {
    totalClicks: countRow?.total ?? 0,
    dailyClicks: results ?? [],
  };
}

export interface CategoryDailyStat {
  date: string;
  clicks: number;
}

export async function getCategoryDailyClicks(db: D1Database, category: string, days: number = 30): Promise<CategoryDailyStat[]> {
  const { results } = await db
    .prepare(
      `SELECT date(e.created_at) as date, COUNT(*) as clicks
       FROM analytics_events e
       JOIN shop_items s ON e.sku = s.sku
       WHERE e.event_type = 'product_click'
         AND s.category = ?
         AND e.created_at >= datetime('now', ?)
       GROUP BY date(e.created_at)
       ORDER BY date ASC`
    )
    .bind(category, `-${days} days`)
    .all<CategoryDailyStat>();
  return results ?? [];
}

export async function getCategoryTotalClicks(db: D1Database, category: string, days: number = 30): Promise<number> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) as total
       FROM analytics_events e
       JOIN shop_items s ON e.sku = s.sku
       WHERE e.event_type = 'product_click'
         AND s.category = ?
         AND e.created_at >= datetime('now', ?)`
    )
    .bind(category, `-${days} days`)
    .first<{ total: number }>();
  return row?.total ?? 0;
}

export async function getCategoryAllTimeClicks(db: D1Database, category: string): Promise<number> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) as total
       FROM analytics_events e
       JOIN shop_items s ON e.sku = s.sku
       WHERE e.event_type = 'product_click'
         AND s.category = ?`
    )
    .bind(category)
    .first<{ total: number }>();
  return row?.total ?? 0;
}

export async function getCategoryTopItems(db: D1Database, category: string, days: number = 30, limit: number = 10): Promise<TopItem[]> {
  const { results } = await db
    .prepare(
      `SELECT e.sku, s.title, COUNT(*) as clicks, s.image
       FROM analytics_events e
       JOIN shop_items s ON e.sku = s.sku
       WHERE e.event_type = 'product_click'
         AND s.category = ?
         AND e.created_at >= datetime('now', ?)
       GROUP BY e.sku
       ORDER BY clicks DESC
       LIMIT ?`
    )
    .bind(category, `-${days} days`, limit)
    .all<TopItem>();
  return results ?? [];
}

export async function getCategoryItemCount(db: D1Database, category: string): Promise<number> {
  const row = await db
    .prepare('SELECT COUNT(*) as total FROM shop_items WHERE category = ?')
    .bind(category)
    .first<{ total: number }>();
  return row?.total ?? 0;
}

// ── Portfolio ──────────────────────────────────────────────────────────────

export interface PortfolioItem {
  id: number;
  title: string | null;
  image: string | null;
  category: string | null;
  project: string | null;
  medium: string | null;
  year: string | null;
  description: string | null;
  link: string | null;
  sortOrder: number;
}

interface PortfolioRow {
  id: number;
  title: string | null;
  image: string | null;
  category: string | null;
  project: string | null;
  medium: string | null;
  year: string | null;
  description: string | null;
  link: string | null;
  sort_order: number;
  created_at: string;
}

function rowToPortfolioItem(row: PortfolioRow): PortfolioItem {
  return {
    id: row.id,
    title: row.title,
    image: row.image,
    category: row.category,
    project: row.project,
    medium: row.medium,
    year: row.year,
    description: row.description,
    link: row.link,
    sortOrder: row.sort_order,
  };
}

export async function getAllPortfolioItems(db: D1Database): Promise<PortfolioItem[]> {
  const { results } = await db
    .prepare('SELECT * FROM portfolio_items ORDER BY sort_order ASC')
    .all<PortfolioRow>();
  return (results ?? []).map(rowToPortfolioItem);
}

export async function getPortfolioItem(db: D1Database, id: number): Promise<PortfolioItem | null> {
  const row = await db
    .prepare('SELECT * FROM portfolio_items WHERE id = ?')
    .bind(id)
    .first<PortfolioRow>();
  return row ? rowToPortfolioItem(row) : null;
}

export async function getPortfolioCategories(db: D1Database): Promise<string[]> {
  const { results } = await db
    .prepare("SELECT DISTINCT category FROM portfolio_items WHERE category IS NOT NULL AND category != '' ORDER BY category")
    .all<{ category: string }>();
  return (results ?? []).map(r => r.category);
}

export async function getPortfolioProjects(db: D1Database): Promise<string[]> {
  const { results } = await db
    .prepare("SELECT DISTINCT project FROM portfolio_items WHERE project IS NOT NULL AND project != '' ORDER BY project")
    .all<{ project: string }>();
  return (results ?? []).map(r => r.project);
}

export async function getNextPortfolioSortOrder(db: D1Database): Promise<number> {
  const row = await db
    .prepare('SELECT MAX(sort_order) as max_order FROM portfolio_items')
    .first<{ max_order: number | null }>();
  return (row?.max_order ?? 0) + 1;
}

export interface PortfolioItemInput {
  title?: string;
  image?: string;
  category?: string;
  project?: string;
  medium?: string;
  year?: string;
  description?: string;
  link?: string;
  sortOrder?: number;
}

export async function createPortfolioItem(db: D1Database, item: PortfolioItemInput): Promise<number> {
  const sortOrder = item.sortOrder ?? await getNextPortfolioSortOrder(db);
  const result = await db
    .prepare(
      `INSERT INTO portfolio_items (title, image, category, project, medium, year, description, link, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      item.title ?? null, item.image ?? null, item.category ?? null,
      item.project ?? null, item.medium ?? null, item.year ?? null,
      item.description ?? null, item.link ?? null, sortOrder
    )
    .run();
  return result.meta.last_row_id as number;
}

export async function updatePortfolioItem(db: D1Database, id: number, item: PortfolioItemInput): Promise<void> {
  const sets: string[] = [];
  const values: (string | number | null)[] = [];

  if (item.title !== undefined) { sets.push('title = ?'); values.push(item.title ?? null); }
  if (item.image !== undefined) { sets.push('image = ?'); values.push(item.image ?? null); }
  if (item.category !== undefined) { sets.push('category = ?'); values.push(item.category ?? null); }
  if (item.project !== undefined) { sets.push('project = ?'); values.push(item.project ?? null); }
  if (item.medium !== undefined) { sets.push('medium = ?'); values.push(item.medium ?? null); }
  if (item.year !== undefined) { sets.push('year = ?'); values.push(item.year ?? null); }
  if (item.description !== undefined) { sets.push('description = ?'); values.push(item.description ?? null); }
  if (item.link !== undefined) { sets.push('link = ?'); values.push(item.link ?? null); }
  if (item.sortOrder !== undefined) { sets.push('sort_order = ?'); values.push(item.sortOrder); }

  if (sets.length === 0) return;

  values.push(id);
  await db
    .prepare(`UPDATE portfolio_items SET ${sets.join(', ')} WHERE id = ?`)
    .bind(...values)
    .run();
}

export async function deletePortfolioItem(db: D1Database, id: number): Promise<void> {
  await db.prepare('DELETE FROM portfolio_items WHERE id = ?').bind(id).run();
}

// ── Blog ──────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string | null;
  published: boolean;
  tags: string;
  commentsEnabled: boolean;
  author: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogRow {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  published: number;
  tags: string;
  comments_enabled: number;
  author: string;
  created_at: string;
  updated_at: string;
}

function rowToBlogPost(row: BlogRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    content: row.content,
    excerpt: row.excerpt,
    coverImage: row.cover_image,
    published: row.published === 1,
    tags: row.tags ?? '',
    commentsEnabled: (row.comments_enabled ?? 1) === 1,
    author: row.author ?? 'Riley',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getAllBlogPosts(db: D1Database, includeUnpublished = false): Promise<BlogPost[]> {
  const query = includeUnpublished
    ? 'SELECT * FROM blog_posts ORDER BY created_at DESC'
    : 'SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC';
  const { results } = await db.prepare(query).all<BlogRow>();
  return (results ?? []).map(rowToBlogPost);
}

export async function getBlogPost(db: D1Database, slug: string): Promise<BlogPost | null> {
  const row = await db
    .prepare('SELECT * FROM blog_posts WHERE slug = ?')
    .bind(slug)
    .first<BlogRow>();
  return row ? rowToBlogPost(row) : null;
}

export async function getBlogPostById(db: D1Database, id: number): Promise<BlogPost | null> {
  const row = await db
    .prepare('SELECT * FROM blog_posts WHERE id = ?')
    .bind(id)
    .first<BlogRow>();
  return row ? rowToBlogPost(row) : null;
}

export interface BlogPostInput {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  published?: boolean;
  tags?: string[];
  commentsEnabled?: boolean;
  author?: string;
}

export async function createBlogPost(db: D1Database, post: BlogPostInput): Promise<number> {
  const tags = (post.tags ?? []).join(', ');
  const result = await db
    .prepare(
      `INSERT INTO blog_posts (slug, title, content, excerpt, cover_image, published, tags, comments_enabled, author)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      post.slug, post.title, post.content, post.excerpt,
      post.coverImage ?? null, post.published ? 1 : 0,
      tags, post.commentsEnabled !== false ? 1 : 0,
      post.author || 'Riley'
    )
    .run();
  return result.meta.last_row_id as number;
}

export async function updateBlogPost(db: D1Database, id: number, post: Partial<BlogPostInput>): Promise<void> {
  const sets: string[] = [];
  const values: (string | number | null)[] = [];

  if (post.slug !== undefined) { sets.push('slug = ?'); values.push(post.slug); }
  if (post.title !== undefined) { sets.push('title = ?'); values.push(post.title); }
  if (post.content !== undefined) { sets.push('content = ?'); values.push(post.content); }
  if (post.excerpt !== undefined) { sets.push('excerpt = ?'); values.push(post.excerpt); }
  if (post.coverImage !== undefined) { sets.push('cover_image = ?'); values.push(post.coverImage ?? null); }
  if (post.published !== undefined) { sets.push('published = ?'); values.push(post.published ? 1 : 0); }
  if (post.tags !== undefined) { sets.push('tags = ?'); values.push(post.tags.join(', ')); }
  if (post.commentsEnabled !== undefined) { sets.push('comments_enabled = ?'); values.push(post.commentsEnabled ? 1 : 0); }
  if (post.author !== undefined) { sets.push('author = ?'); values.push(post.author); }

  if (sets.length === 0) return;

  sets.push("updated_at = datetime('now')");
  values.push(id);
  await db
    .prepare(`UPDATE blog_posts SET ${sets.join(', ')} WHERE id = ?`)
    .bind(...values)
    .run();
}

export async function deleteBlogPost(db: D1Database, id: number): Promise<void> {
  await db.prepare('DELETE FROM blog_posts WHERE id = ?').bind(id).run();
}

export async function getBlogPostCount(db: D1Database): Promise<{ total: number; published: number; drafts: number }> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) as total,
              SUM(CASE WHEN published = 1 THEN 1 ELSE 0 END) as published,
              SUM(CASE WHEN published = 0 THEN 1 ELSE 0 END) as drafts
       FROM blog_posts`
    )
    .first<{ total: number; published: number; drafts: number }>();
  return row ?? { total: 0, published: 0, drafts: 0 };
}

export async function getAllBlogTags(db: D1Database): Promise<string[]> {
  const { results } = await db
    .prepare('SELECT DISTINCT tags FROM blog_posts WHERE published = 1 AND tags != ?')
    .bind('')
    .all<{ tags: string }>();
  const tagSet = new Set<string>();
  for (const row of results ?? []) {
    row.tags.split(',').map(t => t.trim()).filter(Boolean).forEach(t => tagSet.add(t));
  }
  return [...tagSet].sort();
}

// ── Comments ──────────────────────────────────────────────────────────────

export interface BlogComment {
  id: number;
  postId: number;
  authorName: string;
  content: string;
  approved: boolean;
  createdAt: string;
}

interface CommentRow {
  id: number;
  post_id: number;
  author_name: string;
  content: string;
  approved: number;
  created_at: string;
}

function rowToComment(row: CommentRow): BlogComment {
  return {
    id: row.id,
    postId: row.post_id,
    authorName: row.author_name,
    content: row.content,
    approved: row.approved === 1,
    createdAt: row.created_at,
  };
}

export async function getApprovedComments(db: D1Database, postId: number): Promise<BlogComment[]> {
  const { results } = await db
    .prepare('SELECT * FROM blog_comments WHERE post_id = ? AND approved = 1 ORDER BY created_at ASC')
    .bind(postId)
    .all<CommentRow>();
  return (results ?? []).map(rowToComment);
}

export async function getAllComments(db: D1Database, limit: number = 50): Promise<(BlogComment & { postTitle?: string; postSlug?: string })[]> {
  const { results } = await db
    .prepare(
      `SELECT c.*, p.title as post_title, p.slug as post_slug
       FROM blog_comments c
       LEFT JOIN blog_posts p ON c.post_id = p.id
       ORDER BY c.created_at DESC
       LIMIT ?`
    )
    .bind(limit)
    .all<CommentRow & { post_title?: string; post_slug?: string }>();
  return (results ?? []).map(row => ({
    ...rowToComment(row),
    postTitle: row.post_title,
    postSlug: row.post_slug,
  }));
}

export async function getPendingCommentCount(db: D1Database): Promise<number> {
  const row = await db
    .prepare('SELECT COUNT(*) as total FROM blog_comments WHERE approved = 0')
    .first<{ total: number }>();
  return row?.total ?? 0;
}

export async function getPendingCommentCountsByPost(db: D1Database): Promise<Map<number, number>> {
  const { results } = await db
    .prepare('SELECT post_id, COUNT(*) as total FROM blog_comments WHERE approved = 0 GROUP BY post_id')
    .all<{ post_id: number; total: number }>();
  const map = new Map<number, number>();
  for (const row of results ?? []) {
    map.set(row.post_id, row.total);
  }
  return map;
}

export async function createComment(db: D1Database, postId: number, authorName: string, content: string): Promise<number> {
  const result = await db
    .prepare('INSERT INTO blog_comments (post_id, author_name, content) VALUES (?, ?, ?)')
    .bind(postId, authorName, content)
    .run();
  return result.meta.last_row_id as number;
}

export async function approveComment(db: D1Database, id: number): Promise<void> {
  await db.prepare('UPDATE blog_comments SET approved = 1 WHERE id = ?').bind(id).run();
}

export async function deleteComment(db: D1Database, id: number): Promise<void> {
  await db.prepare('DELETE FROM blog_comments WHERE id = ?').bind(id).run();
}

export async function getItemAllTimeClicks(db: D1Database, sku: string): Promise<number> {
  const row = await db
    .prepare("SELECT COUNT(*) as total FROM analytics_events WHERE event_type = 'product_click' AND sku = ?")
    .bind(sku)
    .first<{ total: number }>();
  return row?.total ?? 0;
}

// ── Redirects ─────────────────────────────────────────────────────────────────

export interface Redirect {
  id: number;
  fromPath: string;
  toPath: string;
  createdAt: string;
}

export async function getRedirect(db: D1Database, fromPath: string): Promise<string | null> {
  const row = await db
    .prepare('SELECT to_path FROM redirects WHERE from_path = ?')
    .bind(fromPath)
    .first<{ to_path: string }>();
  return row?.to_path ?? null;
}

export async function getAllRedirects(db: D1Database): Promise<Redirect[]> {
  const { results } = await db
    .prepare('SELECT * FROM redirects ORDER BY created_at DESC')
    .all<{ id: number; from_path: string; to_path: string; created_at: string }>();
  return (results ?? []).map(r => ({
    id: r.id,
    fromPath: r.from_path,
    toPath: r.to_path,
    createdAt: r.created_at,
  }));
}

export async function createRedirect(db: D1Database, fromPath: string, toPath: string): Promise<void> {
  await db
    .prepare('INSERT INTO redirects (from_path, to_path) VALUES (?, ?) ON CONFLICT(from_path) DO UPDATE SET to_path = excluded.to_path')
    .bind(fromPath, toPath)
    .run();
}

export async function deleteRedirect(db: D1Database, id: number): Promise<void> {
  await db.prepare('DELETE FROM redirects WHERE id = ?').bind(id).run();
}

// ── Page Content ──────────────────────────────────────────────────────────

export async function getPageContent(db: D1Database, key: string): Promise<string | null> {
  const row = await db
    .prepare('SELECT value FROM page_content WHERE key = ?')
    .bind(key)
    .first<{ value: string }>();
  return row?.value ?? null;
}

export async function getPageContentMulti(db: D1Database, keys: string[]): Promise<Record<string, string>> {
  const placeholders = keys.map(() => '?').join(', ');
  const { results } = await db
    .prepare(`SELECT key, value FROM page_content WHERE key IN (${placeholders})`)
    .bind(...keys)
    .all<{ key: string; value: string }>();
  const map: Record<string, string> = {};
  for (const row of results ?? []) {
    map[row.key] = row.value;
  }
  return map;
}

export async function setPageContent(db: D1Database, key: string, value: string): Promise<void> {
  await db
    .prepare(
      `INSERT INTO page_content (key, value, updated_at) VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
    )
    .bind(key, value)
    .run();
}

export async function getAllPageContent(db: D1Database): Promise<Record<string, string>> {
  const { results } = await db
    .prepare('SELECT key, value FROM page_content ORDER BY key')
    .all<{ key: string; value: string }>();
  const map: Record<string, string> = {};
  for (const row of results ?? []) {
    map[row.key] = row.value;
  }
  return map;
}

// ── Game Cards ────────────────────────────────────────────────────────────

export interface GameCard {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  linkType: string;
  status: string;
  sortOrder: number;
}

interface GameCardRow {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  link_type: string;
  status: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

function rowToGameCard(row: GameCardRow): GameCard {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    image: row.image,
    link: row.link,
    linkType: row.link_type,
    status: row.status,
    sortOrder: row.sort_order,
  };
}

export async function getAllGameCards(db: D1Database): Promise<GameCard[]> {
  const { results } = await db
    .prepare('SELECT * FROM game_cards ORDER BY sort_order ASC')
    .all<GameCardRow>();
  return (results ?? []).map(rowToGameCard);
}

export async function getGameCard(db: D1Database, id: number): Promise<GameCard | null> {
  const row = await db
    .prepare('SELECT * FROM game_cards WHERE id = ?')
    .bind(id)
    .first<GameCardRow>();
  return row ? rowToGameCard(row) : null;
}

export interface GameCardInput {
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  linkType?: string;
  status?: string;
  sortOrder?: number;
}

export async function createGameCard(db: D1Database, card: GameCardInput): Promise<number> {
  const sortOrder = card.sortOrder ?? ((await db
    .prepare('SELECT MAX(sort_order) as max_order FROM game_cards')
    .first<{ max_order: number | null }>())?.max_order ?? 0) + 1;
  const result = await db
    .prepare(
      `INSERT INTO game_cards (title, category, description, image, link, link_type, status, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      card.title, card.category, card.description, card.image,
      card.link ?? '', card.linkType ?? 'play', card.status ?? 'published', sortOrder
    )
    .run();
  return result.meta.last_row_id as number;
}

export async function updateGameCard(db: D1Database, id: number, card: Partial<GameCardInput>): Promise<void> {
  const sets: string[] = [];
  const values: (string | number | null)[] = [];

  if (card.title !== undefined) { sets.push('title = ?'); values.push(card.title); }
  if (card.category !== undefined) { sets.push('category = ?'); values.push(card.category); }
  if (card.description !== undefined) { sets.push('description = ?'); values.push(card.description); }
  if (card.image !== undefined) { sets.push('image = ?'); values.push(card.image); }
  if (card.link !== undefined) { sets.push('link = ?'); values.push(card.link); }
  if (card.linkType !== undefined) { sets.push('link_type = ?'); values.push(card.linkType); }
  if (card.status !== undefined) { sets.push('status = ?'); values.push(card.status); }
  if (card.sortOrder !== undefined) { sets.push('sort_order = ?'); values.push(card.sortOrder); }

  if (sets.length === 0) return;

  sets.push("updated_at = datetime('now')");
  values.push(id);
  await db
    .prepare(`UPDATE game_cards SET ${sets.join(', ')} WHERE id = ?`)
    .bind(...values)
    .run();
}

export async function deleteGameCard(db: D1Database, id: number): Promise<void> {
  await db.prepare('DELETE FROM game_cards WHERE id = ?').bind(id).run();
}

// ── What's New ────────────────────────────────────────────────────────────────

export interface WhatsNewItem {
  id: number;
  title: string;
  text: string;
  linkText: string;
  linkUrl: string;
  sortOrder: number;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  archivedAt: string | null;
}

interface WhatsNewRow {
  id: number;
  title: string;
  text: string;
  link_text: string;
  link_url: string;
  sort_order: number;
  archived: number;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
}

function rowToWhatsNewItem(row: WhatsNewRow): WhatsNewItem {
  return {
    id: row.id,
    title: row.title,
    text: row.text,
    linkText: row.link_text,
    linkUrl: row.link_url,
    sortOrder: row.sort_order,
    archived: row.archived === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    archivedAt: row.archived_at,
  };
}

export async function getActiveWhatsNewItems(db: D1Database): Promise<WhatsNewItem[]> {
  const { results } = await db
    .prepare('SELECT * FROM whats_new_items WHERE archived = 0 ORDER BY sort_order ASC')
    .all<WhatsNewRow>();
  return (results ?? []).map(rowToWhatsNewItem);
}

export async function getArchivedWhatsNewItems(db: D1Database): Promise<WhatsNewItem[]> {
  const { results } = await db
    .prepare('SELECT * FROM whats_new_items WHERE archived = 1 ORDER BY archived_at DESC')
    .all<WhatsNewRow>();
  return (results ?? []).map(rowToWhatsNewItem);
}

export interface WhatsNewItemInput {
  title: string;
  text: string;
  linkText: string;
  linkUrl: string;
  sortOrder?: number;
}

export async function createWhatsNewItem(db: D1Database, item: WhatsNewItemInput): Promise<{ id: number; createdAt: string; updatedAt: string }> {
  const maxRow = await db
    .prepare('SELECT MAX(sort_order) as max_order FROM whats_new_items WHERE archived = 0')
    .first<{ max_order: number | null }>();
  const sortOrder = item.sortOrder ?? (maxRow?.max_order ?? 0) + 1;
  const result = await db
    .prepare(
      `INSERT INTO whats_new_items (title, text, link_text, link_url, sort_order)
       VALUES (?, ?, ?, ?, ?)`
    )
    .bind(item.title, item.text, item.linkText, item.linkUrl, sortOrder)
    .run();
  const id = result.meta.last_row_id as number;
  const row = await db
    .prepare('SELECT created_at, updated_at FROM whats_new_items WHERE id = ?')
    .bind(id)
    .first<{ created_at: string; updated_at: string }>();
  return { id, createdAt: row!.created_at, updatedAt: row!.updated_at };
}

export async function updateWhatsNewItem(db: D1Database, id: number, item: Partial<WhatsNewItemInput>): Promise<string> {
  const sets: string[] = [];
  const values: (string | number | null)[] = [];

  if (item.title !== undefined) { sets.push('title = ?'); values.push(item.title); }
  if (item.text !== undefined) { sets.push('text = ?'); values.push(item.text); }
  if (item.linkText !== undefined) { sets.push('link_text = ?'); values.push(item.linkText); }
  if (item.linkUrl !== undefined) { sets.push('link_url = ?'); values.push(item.linkUrl); }
  if (item.sortOrder !== undefined) { sets.push('sort_order = ?'); values.push(item.sortOrder); }

  if (sets.length === 0) return '';

  sets.push("updated_at = datetime('now')");
  values.push(id);
  await db
    .prepare(`UPDATE whats_new_items SET ${sets.join(', ')} WHERE id = ?`)
    .bind(...values)
    .run();
  const row = await db
    .prepare('SELECT updated_at FROM whats_new_items WHERE id = ?')
    .bind(id)
    .first<{ updated_at: string }>();
  return row?.updated_at ?? '';
}

export async function archiveWhatsNewItem(db: D1Database, id: number): Promise<void> {
  await db
    .prepare("UPDATE whats_new_items SET archived = 1, archived_at = datetime('now'), updated_at = datetime('now') WHERE id = ?")
    .bind(id)
    .run();
}

export async function restoreWhatsNewItem(db: D1Database, id: number): Promise<void> {
  const maxRow = await db
    .prepare('SELECT MAX(sort_order) as max_order FROM whats_new_items WHERE archived = 0')
    .first<{ max_order: number | null }>();
  const sortOrder = (maxRow?.max_order ?? 0) + 1;
  await db
    .prepare("UPDATE whats_new_items SET archived = 0, archived_at = NULL, sort_order = ?, updated_at = datetime('now') WHERE id = ?")
    .bind(sortOrder, id)
    .run();
}

export async function deleteWhatsNewItem(db: D1Database, id: number): Promise<void> {
  await db.prepare('DELETE FROM whats_new_items WHERE id = ?').bind(id).run();
}

export async function reorderWhatsNewItems(db: D1Database, ids: number[]): Promise<void> {
  const stmts = ids.map((id, i) =>
    db.prepare("UPDATE whats_new_items SET sort_order = ?, updated_at = datetime('now') WHERE id = ?").bind(i + 1, id)
  );
  await db.batch(stmts);
}

// ── Wholesale ─────────────────────────────────────────────────────────────────

export interface WholesaleCategory {
  slug: string;
  label: string;
  description: string;
  sortOrder: number;
}

export interface WholesaleItem {
  id: number;
  sku: string;
  title: string;
  wholesaleTitle: string | null;
  image: string;
  wholesaleImage: string | null;
  shopImage: string;
  category: string;
  wholesaleCategory: string | null;
  shopPrice: number;
  description: string;
  wholesalePrice: number;
  rrp: number;
  moq: number;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface WholesaleRow {
  id: number;
  sku: string;
  description: string;
  wholesale_price: number;
  rrp: number;
  moq: number;
  sort_order: number;
  published: number;
  created_at: string;
  updated_at: string;
  wholesale_category: string | null;
  wholesale_image: string | null;
  wholesale_title: string | null;
  title: string | null;
  shop_image: string | null;
  image: string | null;
  price: number | null;
  category: string | null;
}

function rowToWholesaleItem(row: WholesaleRow): WholesaleItem {
  return {
    id: row.id,
    sku: row.sku,
    title: row.title ?? row.sku,
    wholesaleTitle: row.wholesale_title ?? null,
    image: row.image ?? '',
    wholesaleImage: row.wholesale_image ?? null,
    shopImage: row.shop_image ?? '',
    category: row.category ?? 'other',
    wholesaleCategory: row.wholesale_category,
    shopPrice: row.price ?? 0,
    description: row.description,
    wholesalePrice: row.wholesale_price,
    rrp: row.rrp,
    moq: row.moq,
    sortOrder: row.sort_order,
    published: row.published === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const WHOLESALE_JOIN = `
  SELECT w.id, w.sku, w.description, w.wholesale_price, w.rrp, w.moq,
         w.sort_order, w.published, w.created_at, w.updated_at, w.wholesale_category,
         w.image as wholesale_image,
         w.title as wholesale_title,
         s.title as shop_title, s.image as shop_image, s.price,
         COALESCE(w.image, s.image) as image,
         COALESCE(w.title, s.title) as title,
         COALESCE(w.wholesale_category, s.category) as category
  FROM wholesale_items w
  LEFT JOIN shop_items s ON w.sku = s.sku
`;

export async function getPublishedWholesaleItems(db: D1Database): Promise<WholesaleItem[]> {
  const { results } = await db
    .prepare(WHOLESALE_JOIN + 'WHERE w.published = 1 ORDER BY w.sort_order ASC')
    .all<WholesaleRow>();
  return (results ?? []).map(rowToWholesaleItem);
}

export async function getAllWholesaleItems(db: D1Database): Promise<WholesaleItem[]> {
  const { results } = await db
    .prepare(WHOLESALE_JOIN + 'ORDER BY w.sort_order ASC')
    .all<WholesaleRow>();
  return (results ?? []).map(rowToWholesaleItem);
}

export async function getWholesaleItem(db: D1Database, id: number): Promise<WholesaleItem | null> {
  const row = await db
    .prepare(WHOLESALE_JOIN + 'WHERE w.id = ?')
    .bind(id)
    .first<WholesaleRow>();
  return row ? rowToWholesaleItem(row) : null;
}

export interface WholesaleItemInput {
  sku: string;
  title?: string | null;
  description: string;
  wholesalePrice: number;
  rrp: number;
  moq: number;
  published?: boolean;
  sortOrder?: number;
  wholesaleCategory?: string | null;
  image?: string | null;
}

export async function createWholesaleItem(db: D1Database, item: WholesaleItemInput): Promise<number> {
  const maxRow = await db
    .prepare('SELECT MAX(sort_order) as max_order FROM wholesale_items')
    .first<{ max_order: number | null }>();
  const sortOrder = item.sortOrder ?? (maxRow?.max_order ?? 0) + 1;
  const result = await db
    .prepare(
      `INSERT INTO wholesale_items (sku, title, image, description, wholesale_price, rrp, moq, published, sort_order, wholesale_category)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(item.sku, item.title ?? null, item.image ?? null, item.description, item.wholesalePrice, item.rrp, item.moq, item.published ? 1 : 0, sortOrder, item.wholesaleCategory ?? null)
    .run();
  return result.meta.last_row_id as number;
}

export async function updateWholesaleItem(db: D1Database, id: number, item: Partial<WholesaleItemInput>): Promise<void> {
  const sets: string[] = [];
  const values: (string | number | null)[] = [];

  if (item.sku !== undefined) { sets.push('sku = ?'); values.push(item.sku); }
  if ('title' in item) { sets.push('title = ?'); values.push(item.title ?? null); }
  if (item.description !== undefined) { sets.push('description = ?'); values.push(item.description); }
  if (item.wholesalePrice !== undefined) { sets.push('wholesale_price = ?'); values.push(item.wholesalePrice); }
  if (item.rrp !== undefined) { sets.push('rrp = ?'); values.push(item.rrp); }
  if (item.moq !== undefined) { sets.push('moq = ?'); values.push(item.moq); }
  if (item.published !== undefined) { sets.push('published = ?'); values.push(item.published ? 1 : 0); }
  if (item.sortOrder !== undefined) { sets.push('sort_order = ?'); values.push(item.sortOrder); }
  if ('image' in item) { sets.push('image = ?'); values.push(item.image ?? null); }
  if ('wholesaleCategory' in item) { sets.push('wholesale_category = ?'); values.push(item.wholesaleCategory ?? null); }

  if (sets.length === 0) return;

  sets.push("updated_at = datetime('now')");
  values.push(id);
  await db
    .prepare(`UPDATE wholesale_items SET ${sets.join(', ')} WHERE id = ?`)
    .bind(...values)
    .run();
}

export async function deleteWholesaleItem(db: D1Database, id: number): Promise<void> {
  await db.prepare('DELETE FROM wholesale_items WHERE id = ?').bind(id).run();
}

export async function reorderWholesaleItems(db: D1Database, ids: number[]): Promise<void> {
  const stmts = ids.map((id, i) =>
    db.prepare("UPDATE wholesale_items SET sort_order = ?, updated_at = datetime('now') WHERE id = ?").bind(i + 1, id)
  );
  await db.batch(stmts);
}

export async function batchUpdateWholesaleItems(
  db: D1Database,
  ids: number[],
  fields: { wholesalePrice?: number; rrp?: number; moq?: number; category?: string | null; published?: boolean }
): Promise<void> {
  if (ids.length === 0) return;
  const sets: string[] = ["updated_at = datetime('now')"];
  const vals: (number | string | null)[] = [];
  if (fields.wholesalePrice !== undefined) { sets.push('wholesale_price = ?'); vals.push(fields.wholesalePrice); }
  if (fields.rrp !== undefined) { sets.push('rrp = ?'); vals.push(fields.rrp); }
  if (fields.moq !== undefined) { sets.push('moq = ?'); vals.push(fields.moq); }
  if ('category' in fields) { sets.push('wholesale_category = ?'); vals.push(fields.category ?? null); }
  if (fields.published !== undefined) { sets.push('published = ?'); vals.push(fields.published ? 1 : 0); }
  if (sets.length === 1) return;
  const placeholders = ids.map(() => '?').join(',');
  await db
    .prepare(`UPDATE wholesale_items SET ${sets.join(', ')} WHERE id IN (${placeholders})`)
    .bind(...vals, ...ids)
    .run();
}

// ── Wholesale categories ─────────────────────────────────────────────────────

export async function getWholesaleCategories(db: D1Database): Promise<WholesaleCategory[]> {
  const { results } = await db
    .prepare('SELECT slug, label, description, sort_order FROM wholesale_categories ORDER BY sort_order ASC, label ASC')
    .all<{ slug: string; label: string; description: string; sort_order: number }>();
  return (results ?? []).map(r => ({ slug: r.slug, label: r.label, description: r.description ?? '', sortOrder: r.sort_order }));
}

export async function updateWholesaleCategoryDescription(db: D1Database, slug: string, description: string): Promise<void> {
  await db.prepare('UPDATE wholesale_categories SET description = ? WHERE slug = ?').bind(description, slug).run();
}

export async function createWholesaleCategory(db: D1Database, slug: string, label: string): Promise<void> {
  const maxRow = await db
    .prepare('SELECT MAX(sort_order) as m FROM wholesale_categories')
    .first<{ m: number | null }>();
  const sortOrder = (maxRow?.m ?? 0) + 1;
  await db
    .prepare('INSERT INTO wholesale_categories (slug, label, sort_order) VALUES (?, ?, ?)')
    .bind(slug, label, sortOrder)
    .run();
}

export async function updateWholesaleCategoryLabel(db: D1Database, slug: string, label: string): Promise<void> {
  await db.prepare('UPDATE wholesale_categories SET label = ? WHERE slug = ?').bind(label, slug).run();
}

export async function deleteWholesaleCategory(db: D1Database, slug: string): Promise<void> {
  await db.prepare('DELETE FROM wholesale_categories WHERE slug = ?').bind(slug).run();
}

export async function reorderWholesaleCategories(db: D1Database, slugs: string[]): Promise<void> {
  const stmts = slugs.map((slug, i) =>
    db.prepare('UPDATE wholesale_categories SET sort_order = ? WHERE slug = ?').bind(i + 1, slug)
  );
  await db.batch(stmts);
}
