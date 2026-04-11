-- Simple redirect table for managing URL changes
CREATE TABLE IF NOT EXISTS redirects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_path TEXT NOT NULL UNIQUE,
  to_path TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
