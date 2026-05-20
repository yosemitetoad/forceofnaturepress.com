-- Add per-item category override to wholesale_items
ALTER TABLE wholesale_items ADD COLUMN wholesale_category TEXT;

-- Category metadata table: owns sort order and display labels
CREATE TABLE IF NOT EXISTS wholesale_categories (
  slug TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Seed from existing wholesale items (JOIN with shop_items to get current categories)
INSERT OR IGNORE INTO wholesale_categories (slug, label, sort_order)
SELECT DISTINCT
  s.category,
  CASE s.category
    WHEN 'stickers'       THEN 'Stickers'
    WHEN 'sticker-sheets' THEN 'Sticker Sheets'
    WHEN 'prints'         THEN 'Prints'
    WHEN 'buttons'        THEN 'Buttons'
    WHEN 'magnets'        THEN 'Magnets'
    WHEN 'keychains'      THEN 'Keychains'
    WHEN 'earrings'       THEN 'Earrings'
    WHEN 'bookmarks'      THEN 'Bookmarks'
    WHEN 'greeting-cards' THEN 'Greeting Cards'
    WHEN 'gift-sets'      THEN 'Gift Sets'
    ELSE s.category
  END,
  CASE s.category
    WHEN 'stickers'       THEN 1
    WHEN 'sticker-sheets' THEN 2
    WHEN 'prints'         THEN 3
    WHEN 'buttons'        THEN 4
    WHEN 'magnets'        THEN 5
    WHEN 'keychains'      THEN 6
    WHEN 'earrings'       THEN 7
    WHEN 'bookmarks'      THEN 8
    WHEN 'greeting-cards' THEN 9
    WHEN 'gift-sets'      THEN 10
    ELSE 99
  END
FROM wholesale_items w
LEFT JOIN shop_items s ON w.sku = s.sku
WHERE s.category IS NOT NULL;
