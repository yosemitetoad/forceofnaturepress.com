ALTER TABLE wholesale_categories ADD COLUMN description TEXT NOT NULL DEFAULT '';

UPDATE wholesale_categories SET description = CASE slug
  WHEN 'stickers'       THEN 'Individual die-cut vinyl stickers, printed with a glossy finish.'
  WHEN 'sticker-sheets' THEN 'Coordinated sticker sheets featuring multiple designs on a single sheet.'
  WHEN 'prints'         THEN 'Art prints on premium paper, ready to frame.'
  WHEN 'buttons'        THEN '1.25" pinback buttons with a sturdy steel back.'
  WHEN 'magnets'        THEN 'High-quality magnets suitable for fridges and metal surfaces.'
  WHEN 'keychains'      THEN 'Acrylic keychains with a silver keyring included.'
  WHEN 'earrings'       THEN 'Lightweight acrylic earrings with hypoallergenic stainless steel hooks.'
  WHEN 'bookmarks'      THEN 'Laminated bookmarks.'
  WHEN 'greeting-cards' THEN 'All greeting cards come with a matching envelope, individually wrapped in cellophane.'
  WHEN 'gift-sets'      THEN 'Curated gift sets, packaged and ready to give.'
  ELSE ''
END;
