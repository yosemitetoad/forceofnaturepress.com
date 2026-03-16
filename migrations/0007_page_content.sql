-- Key-value store for editable page content
CREATE TABLE IF NOT EXISTS page_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Structured game cards
CREATE TABLE IF NOT EXISTS game_cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  link TEXT NOT NULL DEFAULT '',
  link_type TEXT NOT NULL DEFAULT 'play',
  status TEXT NOT NULL DEFAULT 'published',
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Seed page_content with current hardcoded values
INSERT INTO page_content (key, value) VALUES
  -- Home: intro paragraphs
  ('home_intro_p1', 'Force of Nature Press is a small, independent art shop based in the Pacific Northwest. We create nature-inspired stickers, linocut prints, keychains, earrings, and other handmade goods celebrating the beauty of the natural world.'),
  ('home_intro_p2', 'Every piece is designed and produced by hand with care -- from the original illustrations to the final product. Whether you''re drawn to mossy forests, ocean creatures, or backyard bugs, there''s something here for you.'),
  -- Home: featured product SKUs (comma-separated)
  ('home_featured_skus', '4467858004,FLYAGRCGLD,PSSMKYCHN,RACLINO,BEECLOVERSTCKR,OTTERPRNT,SOCKEYEPIN,HRBRSLMGNT'),
  -- Home: what's new items (JSON array)
  ('home_whats_new', '[{"title":"Play Dress Up Beetle!","text":"Our very first browser game is live! Dress up your own beetle with hats, accessories, and more.","linkText":"Head over to Games to try it out!","linkUrl":"/games"},{"title":"New Stickers & Prints","text":"Fresh designs are hitting the shop regularly -- keep an eye out for new nature-themed goodies.","linkText":"Browse the latest drops.","linkUrl":"/shop"}]'),
  -- About: bio paragraphs (JSON array)
  ('about_bio', '["Hello there! I''m Riley. I wear many hats, but you could call me an artist, designer, printmaker, and ecologist. I was born and raised in the heart of the Pacific Northwest, Seattle, WA, where I still live today, though I''ve also lived in Cornwall in the UK as well.","I started Force of Nature Press in 2025 after graduating with a master''s degree in evolutionary ecology from the University of Exeter, where I wrote my dissertation in collaboration with the Natural History Museum in London. I''ve also previously worked in animal care and dog training at an animal shelter, and cared for a variety of invertebrates at a zoo. I''ve always loved to draw and create, and anyone who knows me knows how much I can go on and on about animals, so it seemed like a natural fit (mind the pun!) to enter a career that can translate intellectual knowledge of nature to tangible art forms. I like to focus my work on some of the weirder creatures out there, maybe ones you haven''t heard of before or ones you never even knew could exist, to spread awareness of the beautiful natural diversity on our Earth.","Outside of Force of Nature Press, I like to explore the forest, visit museums, play video games like Animal Crossing and The Sims, play bass guitar, and hang out with my one-eyed tuxedo cat, Muppet.","Force of Nature Press is a one-person show run out of my home studio in Seattle. I make and ship everything myself, from stickers to lino prints to buttons to earrings to games to even the website you''re reading this on. I am also open to freelance work and collaborations; please email me at {EMAIL} or fill out my {CONTACT_FORM} if you''d like to explore working together!"]'),
  -- Contact: header
  ('contact_header', 'Get in Touch'),
  ('contact_subheader', 'Questions about an order, a wholesale inquiry, or just want to say hi? Here''s where to find me.'),
  -- Contact: card descriptions (JSON)
  ('contact_cards', '[{"key":"email","description":"For wholesale inquiries, freelance opportunities, collabs, projects, or anything else."},{"key":"instagram","description":"Behind-the-scenes, new releases, and nature photography."},{"key":"pinterest","description":"Nature inspiration boards and artwork collections."},{"key":"etsy","description":"For questions regarding Etsy orders, please message me on Etsy instead of emailing or filling out the contact form!"}]'),
  -- Shop header
  ('shop_header', 'Shop'),
  ('shop_subheader', 'All products ship from the Pacific Northwest. Click any item to purchase on Etsy.'),
  -- Portfolio header
  ('portfolio_header', 'Portfolio'),
  ('portfolio_subheader', 'Original nature illustrations — sticker designs, linocut prints, and art prints.'),
  -- Blog header
  ('blog_header', 'Blog'),
  ('blog_subheader', 'Behind the scenes, new releases, and nature notes from the studio.'),
  -- Games header
  ('games_header', 'Games'),
  ('games_subheader', 'Interactive projects and browser games — click to play right here in your browser.');

-- Seed game_cards with current games
INSERT INTO game_cards (title, category, description, image, link, link_type, status, sort_order) VALUES
  ('Dress Up Beetle!', 'Browser Game', 'Deck out your stag beetle in hats, outfits, and accessories! Drag items from the panel, rotate and scale them, then take a screenshot of your creation. A cozy little dress-up game featuring original Force of Nature Press artwork.', '/dressupbeetlecover.webp', '/games/dress-up-beetle/dress-up-beetle.html', 'play', 'published', 1),
  ('What Creature Are You?', 'Personality Quiz', 'Answer a few questions to find out which Force of Nature Press creature matches your personality. Are you a Luna Moth, a Banana Slug, a Sea Otter? Take the quiz and find out!', '/games/creature-quiz/images/creaturequiz_coverimage.webp', '/games/creature-quiz/index.html', 'play', 'published', 2),
  ('For the Love of Nature (DEMO)', 'Visual Novel', 'Welcome to Meadow''s End, a town full of natural beauty, as well as beautiful... bugs? In this demo, get to know Bedelia Bee, a shy shop girl with big dreams.', '/games/dating-sim/images/datingsim_coverimage_demo.webp', '', 'dev', 'in_development', 3);
