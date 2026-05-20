CREATE TABLE IF NOT EXISTS wholesale_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sku TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  wholesale_price REAL NOT NULL DEFAULT 0,
  rrp REAL NOT NULL DEFAULT 0,
  moq INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO page_content (key, value) VALUES
  ('wholesale_terms', 'Placeholder — add your wholesale terms here.'),
  ('wholesale_contact_intro', 'Interested in stocking Force of Nature Press products? Get in touch using the form below or email directly.'),
  ('wholesale_password', '');
