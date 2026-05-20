CREATE TABLE IF NOT EXISTS whats_new_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL DEFAULT '',
  text TEXT NOT NULL DEFAULT '',
  link_text TEXT NOT NULL DEFAULT '',
  link_url TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  archived INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  archived_at TEXT
);

-- Seed with current default items
INSERT INTO whats_new_items (title, text, link_text, link_url, sort_order) VALUES
  ('Play Dress Up Beetle!', 'Our very first browser game is live! Dress up your own beetle with hats, accessories, and more.', 'Head over to Games to try it out!', '/games', 1),
  ('New Stickers & Prints', 'Fresh designs are hitting the shop regularly -- keep an eye out for new nature-themed goodies.', 'Browse the latest drops.', '/shop', 2);
