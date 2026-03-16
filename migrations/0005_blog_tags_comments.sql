-- Add tags and comments_enabled to blog_posts
ALTER TABLE blog_posts ADD COLUMN tags TEXT NOT NULL DEFAULT '';
ALTER TABLE blog_posts ADD COLUMN comments_enabled INTEGER NOT NULL DEFAULT 1;

-- Comments table
CREATE TABLE IF NOT EXISTS blog_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  approved INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_comments_post ON blog_comments(post_id, approved, created_at);
