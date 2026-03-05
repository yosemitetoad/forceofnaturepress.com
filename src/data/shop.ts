// Force of Nature Press — shop product data
// To link directly to individual Etsy listings, add the numeric listing ID
// from the Etsy URL (e.g., etsy.com/listing/1234567890/...) to etsyListingId.
// Without it, clicking will search the shop for that product name.

export type ShopCategory =
  | 'stickers'
  | 'sticker-sheets'
  | 'keychains'
  | 'earrings'
  | 'buttons'
  | 'magnets'
  | 'prints'
  | 'gift-sets';

export const CATEGORY_LABELS: Record<ShopCategory, string> = {
  stickers: 'Stickers',
  'sticker-sheets': 'Sticker Sheets',
  keychains: 'Keychains',
  earrings: 'Earrings',
  buttons: 'Buttons & Pins',
  magnets: 'Magnets',
  prints: 'Prints',
  'gift-sets': 'Gift Sets',
};

export interface ShopItem {
  sku: string;
  title: string;
  category: ShopCategory;
  price: number;
  image: string;
  etsyListingId?: string;
}

export function getEtsyUrl(item: ShopItem): string {
  if (item.etsyListingId) {
    return `https://www.etsy.com/listing/${item.etsyListingId}`;
  }
  const q = encodeURIComponent(item.title);
  return `https://www.etsy.com/shop/forceofnaturepress?search_query=${q}`;
}

export const SHOP_ITEMS: ShopItem[] = [
  // ── STICKERS ────────────────────────────────────────────────────────────
  {
    sku: 'SEALSTCKR',
    title: 'Harbor Seal Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/3bf80f/7637051165/il_fullxfull.7637051165_mwfk.jpg',
  },
  {
    sku: 'BEECLOVERSTCKR',
    title: 'Western Bumble Bee on Clover Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/83b1c2/7637123565/il_fullxfull.7637123565_qmli.jpg',
  },
  {
    sku: 'DHHMOTH',
    title: "Death's Head Hawkmoth Sticker",
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/9dc680/7492430266/il_fullxfull.7492430266_aqg6.jpg',
  },
  {
    sku: 'GPOSTCKR',
    title: 'Giant Pacific Octopus Sticker',
    category: 'stickers',
    price: 4.5,
    image: 'https://i.etsystatic.com/63085988/r/il/6c1018/7492526300/il_fullxfull.7492526300_rb24.jpg',
  },
  {
    sku: 'FDLHDFRNSTCKR',
    title: 'Fiddlehead Fern Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/6ea2be/7745472279/il_fullxfull.7745472279_29et.jpg',
  },
  {
    sku: 'SEAOTTERSTCKR',
    title: 'Sea Otter Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/61696d/7620320720/il_fullxfull.7620320720_t9jd.jpg',
  },
  {
    sku: 'PFFNFLWRS',
    title: 'Atlantic Puffin Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/630611/7540381009/il_fullxfull.7540381009_ga9g.jpg',
  },
  {
    sku: 'PCFCTREFRGSTCKR',
    title: 'Pacific Tree Frog Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/658673/7637165973/il_fullxfull.7637165973_841h.jpg',
  },
  {
    sku: 'SCKEYESLMN',
    title: 'Sockeye Salmon Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/6e7f03/7540432771/il_fullxfull.7540432771_7ojv.jpg',
  },
  {
    sku: 'REDBOOBY',
    title: 'Red-footed Booby Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/d8d640/7543771683/il_fullxfull.7543771683_60ny.jpg',
  },
  {
    sku: 'BLUEBOOBY',
    title: 'Blue-footed Booby Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/8cba8f/7495870094/il_fullxfull.7495870094_q32l.jpg',
  },
  {
    sku: 'LUNAMOTH',
    title: 'Luna Moth Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/f123c3/7492413620/il_fullxfull.7492413620_dgu1.jpg',
  },
  {
    sku: 'GLDNMYSTSNAIL',
    title: 'Golden Mystery Snail Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/95b76a/7545390352/il_fullxfull.7545390352_1njg.jpg',
  },
  {
    sku: 'REDRCRNRITE',
    title: 'Red Racer Nerite Snail Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/4e2527/7545391204/il_fullxfull.7545391204_acj6.jpg',
  },
  {
    sku: '17YRCICASTCKR',
    title: 'Cicada Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/77b40d/7755675585/il_fullxfull.7755675585_aqyt.jpg',
  },
  {
    sku: 'FLYAGRCSTCKR',
    title: 'Fly Agaric Mushroom Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/367d25/7707723492/il_fullxfull.7707723492_4w7h.jpg',
  },
  {
    sku: 'BLKBRSTCKR',
    title: 'Black Bear Salmonberries Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/c405fc/7749326943/il_fullxfull.7749326943_jzor.jpg',
  },
  {
    sku: 'ORCA',
    title: 'Orca Sticker',
    category: 'stickers',
    price: 4.5,
    image: 'https://i.etsystatic.com/63085988/r/il/9c9851/7591202847/il_fullxfull.7591202847_avlj.jpg',
  },
  {
    sku: 'AARDWOLFSTCKR',
    title: 'Aardwolf Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/1e0012/7589185020/il_fullxfull.7589185020_a7dl.jpg',
  },
  {
    sku: 'BRNBEAR',
    title: 'Brown Bear Sticker',
    category: 'stickers',
    price: 4.5,
    image: 'https://i.etsystatic.com/63085988/r/il/cce8fd/7540478681/il_fullxfull.7540478681_cesp.jpg',
  },
  {
    sku: 'SEABUN',
    title: 'Sea Bunny Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/bd290a/7770979707/il_fullxfull.7770979707_dhpj.jpg',
  },
  {
    sku: 'PNKRVRDLPHN',
    title: 'Amazon River Dolphin Sticker',
    category: 'stickers',
    price: 4.5,
    image: 'https://i.etsystatic.com/63085988/r/il/c91d25/7591214551/il_fullxfull.7591214551_7pvp.jpg',
  },
  {
    sku: 'SPINYLUMP',
    title: 'Pacific Spiny Lumpsucker Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/2606bc/7540408995/il_fullxfull.7540408995_bj88.jpg',
  },
  {
    sku: 'SCRTYBIRD',
    title: 'Secretary Bird Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/7627ba/7492454664/il_fullxfull.7492454664_4f0z.jpg',
  },
  {
    sku: 'AXLTLSTCKR',
    title: 'Axolotl Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/802981/7652892662/il_fullxfull.7652892662_mzxq.jpg',
  },
  {
    sku: 'MNDRNDCKSTCKRMTT',
    title: 'Mandarin Duck Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/ee3e4e/7652900162/il_fullxfull.7652900162_cj8d.jpg',
  },
  {
    sku: 'MIRACSTCKR',
    title: 'Crows Mobbing Eagle Sticker',
    category: 'stickers',
    price: 5,
    image: 'https://i.etsystatic.com/63085988/r/il/4c4d83/7638394448/il_fullxfull.7638394448_m9ac.jpg',
  },
  {
    sku: 'OCNSNFSH',
    title: 'Ocean Sunfish Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/2f8835/7591127087/il_fullxfull.7591127087_sipa.jpg',
  },
  {
    sku: 'TAPIRSTCKR',
    title: 'Malayan Tapir Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/8bb563/7588924194/il_fullxfull.7588924194_if0s.jpg',
  },
  {
    sku: 'CROWSTCKR',
    title: 'American Crow Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/deda87/7599500008/il_fullxfull.7599500008_8yhl.jpg',
  },
  {
    sku: 'WHLSHRKSTCKR',
    title: 'Whale Shark Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/684965/7637101303/il_fullxfull.7637101303_yn4f.jpg',
  },
  {
    sku: 'KMDODRGNSTCKER',
    title: 'Komodo Dragon Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/aa18cc/7637082539/il_fullxfull.7637082539_ruiv.jpg',
  },
  {
    sku: 'SPNBLSTCKER',
    title: 'Roseate Spoonbill Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/83c723/7637093027/il_fullxfull.7637093027_12k3.jpg',
  },
  {
    sku: 'ROSYMOTHSTCKR',
    title: 'Rosy Maple Moth Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/50d2f9/7492349610/il_fullxfull.7492349610_qyir.jpg',
  },
  {
    sku: 'NARWHAL',
    title: 'Narwhal Sticker',
    category: 'stickers',
    price: 4.5,
    image: 'https://i.etsystatic.com/63085988/r/il/150447/7543203814/il_fullxfull.7543203814_ksrq.jpg',
  },
  {
    sku: 'GALS',
    title: 'Giant African Land Snail Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/737f37/7593328685/il_fullxfull.7593328685_mfne.jpg',
  },
  {
    sku: 'WSTRNTGRBUTTERFLY',
    title: 'Western Tiger Swallowtail Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/9e717d/7593319183/il_fullxfull.7593319183_ey5y.jpg',
  },
  {
    sku: 'BANANASLG',
    title: 'Banana Slug Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/d001c9/7591220529/il_fullxfull.7591220529_oiuk.jpg',
  },
  {
    sku: 'NAUTILUS',
    title: 'Chambered Nautilus Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/ace77d/7543191154/il_fullxfull.7543191154_ld3r.jpg',
  },
  {
    sku: 'VLVTWRM',
    title: 'Velvet Worm Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/39fed1/7591693359/il_fullxfull.7591693359_ope8.jpg',
  },
  {
    sku: 'WHTTREEFRG',
    title: "White's Tree Frog Sticker",
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/9f45bc/7492502464/il_fullxfull.7492502464_8plv.jpg',
  },
  {
    sku: 'BLUWHLE',
    title: 'Blue Whale Sticker',
    category: 'stickers',
    price: 4.5,
    image: 'https://i.etsystatic.com/63085988/r/il/3c236c/7723033502/il_fullxfull.7723033502_1wtv.jpg',
  },

  // ── STICKER SHEETS ──────────────────────────────────────────────────────
  {
    sku: 'PNWBBCSHEET',
    title: 'Backyard Bug Club Sticker Sheet',
    category: 'sticker-sheets',
    price: 10,
    image: 'https://i.etsystatic.com/63085988/r/il/681648/7545400892/il_fullxfull.7545400892_351j.jpg',
  },
  {
    sku: 'SNLFANCLUBSHEET',
    title: 'Snail Fan Club Sticker Sheet',
    category: 'sticker-sheets',
    price: 10,
    image: 'https://i.etsystatic.com/63085988/r/il/b46da1/7593357301/il_fullxfull.7593357301_troy.jpg',
  },
  {
    sku: 'CETACEANSHEET',
    title: 'Cetacean Appreciation Society Sticker Sheet',
    category: 'sticker-sheets',
    price: 10,
    image: 'https://i.etsystatic.com/63085988/r/il/143d1c/7593342481/il_fullxfull.7593342481_kc8f.jpg',
  },

  // ── KEYCHAINS ───────────────────────────────────────────────────────────
  {
    sku: 'PSSMKYCHN',
    title: 'Opossum Keychain',
    category: 'keychains',
    price: 12,
    image: 'https://i.etsystatic.com/63085988/r/il/cd4078/7819054513/il_fullxfull.7819054513_qrq9.jpg',
  },
  {
    sku: 'SEABUNKYCHN',
    title: 'Sea Bunny Keychain',
    category: 'keychains',
    price: 12,
    image: 'https://i.etsystatic.com/63085988/r/il/910ae3/7701072522/il_fullxfull.7701072522_geb3.jpg',
  },
  {
    sku: 'GPOKYCHN',
    title: 'Giant Pacific Octopus Keychain',
    category: 'keychains',
    price: 12,
    image: 'https://i.etsystatic.com/63085988/r/il/c1f939/7743532032/il_fullxfull.7743532032_ccci.jpg',
  },
  {
    sku: 'PFNFLWRSKYCHN',
    title: 'Atlantic Puffin Keychain',
    category: 'keychains',
    price: 12,
    image: 'https://i.etsystatic.com/63085988/r/il/e1c85b/7749010939/il_fullxfull.7749010939_epi2.jpg',
  },
  {
    sku: 'SCKEYESLMNKYCHN',
    title: 'Sockeye Salmon Keychain',
    category: 'keychains',
    price: 12,
    image: 'https://i.etsystatic.com/63085988/r/il/c6d6d7/7764306725/il_fullxfull.7764306725_rvpm.jpg',
  },
  {
    sku: 'ORCAKYCHN',
    title: 'Orca Keychain',
    category: 'keychains',
    price: 12,
    image: 'https://i.etsystatic.com/63085988/r/il/3b4743/7701069930/il_fullxfull.7701069930_t4rh.jpg',
  },
  {
    sku: 'BLKBRKYCHN',
    title: 'Black Bear Keychain',
    category: 'keychains',
    price: 12,
    image: 'https://i.etsystatic.com/63085988/r/il/03721f/7701114346/il_fullxfull.7701114346_4y5w.jpg',
  },

  // ── EARRINGS ────────────────────────────────────────────────────────────
  {
    sku: 'PSSMSLVR',
    title: 'Opossum Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/f1243c/7771104624/il_fullxfull.7771104624_id3z.jpg',
  },
  {
    sku: 'MOONJLYGLD',
    title: 'Moon Jellyfish Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/39832b/7723334354/il_fullxfull.7723334354_gi5u.jpg',
  },
  {
    sku: 'CICADAGLD',
    title: 'Cicada Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/1ce764/7723318072/il_fullxfull.7723318072_3ix6.jpg',
  },
  {
    sku: 'RSYMPLGLD',
    title: 'Rosy Maple Moth Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/9b0839/7771268523/il_fullxfull.7771268523_ot7c.jpg',
  },
  {
    sku: 'SLMNGLD',
    title: 'Sockeye Salmon Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/f4337f/7771269389/il_fullxfull.7771269389_1ga0.jpg',
  },
  {
    sku: 'LNMTHGLD',
    title: 'Luna Moth Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/8befd5/7723322592/il_fullxfull.7723322592_zkih.jpg',
  },
  {
    sku: 'FDLHDFRNGLD',
    title: 'Fiddlehead Fern Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/fbf31f/7771273919/il_fullxfull.7771273919_a4x4.jpg',
  },
  {
    sku: 'FLYAGRCGLD',
    title: 'Fly Agaric Mushroom Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/ed279c/7771264061/il_fullxfull.7771264061_68ff.jpg',
  },

  // ── BUTTONS & PINS ──────────────────────────────────────────────────────
  {
    sku: 'SOCKEYEPIN',
    title: 'Sockeye Salmon Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/957b2f/7603039692/il_fullxfull.7603039692_hnjl.jpg',
  },
  {
    sku: 'TAPIRPIN',
    title: 'Malayan Tapir Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/0d13ea/7603037878/il_fullxfull.7603037878_fo9a.jpg',
  },
  {
    sku: 'BANANSLGPIN',
    title: 'Banana Slug Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/5bc5ba/7650983129/il_fullxfull.7650983129_i4ac.jpg',
  },
  {
    sku: 'PTFPIN',
    title: 'Pacific Tree Frog Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/c41644/7603079588/il_fullxfull.7603079588_38a3.jpg',
  },
  {
    sku: 'CROWPIN',
    title: 'American Crow Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/ef6b2d/7603060966/il_fullxfull.7603060966_r85a.jpg',
  },
  {
    sku: 'HRBRSLPIN',
    title: 'Harbor Seal Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/a0b614/7650986847/il_fullxfull.7650986847_5x7o.jpg',
  },
  {
    sku: 'CNPIN',
    title: 'Chambered Nautilus Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/c1b97a/7650979629/il_fullxfull.7650979629_7v6m.jpg',
  },
  {
    sku: 'RMMPIN',
    title: 'Rosy Maple Moth Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/1de649/7650981543/il_fullxfull.7650981543_r1x3.jpg',
  },
  {
    sku: 'PINBUNDLE',
    title: 'Nature Illustrations Pin Set — Pick Any 3',
    category: 'buttons',
    price: 8,
    image: 'https://i.etsystatic.com/63085988/r/il/453dba/7603113980/il_fullxfull.7603113980_sfpz.jpg',
  },

  // ── MAGNETS ─────────────────────────────────────────────────────────────
  {
    sku: 'BANANASLGMGNT',
    title: 'Banana Slug Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/ea7beb/7603203566/il_fullxfull.7603203566_rc6v.jpg',
  },
  {
    sku: 'RMMMGNT',
    title: 'Rosy Maple Moth Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/d6a7f8/7651158907/il_fullxfull.7651158907_1b5j.jpg',
  },
  {
    sku: 'HRBRSLMGNT',
    title: 'Harbor Seal Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/74884e/7603209942/il_fullxfull.7603209942_6oy6.jpg',
  },
  {
    sku: 'SALMONMGNT',
    title: 'Sockeye Salmon Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/75c891/7603198066/il_fullxfull.7603198066_akoj.jpg',
  },
  {
    sku: 'NAUTILUSMGNT',
    title: 'Chambered Nautilus Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/070176/7603193542/il_fullxfull.7603193542_nc8n.jpg',
  },
  {
    sku: 'TAPIRMGNT',
    title: 'Malayan Tapir Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/8b1418/7603191412/il_fullxfull.7603191412_8wmd.jpg',
  },
  {
    sku: 'CROWMGNT',
    title: 'American Crow Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/f28525/7603178538/il_fullxfull.7603178538_63d9.jpg',
  },
  {
    sku: 'FROGMGNT',
    title: 'Pacific Tree Frog Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/95d9d9/7603157708/il_fullxfull.7603157708_prod.jpg',
  },
  {
    sku: 'MGNTBUNDLE',
    title: 'Nature Illustrations Magnet Set — Pick Any 3',
    category: 'magnets',
    price: 10,
    image: 'https://i.etsystatic.com/63085988/r/il/90a22b/7603235908/il_fullxfull.7603235908_71us.jpg',
  },

  // ── PRINTS ──────────────────────────────────────────────────────────────
  {
    sku: 'SEALIONPRNT',
    title: 'California Sea Lion Art Print',
    category: 'prints',
    price: 18,
    image: 'https://i.etsystatic.com/63085988/r/il/fd17fd/7645120422/il_fullxfull.7645120422_l3i0.jpg',
  },
  {
    sku: 'NAUTILUSPRNT',
    title: 'Chambered Nautilus Art Print',
    category: 'prints',
    price: 18,
    image: 'https://i.etsystatic.com/63085988/r/il/ac3685/7620272668/il_fullxfull.7620272668_lwtf.jpg',
  },
  {
    sku: 'OTTERPRNT',
    title: 'Sea Otter Art Print',
    category: 'prints',
    price: 18,
    image: 'https://i.etsystatic.com/63085988/r/il/32e972/7620205892/il_fullxfull.7620205892_qgdw.jpg',
  },
  {
    sku: 'TAPIRLINO',
    title: 'Malayan Tapir Linocut Print',
    category: 'prints',
    price: 40,
    image: 'https://i.etsystatic.com/63085988/r/il/b1fc1f/7675603075/il_fullxfull.7675603075_lm0o.jpg',
  },
  {
    sku: 'RACLINO',
    title: 'Raccoon Linocut Print',
    category: 'prints',
    price: 25,
    image: 'https://i.etsystatic.com/63085988/r/il/f31a6a/7627645210/il_fullxfull.7627645210_pd6g.jpg',
  },
  {
    sku: 'TRDIGRDELINO',
    title: 'Tardigrade Linocut Print',
    category: 'prints',
    price: 25,
    image: 'https://i.etsystatic.com/63085988/r/il/67446d/7627641276/il_fullxfull.7627641276_5v8s.jpg',
  },
  {
    sku: 'ANTEATERLINO',
    title: 'Giant Anteater Linocut Print',
    category: 'prints',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/30a744/7540506249/il_fullxfull.7540506249_aegh.jpg',
  },
  {
    sku: 'STGBTLELINO',
    title: 'Stag Beetle Linocut Print',
    category: 'prints',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/367438/7540561055/il_fullxfull.7540561055_k0o7.jpg',
  },
  {
    sku: 'SPNLUMPLINO',
    title: 'Pacific Spiny Lumpsucker Linocut Print',
    category: 'prints',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/a054b0/7492600530/il_fullxfull.7492600530_hsl8.jpg',
  },
  {
    sku: 'MANTISLINO',
    title: 'Praying Mantis Linocut Print',
    category: 'prints',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/de6975/7492603614/il_fullxfull.7492603614_28w5.jpg',
  },
  {
    sku: 'GILAMONLINO',
    title: 'Gila Monster Linocut Print',
    category: 'prints',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/4b606f/7540515689/il_fullxfull.7540515689_nqzu.jpg',
  },

  // ── GIFT SETS ───────────────────────────────────────────────────────────
  {
    sku: 'SCKEYESLMNBUNDL',
    title: 'Sockeye Salmon Gift Set',
    category: 'gift-sets',
    price: 16,
    image: 'https://i.etsystatic.com/63085988/r/il/7d0f94/7764323931/il_fullxfull.7764323931_9aiy.jpg',
  },
  {
    sku: 'CICADAGLDBUND',
    title: 'Cicada Gift Set',
    category: 'gift-sets',
    price: 24,
    image: 'https://i.etsystatic.com/63085988/r/il/25ea12/7723401094/il_fullxfull.7723401094_hi9j.jpg',
  },
  {
    sku: 'FLYAGRCGLDBUND',
    title: 'Fly Agaric Mushroom Gift Set',
    category: 'gift-sets',
    price: 24,
    image: 'https://i.etsystatic.com/63085988/r/il/9d8941/7771645089/il_fullxfull.7771645089_5067.jpg',
  },
];
