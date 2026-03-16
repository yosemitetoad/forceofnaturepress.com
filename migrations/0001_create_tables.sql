-- Force of Nature Press — D1 schema + seed data
-- Run: wrangler d1 migrations apply fonp-db --local

-- ── Shop Items ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS shop_items (
  sku TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  image TEXT NOT NULL,
  etsy_listing_id TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ── Admin Sessions ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_sessions (
  token TEXT PRIMARY KEY,
  created_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);

-- ── Seed Data: 98 shop items ────────────────────────────────────────────────

-- STICKERS
INSERT INTO shop_items (sku, title, category, price, image, etsy_listing_id, sort_order) VALUES
  ('SEALSTCKR', 'Harbor Seal Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/3bf80f/7637051165/il_fullxfull.7637051165_mwfk.jpg', '4439131247', 1),
  ('BEECLOVERSTCKR', 'Western Bumble Bee on Clover Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/83b1c2/7637123565/il_fullxfull.7637123565_qmli.jpg', '4439135451', 2),
  ('DHHMOTH', 'Death''s Head Hawkmoth Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/9dc680/7492430266/il_fullxfull.7492430266_aqg6.jpg', NULL, 3),
  ('GPOSTCKR', 'Giant Pacific Octopus Sticker', 'stickers', 4.5, 'https://i.etsystatic.com/63085988/r/il/6c1018/7492526300/il_fullxfull.7492526300_rb24.jpg', '4421311811', 4),
  ('FDLHDFRNSTCKR', 'Fiddlehead Fern Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/6ea2be/7745472279/il_fullxfull.7745472279_29et.jpg', '4455853501', 5),
  ('SEAOTTERSTCKR', 'Sea Otter Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/61696d/7620320720/il_fullxfull.7620320720_t9jd.jpg', '4443984168', 6),
  ('PFFNFLWRS', 'Atlantic Puffin Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/630611/7540381009/il_fullxfull.7540381009_ga9g.jpg', '4421292308', 7),
  ('PCFCTREFRGSTCKR', 'Pacific Tree Frog Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/658673/7637165973/il_fullxfull.7637165973_841h.jpg', '4439139602', 8),
  ('SCKEYESLMN', 'Sockeye Salmon Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/6e7f03/7540432771/il_fullxfull.7540432771_7ojv.jpg', '4421304786', 9),
  ('REDBOOBY', 'Red-footed Booby Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/d8d640/7543771683/il_fullxfull.7543771683_60ny.jpg', '4421948335', 10),
  ('BLUEBOOBY', 'Blue-footed Booby Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/8cba8f/7495870094/il_fullxfull.7495870094_q32l.jpg', '4421951485', 11),
  ('LUNAMOTH', 'Luna Moth Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/f123c3/7492413620/il_fullxfull.7492413620_dgu1.jpg', '4421284273', 12),
  ('GLDNMYSTSNAIL', 'Golden Mystery Snail Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/95b76a/7545390352/il_fullxfull.7545390352_1njg.jpg', '4431664676', 13),
  ('REDRCRNRITE', 'Red Racer Nerite Snail Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/4e2527/7545391204/il_fullxfull.7545391204_acj6.jpg', '4431660785', 14),
  ('17YRCICASTCKR', 'Cicada Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/77b40d/7755675585/il_fullxfull.7755675585_aqyt.jpg', '4457439446', 15),
  ('FLYAGRCSTCKR', 'Fly Agaric Mushroom Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/367d25/7707723492/il_fullxfull.7707723492_4w7h.jpg', '4457427777', 16),
  ('BLKBRSTCKR', 'Black Bear Salmonberries Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/c405fc/7749326943/il_fullxfull.7749326943_jzor.jpg', '4455833683', 17),
  ('ORCA', 'Orca Sticker', 'stickers', 4.5, 'https://i.etsystatic.com/63085988/r/il/9c9851/7591202847/il_fullxfull.7591202847_avlj.jpg', '4431275293', 18),
  ('AARDWOLFSTCKR', 'Aardwolf Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/1e0012/7589185020/il_fullxfull.7589185020_a7dl.jpg', '4439146527', 19),
  ('BRNBEAR', 'Brown Bear Sticker', 'stickers', 4.5, 'https://i.etsystatic.com/63085988/r/il/cce8fd/7540478681/il_fullxfull.7540478681_cesp.jpg', '4421314441', 20),
  ('SEABUN', 'Sea Bunny Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/bd290a/7770979707/il_fullxfull.7770979707_dhpj.jpg', '4421300301', 21),
  ('PNKRVRDLPHN', 'Amazon River Dolphin Sticker', 'stickers', 4.5, 'https://i.etsystatic.com/63085988/r/il/c91d25/7591214551/il_fullxfull.7591214551_7pvp.jpg', '4431277187', 22),
  ('SPINYLUMP', 'Pacific Spiny Lumpsucker Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/2606bc/7540408995/il_fullxfull.7540408995_bj88.jpg', '4421298646', 23),
  ('SCRTYBIRD', 'Secretary Bird Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/7627ba/7492454664/il_fullxfull.7492454664_4f0z.jpg', '4421293887', 24),
  ('AXLTLSTCKR', 'Axolotl Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/802981/7652892662/il_fullxfull.7652892662_mzxq.jpg', '4448506495', 25),
  ('MNDRNDCKSTCKRMTT', 'Mandarin Duck Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/ee3e4e/7652900162/il_fullxfull.7652900162_cj8d.jpg', '4448504343', 26),
  ('MIRACSTCKR', 'Crows Mobbing Eagle Sticker', 'stickers', 5, 'https://i.etsystatic.com/63085988/r/il/4c4d83/7638394448/il_fullxfull.7638394448_m9ac.jpg', '4446717048', 27),
  ('OCNSNFSH', 'Ocean Sunfish Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/2f8835/7591127087/il_fullxfull.7591127087_sipa.jpg', '4431254875', 28),
  ('TAPIRSTCKR', 'Malayan Tapir Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/8bb563/7588924194/il_fullxfull.7588924194_if0s.jpg', '4438075348', 29),
  ('CROWSTCKR', 'American Crow Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/deda87/7599500008/il_fullxfull.7599500008_8yhl.jpg', '4440744103', 30),
  ('WHLSHRKSTCKR', 'Whale Shark Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/684965/7637101303/il_fullxfull.7637101303_yn4f.jpg', '4439141091', 31),
  ('KMDODRGNSTCKER', 'Komodo Dragon Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/aa18cc/7637082539/il_fullxfull.7637082539_ruiv.jpg', '4439143318', 32),
  ('SPNBLSTCKER', 'Roseate Spoonbill Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/83c723/7637093027/il_fullxfull.7637093027_12k3.jpg', '4439139609', 33),
  ('ROSYMOTHSTCKR', 'Rosy Maple Moth Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/50d2f9/7492349610/il_fullxfull.7492349610_qyir.jpg', '4421280715', 34),
  ('NARWHAL', 'Narwhal Sticker', 'stickers', 4.5, 'https://i.etsystatic.com/63085988/r/il/150447/7543203814/il_fullxfull.7543203814_ksrq.jpg', '4431266258', 35),
  ('GALS', 'Giant African Land Snail Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/737f37/7593328685/il_fullxfull.7593328685_mfne.jpg', '4431668465', 36),
  ('WSTRNTGRBUTTERFLY', 'Western Tiger Swallowtail Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/9e717d/7593319183/il_fullxfull.7593319183_ey5y.jpg', '4431707388', 37),
  ('BANANASLG', 'Banana Slug Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/d001c9/7591220529/il_fullxfull.7591220529_oiuk.jpg', '4431272107', 38),
  ('NAUTILUS', 'Chambered Nautilus Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/ace77d/7543191154/il_fullxfull.7543191154_ld3r.jpg', '4431256809', 39),
  ('VLVTWRM', 'Velvet Worm Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/39fed1/7591693359/il_fullxfull.7591693359_ope8.jpg', '4431247365', 40),
  ('WHTTREEFRG', 'White''s Tree Frog Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/9f45bc/7492502464/il_fullxfull.7492502464_8plv.jpg', NULL, 41),
  ('BLUWHLE', 'Blue Whale Sticker', 'stickers', 4.5, 'https://i.etsystatic.com/63085988/r/il/3c236c/7723033502/il_fullxfull.7723033502_1wtv.jpg', '4421310948', 42);

-- STICKER SHEETS
INSERT INTO shop_items (sku, title, category, price, image, etsy_listing_id, sort_order) VALUES
  ('PNWBBCSHEET', 'Backyard Bug Club Sticker Sheet', 'sticker-sheets', 10, 'https://i.etsystatic.com/63085988/r/il/681648/7545400892/il_fullxfull.7545400892_351j.jpg', '4431673711', 43),
  ('SNLFANCLUBSHEET', 'Snail Fan Club Sticker Sheet', 'sticker-sheets', 10, 'https://i.etsystatic.com/63085988/r/il/b46da1/7593357301/il_fullxfull.7593357301_troy.jpg', '4431690328', 44),
  ('CETACEANSHEET', 'Cetacean Appreciation Society Sticker Sheet', 'sticker-sheets', 10, 'https://i.etsystatic.com/63085988/r/il/143d1c/7593342481/il_fullxfull.7593342481_kc8f.jpg', '4431685599', 45);

-- KEYCHAINS
INSERT INTO shop_items (sku, title, category, price, image, etsy_listing_id, sort_order) VALUES
  ('PSSMKYCHN', 'Opossum Keychain', 'keychains', 12, 'https://i.etsystatic.com/63085988/r/il/cd4078/7819054513/il_fullxfull.7819054513_qrq9.jpg', '4466755943', 46),
  ('SEABUNKYCHN', 'Sea Bunny Keychain', 'keychains', 12, 'https://i.etsystatic.com/63085988/r/il/910ae3/7701072522/il_fullxfull.7701072522_geb3.jpg', '4455304230', 47),
  ('GPOKYCHN', 'Giant Pacific Octopus Keychain', 'keychains', 12, 'https://i.etsystatic.com/63085988/r/il/c1f939/7743532032/il_fullxfull.7743532032_ccci.jpg', '4462596626', 48),
  ('PFNFLWRSKYCHN', 'Atlantic Puffin Keychain', 'keychains', 12, 'https://i.etsystatic.com/63085988/r/il/e1c85b/7749010939/il_fullxfull.7749010939_epi2.jpg', '4455308350', 49),
  ('SCKEYESLMNKYCHN', 'Sockeye Salmon Keychain', 'keychains', 12, 'https://i.etsystatic.com/63085988/r/il/c6d6d7/7764306725/il_fullxfull.7764306725_rvpm.jpg', '4455305011', 50),
  ('ORCAKYCHN', 'Orca Keychain', 'keychains', 12, 'https://i.etsystatic.com/63085988/r/il/3b4743/7701069930/il_fullxfull.7701069930_t4rh.jpg', '4455309342', 51),
  ('BLKBRKYCHN', 'Black Bear Keychain', 'keychains', 12, 'https://i.etsystatic.com/63085988/r/il/03721f/7701114346/il_fullxfull.7701114346_4y5w.jpg', '4455306568', 52);

-- EARRINGS
INSERT INTO shop_items (sku, title, category, price, image, etsy_listing_id, sort_order) VALUES
  ('PSSMSLVR', 'Opossum Earrings', 'earrings', 22, 'https://i.etsystatic.com/63085988/r/il/f1243c/7771104624/il_fullxfull.7771104624_id3z.jpg', '4466759244', 53),
  ('MOONJLYGLD', 'Moon Jellyfish Earrings', 'earrings', 22, 'https://i.etsystatic.com/63085988/r/il/39832b/7723334354/il_fullxfull.7723334354_gi5u.jpg', '4459702650', 54),
  ('CICADAGLD', 'Cicada Earrings', 'earrings', 22, 'https://i.etsystatic.com/63085988/r/il/1ce764/7723318072/il_fullxfull.7723318072_3ix6.jpg', '4453804153', 55),
  ('RSYMPLGLD', 'Rosy Maple Moth Earrings', 'earrings', 22, 'https://i.etsystatic.com/63085988/r/il/9b0839/7771268523/il_fullxfull.7771268523_ot7c.jpg', '4453809440', 56),
  ('SLMNGLD', 'Sockeye Salmon Earrings', 'earrings', 22, 'https://i.etsystatic.com/63085988/r/il/f4337f/7771269389/il_fullxfull.7771269389_1ga0.jpg', '4453801165', 57),
  ('LNMTHGLD', 'Luna Moth Earrings', 'earrings', 22, 'https://i.etsystatic.com/63085988/r/il/8befd5/7723322592/il_fullxfull.7723322592_zkih.jpg', '4453800123', 58),
  ('FDLHDFRNGLD', 'Fiddlehead Fern Earrings', 'earrings', 22, 'https://i.etsystatic.com/63085988/r/il/fbf31f/7771273919/il_fullxfull.7771273919_a4x4.jpg', '4453798819', 59),
  ('FLYAGRCGLD', 'Fly Agaric Mushroom Earrings', 'earrings', 22, 'https://i.etsystatic.com/63085988/r/il/ed279c/7771264061/il_fullxfull.7771264061_68ff.jpg', '4457425827', 60);

-- BUTTONS & PINS
INSERT INTO shop_items (sku, title, category, price, image, etsy_listing_id, sort_order) VALUES
  ('SOCKEYEPIN', 'Sockeye Salmon Button', 'buttons', 3, 'https://i.etsystatic.com/63085988/r/il/957b2f/7603039692/il_fullxfull.7603039692_hnjl.jpg', '4432804768', 61),
  ('TAPIRPIN', 'Malayan Tapir Button', 'buttons', 3, 'https://i.etsystatic.com/63085988/r/il/0d13ea/7603037878/il_fullxfull.7603037878_fo9a.jpg', '4432808650', 62),
  ('BANANSLGPIN', 'Banana Slug Button', 'buttons', 3, 'https://i.etsystatic.com/63085988/r/il/5bc5ba/7650983129/il_fullxfull.7650983129_i4ac.jpg', '4432801557', 63),
  ('PTFPIN', 'Pacific Tree Frog Button', 'buttons', 3, 'https://i.etsystatic.com/63085988/r/il/c41644/7603079588/il_fullxfull.7603079588_38a3.jpg', '4441309891', 64),
  ('CROWPIN', 'American Crow Button', 'buttons', 3, 'https://i.etsystatic.com/63085988/r/il/ef6b2d/7603060966/il_fullxfull.7603060966_r85a.jpg', '4441314610', 65),
  ('HRBRSLPIN', 'Harbor Seal Button', 'buttons', 3, 'https://i.etsystatic.com/63085988/r/il/a0b614/7650986847/il_fullxfull.7650986847_5x7o.jpg', '4441304431', 66),
  ('CNPIN', 'Chambered Nautilus Button', 'buttons', 3, 'https://i.etsystatic.com/63085988/r/il/c1b97a/7650979629/il_fullxfull.7650979629_7v6m.jpg', '4432800571', 67),
  ('RMMPIN', 'Rosy Maple Moth Button', 'buttons', 3, 'https://i.etsystatic.com/63085988/r/il/1de649/7650981543/il_fullxfull.7650981543_r1x3.jpg', '4432805425', 68);

-- GIFT SETS (pins + magnets bundles)
INSERT INTO shop_items (sku, title, category, price, image, etsy_listing_id, sort_order) VALUES
  ('PINBUNDLE', 'Nature Illustrations Pin Set — Pick Any 3', 'gift-sets', 8, 'https://i.etsystatic.com/63085988/r/il/453dba/7603113980/il_fullxfull.7603113980_sfpz.jpg', '4441303843', 69);

-- MAGNETS
INSERT INTO shop_items (sku, title, category, price, image, etsy_listing_id, sort_order) VALUES
  ('BANANASLGMGNT', 'Banana Slug Magnet', 'magnets', 4, 'https://i.etsystatic.com/63085988/r/il/ea7beb/7603203566/il_fullxfull.7603203566_rc6v.jpg', '4441339338', 70),
  ('RMMMGNT', 'Rosy Maple Moth Magnet', 'magnets', 4, 'https://i.etsystatic.com/63085988/r/il/d6a7f8/7651158907/il_fullxfull.7651158907_1b5j.jpg', '4441333009', 71),
  ('HRBRSLMGNT', 'Harbor Seal Magnet', 'magnets', 4, 'https://i.etsystatic.com/63085988/r/il/74884e/7603209942/il_fullxfull.7603209942_6oy6.jpg', '4441332189', 72),
  ('SALMONMGNT', 'Sockeye Salmon Magnet', 'magnets', 4, 'https://i.etsystatic.com/63085988/r/il/75c891/7603198066/il_fullxfull.7603198066_akoj.jpg', '4441338338', 73),
  ('NAUTILUSMGNT', 'Chambered Nautilus Magnet', 'magnets', 4, 'https://i.etsystatic.com/63085988/r/il/070176/7603193542/il_fullxfull.7603193542_nc8n.jpg', '4441329179', 74),
  ('TAPIRMGNT', 'Malayan Tapir Magnet', 'magnets', 4, 'https://i.etsystatic.com/63085988/r/il/8b1418/7603191412/il_fullxfull.7603191412_8wmd.jpg', '4441327733', 75),
  ('CROWMGNT', 'American Crow Magnet', 'magnets', 4, 'https://i.etsystatic.com/63085988/r/il/f28525/7603178538/il_fullxfull.7603178538_63d9.jpg', '4441334876', 76),
  ('FROGMGNT', 'Pacific Tree Frog Magnet', 'magnets', 4, 'https://i.etsystatic.com/63085988/r/il/95d9d9/7603157708/il_fullxfull.7603157708_prod.jpg', '4441333816', 77),
  ('MGNTBUNDLE', 'Nature Illustrations Magnet Set — Pick Any 3', 'gift-sets', 10, 'https://i.etsystatic.com/63085988/r/il/90a22b/7603235908/il_fullxfull.7603235908_71us.jpg', '4441338173', 78);

-- PRINTS
INSERT INTO shop_items (sku, title, category, price, image, etsy_listing_id, sort_order) VALUES
  ('SEALIONPRNT', 'California Sea Lion Art Print', 'prints', 18, 'https://i.etsystatic.com/63085988/r/il/fd17fd/7645120422/il_fullxfull.7645120422_l3i0.jpg', '4447777839', 79),
  ('NAUTILUSPRNT', 'Chambered Nautilus Art Print', 'prints', 18, 'https://i.etsystatic.com/63085988/r/il/ac3685/7620272668/il_fullxfull.7620272668_lwtf.jpg', '4443966841', 80),
  ('OTTERPRNT', 'Sea Otter Art Print', 'prints', 18, 'https://i.etsystatic.com/63085988/r/il/32e972/7620205892/il_fullxfull.7620205892_qgdw.jpg', '4443959293', 81),
  ('TAPIRLINO', 'Malayan Tapir Linocut Print', 'prints', 40, 'https://i.etsystatic.com/63085988/r/il/b1fc1f/7675603075/il_fullxfull.7675603075_lm0o.jpg', '4445122797', 82),
  ('RACLINO', 'Raccoon Linocut Print', 'prints', 25, 'https://i.etsystatic.com/63085988/r/il/f31a6a/7627645210/il_fullxfull.7627645210_pd6g.jpg', '4445120861', 83),
  ('TRDIGRDELINO', 'Tardigrade Linocut Print', 'prints', 25, 'https://i.etsystatic.com/63085988/r/il/67446d/7627641276/il_fullxfull.7627641276_5v8s.jpg', '4445118653', 84),
  ('ANTEATERLINO', 'Giant Anteater Linocut Print', 'prints', 22, 'https://i.etsystatic.com/63085988/r/il/30a744/7540506249/il_fullxfull.7540506249_aegh.jpg', '4421322948', 85),
  ('STGBTLELINO', 'Stag Beetle Linocut Print', 'prints', 22, 'https://i.etsystatic.com/63085988/r/il/367438/7540561055/il_fullxfull.7540561055_k0o7.jpg', '4421333654', 86),
  ('SPNLUMPLINO', 'Pacific Spiny Lumpsucker Linocut Print', 'prints', 22, 'https://i.etsystatic.com/63085988/r/il/a054b0/7492600530/il_fullxfull.7492600530_hsl8.jpg', '4421325961', 87),
  ('MANTISLINO', 'Praying Mantis Linocut Print', 'prints', 22, 'https://i.etsystatic.com/63085988/r/il/de6975/7492603614/il_fullxfull.7492603614_28w5.jpg', '4421328021', 88),
  ('GILAMONLINO', 'Gila Monster Linocut Print', 'prints', 22, 'https://i.etsystatic.com/63085988/r/il/4b606f/7540515689/il_fullxfull.7540515689_nqzu.jpg', '4421326200', 89);

-- GIFT SETS (remaining)
INSERT INTO shop_items (sku, title, category, price, image, etsy_listing_id, sort_order) VALUES
  ('SCKEYESLMNBUNDL', 'Sockeye Salmon Gift Set', 'gift-sets', 16, 'https://i.etsystatic.com/63085988/r/il/7d0f94/7764323931/il_fullxfull.7764323931_9aiy.jpg', '4458708826', 90),
  ('CICADAGLDBUND', 'Cicada Gift Set', 'gift-sets', 24, 'https://i.etsystatic.com/63085988/r/il/25ea12/7723401094/il_fullxfull.7723401094_hi9j.jpg', '4457443049', 91),
  ('FLYAGRCGLDBUND', 'Fly Agaric Mushroom Gift Set', 'gift-sets', 24, 'https://i.etsystatic.com/63085988/r/il/9d8941/7771645089/il_fullxfull.7771645089_5067.jpg', '4457435487', 92);

-- NEWER ITEMS (stamp stickers, opossum, raccoon)
INSERT INTO shop_items (sku, title, category, price, image, etsy_listing_id, sort_order) VALUES
  ('4467853176', 'Western Black Widow Stamp Sticker', 'stickers', 5, 'https://i.etsystatic.com/63085988/r/il/30da99/7826236745/il_1588xN.7826236745_pfns.jpg', '4467853176', 93),
  ('4467855174', 'Arctic Bumblebee Stamp Sticker', 'stickers', 5, 'https://i.etsystatic.com/63085988/r/il/7598b2/7778346398/il_1588xN.7778346398_o312.jpg', '4467855174', 94),
  ('4467848365', 'Cecropia Moth Stamp Sticker', 'stickers', 5, 'https://i.etsystatic.com/63085988/r/il/0332d0/7778353420/il_1588xN.7778353420_4fnh.jpg', '4467848365', 95),
  ('4467858004', 'Nature Stamp Sticker Set', 'gift-sets', 12, 'https://i.etsystatic.com/63085988/r/il/057013/7778363816/il_1588xN.7778363816_1oab.jpg', '4467858004', 96),
  ('4469333696', 'Opossum Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/89e77a/7835885943/il_1588xN.7835885943_b6zg.jpg', '4469333696', 97),
  ('4469328091', 'Raccoon Sticker', 'stickers', 4, 'https://i.etsystatic.com/63085988/r/il/6a5966/7835892691/il_1588xN.7835892691_czmy.jpg', '4469328091', 98);
