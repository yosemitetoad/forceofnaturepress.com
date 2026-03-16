-- Analytics events table
-- Tracks shop page views and product clicks

CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL,        -- 'page_view' or 'product_click'
  sku TEXT,                        -- null for page views, item SKU for clicks
  page TEXT NOT NULL,              -- '/shop', '/', etc.
  referrer TEXT,                   -- where visitor came from
  created_at TEXT DEFAULT (datetime('now'))
);

-- Indexes for fast dashboard queries
CREATE INDEX idx_events_type_date ON analytics_events (event_type, created_at);
CREATE INDEX idx_events_sku ON analytics_events (sku, created_at);
