// Force of Nature Press — shop product data
// To link directly to individual Etsy listings, add the numeric listing ID
// from the Etsy URL (e.g., etsy.com/listing/1234567890/...) to etsyListingId.
// Without it, clicking will search the shop for that product name.

export type ShopCategory = string;

export const CATEGORY_LABELS: Record<string, string> = {
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
  
    etsyListingId: '4439131247',},
  {
    sku: 'BEECLOVERSTCKR',
    title: 'Western Bumble Bee on Clover Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/83b1c2/7637123565/il_fullxfull.7637123565_qmli.jpg',
  
    etsyListingId: '4439135451',},
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
  
    etsyListingId: '4421311811',},
  {
    sku: 'FDLHDFRNSTCKR',
    title: 'Fiddlehead Fern Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/6ea2be/7745472279/il_fullxfull.7745472279_29et.jpg',
  
    etsyListingId: '4455853501',},
  {
    sku: 'SEAOTTERSTCKR',
    title: 'Sea Otter Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/61696d/7620320720/il_fullxfull.7620320720_t9jd.jpg',
  
    etsyListingId: '4443984168',},
  {
    sku: 'PFFNFLWRS',
    title: 'Atlantic Puffin Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/630611/7540381009/il_fullxfull.7540381009_ga9g.jpg',
  
    etsyListingId: '4421292308',},
  {
    sku: 'PCFCTREFRGSTCKR',
    title: 'Pacific Tree Frog Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/658673/7637165973/il_fullxfull.7637165973_841h.jpg',
  
    etsyListingId: '4439139602',},
  {
    sku: 'SCKEYESLMN',
    title: 'Sockeye Salmon Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/6e7f03/7540432771/il_fullxfull.7540432771_7ojv.jpg',
  
    etsyListingId: '4421304786',},
  {
    sku: 'REDBOOBY',
    title: 'Red-footed Booby Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/d8d640/7543771683/il_fullxfull.7543771683_60ny.jpg',
  
    etsyListingId: '4421948335',},
  {
    sku: 'BLUEBOOBY',
    title: 'Blue-footed Booby Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/8cba8f/7495870094/il_fullxfull.7495870094_q32l.jpg',
  
    etsyListingId: '4421951485',},
  {
    sku: 'LUNAMOTH',
    title: 'Luna Moth Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/f123c3/7492413620/il_fullxfull.7492413620_dgu1.jpg',
  
    etsyListingId: '4421284273',},
  {
    sku: 'GLDNMYSTSNAIL',
    title: 'Golden Mystery Snail Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/95b76a/7545390352/il_fullxfull.7545390352_1njg.jpg',
  
    etsyListingId: '4431664676',},
  {
    sku: 'REDRCRNRITE',
    title: 'Red Racer Nerite Snail Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/4e2527/7545391204/il_fullxfull.7545391204_acj6.jpg',
  
    etsyListingId: '4431660785',},
  {
    sku: '17YRCICASTCKR',
    title: 'Cicada Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/77b40d/7755675585/il_fullxfull.7755675585_aqyt.jpg',
  
    etsyListingId: '4457439446',},
  {
    sku: 'FLYAGRCSTCKR',
    title: 'Fly Agaric Mushroom Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/367d25/7707723492/il_fullxfull.7707723492_4w7h.jpg',
  
    etsyListingId: '4457427777',},
  {
    sku: 'BLKBRSTCKR',
    title: 'Black Bear Salmonberries Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/c405fc/7749326943/il_fullxfull.7749326943_jzor.jpg',
  
    etsyListingId: '4455833683',},
  {
    sku: 'ORCA',
    title: 'Orca Sticker',
    category: 'stickers',
    price: 4.5,
    image: 'https://i.etsystatic.com/63085988/r/il/9c9851/7591202847/il_fullxfull.7591202847_avlj.jpg',
  
    etsyListingId: '4431275293',},
  {
    sku: 'AARDWOLFSTCKR',
    title: 'Aardwolf Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/1e0012/7589185020/il_fullxfull.7589185020_a7dl.jpg',
  
    etsyListingId: '4439146527',},
  {
    sku: 'BRNBEAR',
    title: 'Brown Bear Sticker',
    category: 'stickers',
    price: 4.5,
    image: 'https://i.etsystatic.com/63085988/r/il/cce8fd/7540478681/il_fullxfull.7540478681_cesp.jpg',
  
    etsyListingId: '4421314441',},
  {
    sku: 'SEABUN',
    title: 'Sea Bunny Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/bd290a/7770979707/il_fullxfull.7770979707_dhpj.jpg',
  
    etsyListingId: '4421300301',},
  {
    sku: 'PNKRVRDLPHN',
    title: 'Amazon River Dolphin Sticker',
    category: 'stickers',
    price: 4.5,
    image: 'https://i.etsystatic.com/63085988/r/il/c91d25/7591214551/il_fullxfull.7591214551_7pvp.jpg',
  
    etsyListingId: '4431277187',},
  {
    sku: 'SPINYLUMP',
    title: 'Pacific Spiny Lumpsucker Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/2606bc/7540408995/il_fullxfull.7540408995_bj88.jpg',
  
    etsyListingId: '4421298646',},
  {
    sku: 'SCRTYBIRD',
    title: 'Secretary Bird Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/7627ba/7492454664/il_fullxfull.7492454664_4f0z.jpg',
  
    etsyListingId: '4421293887',},
  {
    sku: 'AXLTLSTCKR',
    title: 'Axolotl Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/802981/7652892662/il_fullxfull.7652892662_mzxq.jpg',
  
    etsyListingId: '4448506495',},
  {
    sku: 'MNDRNDCKSTCKRMTT',
    title: 'Mandarin Duck Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/ee3e4e/7652900162/il_fullxfull.7652900162_cj8d.jpg',
  
    etsyListingId: '4448504343',},
  {
    sku: 'MIRACSTCKR',
    title: 'Crows Mobbing Eagle Sticker',
    category: 'stickers',
    price: 5,
    image: 'https://i.etsystatic.com/63085988/r/il/4c4d83/7638394448/il_fullxfull.7638394448_m9ac.jpg',
  
    etsyListingId: '4446717048',},
  {
    sku: 'OCNSNFSH',
    title: 'Ocean Sunfish Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/2f8835/7591127087/il_fullxfull.7591127087_sipa.jpg',
  
    etsyListingId: '4431254875',},
  {
    sku: 'TAPIRSTCKR',
    title: 'Malayan Tapir Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/8bb563/7588924194/il_fullxfull.7588924194_if0s.jpg',
  
    etsyListingId: '4438075348',},
  {
    sku: 'CROWSTCKR',
    title: 'American Crow Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/deda87/7599500008/il_fullxfull.7599500008_8yhl.jpg',
  
    etsyListingId: '4440744103',},
  {
    sku: 'WHLSHRKSTCKR',
    title: 'Whale Shark Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/684965/7637101303/il_fullxfull.7637101303_yn4f.jpg',
  
    etsyListingId: '4439141091',},
  {
    sku: 'KMDODRGNSTCKER',
    title: 'Komodo Dragon Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/aa18cc/7637082539/il_fullxfull.7637082539_ruiv.jpg',
  
    etsyListingId: '4439143318',},
  {
    sku: 'SPNBLSTCKER',
    title: 'Roseate Spoonbill Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/83c723/7637093027/il_fullxfull.7637093027_12k3.jpg',
  
    etsyListingId: '4439139609',},
  {
    sku: 'ROSYMOTHSTCKR',
    title: 'Rosy Maple Moth Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/50d2f9/7492349610/il_fullxfull.7492349610_qyir.jpg',
  
    etsyListingId: '4421280715',},
  {
    sku: 'NARWHAL',
    title: 'Narwhal Sticker',
    category: 'stickers',
    price: 4.5,
    image: 'https://i.etsystatic.com/63085988/r/il/150447/7543203814/il_fullxfull.7543203814_ksrq.jpg',
  
    etsyListingId: '4431266258',},
  {
    sku: 'GALS',
    title: 'Giant African Land Snail Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/737f37/7593328685/il_fullxfull.7593328685_mfne.jpg',
  
    etsyListingId: '4431668465',},
  {
    sku: 'WSTRNTGRBUTTERFLY',
    title: 'Western Tiger Swallowtail Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/9e717d/7593319183/il_fullxfull.7593319183_ey5y.jpg',
  
    etsyListingId: '4431707388',},
  {
    sku: 'BANANASLG',
    title: 'Banana Slug Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/d001c9/7591220529/il_fullxfull.7591220529_oiuk.jpg',
  
    etsyListingId: '4431272107',},
  {
    sku: 'NAUTILUS',
    title: 'Chambered Nautilus Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/ace77d/7543191154/il_fullxfull.7543191154_ld3r.jpg',
  
    etsyListingId: '4431256809',},
  {
    sku: 'VLVTWRM',
    title: 'Velvet Worm Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/39fed1/7591693359/il_fullxfull.7591693359_ope8.jpg',
  
    etsyListingId: '4431247365',},
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
  
    etsyListingId: '4421310948',},

  // ── STICKER SHEETS ──────────────────────────────────────────────────────
  {
    sku: 'PNWBBCSHEET',
    title: 'Backyard Bug Club Sticker Sheet',
    category: 'sticker-sheets',
    price: 10,
    image: 'https://i.etsystatic.com/63085988/r/il/681648/7545400892/il_fullxfull.7545400892_351j.jpg',
  
    etsyListingId: '4431673711',},
  {
    sku: 'SNLFANCLUBSHEET',
    title: 'Snail Fan Club Sticker Sheet',
    category: 'sticker-sheets',
    price: 10,
    image: 'https://i.etsystatic.com/63085988/r/il/b46da1/7593357301/il_fullxfull.7593357301_troy.jpg',
  
    etsyListingId: '4431690328',},
  {
    sku: 'CETACEANSHEET',
    title: 'Cetacean Appreciation Society Sticker Sheet',
    category: 'sticker-sheets',
    price: 10,
    image: 'https://i.etsystatic.com/63085988/r/il/143d1c/7593342481/il_fullxfull.7593342481_kc8f.jpg',
  
    etsyListingId: '4431685599',},

  // ── KEYCHAINS ───────────────────────────────────────────────────────────
  {
    sku: 'PSSMKYCHN',
    title: 'Opossum Keychain',
    category: 'keychains',
    price: 12,
    image: 'https://i.etsystatic.com/63085988/r/il/cd4078/7819054513/il_fullxfull.7819054513_qrq9.jpg',
  
    etsyListingId: '4466755943',},
  {
    sku: 'SEABUNKYCHN',
    title: 'Sea Bunny Keychain',
    category: 'keychains',
    price: 12,
    image: 'https://i.etsystatic.com/63085988/r/il/910ae3/7701072522/il_fullxfull.7701072522_geb3.jpg',
  
    etsyListingId: '4455304230',},
  {
    sku: 'GPOKYCHN',
    title: 'Giant Pacific Octopus Keychain',
    category: 'keychains',
    price: 12,
    image: 'https://i.etsystatic.com/63085988/r/il/c1f939/7743532032/il_fullxfull.7743532032_ccci.jpg',
  
    etsyListingId: '4462596626',},
  {
    sku: 'PFNFLWRSKYCHN',
    title: 'Atlantic Puffin Keychain',
    category: 'keychains',
    price: 12,
    image: 'https://i.etsystatic.com/63085988/r/il/e1c85b/7749010939/il_fullxfull.7749010939_epi2.jpg',
  
    etsyListingId: '4455308350',},
  {
    sku: 'SCKEYESLMNKYCHN',
    title: 'Sockeye Salmon Keychain',
    category: 'keychains',
    price: 12,
    image: 'https://i.etsystatic.com/63085988/r/il/c6d6d7/7764306725/il_fullxfull.7764306725_rvpm.jpg',
  
    etsyListingId: '4455305011',},
  {
    sku: 'ORCAKYCHN',
    title: 'Orca Keychain',
    category: 'keychains',
    price: 12,
    image: 'https://i.etsystatic.com/63085988/r/il/3b4743/7701069930/il_fullxfull.7701069930_t4rh.jpg',
  
    etsyListingId: '4455309342',},
  {
    sku: 'BLKBRKYCHN',
    title: 'Black Bear Keychain',
    category: 'keychains',
    price: 12,
    image: 'https://i.etsystatic.com/63085988/r/il/03721f/7701114346/il_fullxfull.7701114346_4y5w.jpg',
  
    etsyListingId: '4455306568',},

  // ── EARRINGS ────────────────────────────────────────────────────────────
  {
    sku: 'PSSMSLVR',
    title: 'Opossum Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/f1243c/7771104624/il_fullxfull.7771104624_id3z.jpg',
  
    etsyListingId: '4466759244',},
  {
    sku: 'MOONJLYGLD',
    title: 'Moon Jellyfish Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/39832b/7723334354/il_fullxfull.7723334354_gi5u.jpg',
  
    etsyListingId: '4459702650',},
  {
    sku: 'CICADAGLD',
    title: 'Cicada Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/1ce764/7723318072/il_fullxfull.7723318072_3ix6.jpg',
  
    etsyListingId: '4453804153',},
  {
    sku: 'RSYMPLGLD',
    title: 'Rosy Maple Moth Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/9b0839/7771268523/il_fullxfull.7771268523_ot7c.jpg',
  
    etsyListingId: '4453809440',},
  {
    sku: 'SLMNGLD',
    title: 'Sockeye Salmon Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/f4337f/7771269389/il_fullxfull.7771269389_1ga0.jpg',
  
    etsyListingId: '4453801165',},
  {
    sku: 'LNMTHGLD',
    title: 'Luna Moth Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/8befd5/7723322592/il_fullxfull.7723322592_zkih.jpg',
  
    etsyListingId: '4453800123',},
  {
    sku: 'FDLHDFRNGLD',
    title: 'Fiddlehead Fern Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/fbf31f/7771273919/il_fullxfull.7771273919_a4x4.jpg',
  
    etsyListingId: '4453798819',},
  {
    sku: 'FLYAGRCGLD',
    title: 'Fly Agaric Mushroom Earrings',
    category: 'earrings',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/ed279c/7771264061/il_fullxfull.7771264061_68ff.jpg',
  
    etsyListingId: '4457425827',},

  // ── BUTTONS & PINS ──────────────────────────────────────────────────────
  {
    sku: 'SOCKEYEPIN',
    title: 'Sockeye Salmon Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/957b2f/7603039692/il_fullxfull.7603039692_hnjl.jpg',
  
    etsyListingId: '4432804768',},
  {
    sku: 'TAPIRPIN',
    title: 'Malayan Tapir Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/0d13ea/7603037878/il_fullxfull.7603037878_fo9a.jpg',
  
    etsyListingId: '4432808650',},
  {
    sku: 'BANANSLGPIN',
    title: 'Banana Slug Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/5bc5ba/7650983129/il_fullxfull.7650983129_i4ac.jpg',
  
    etsyListingId: '4432801557',},
  {
    sku: 'PTFPIN',
    title: 'Pacific Tree Frog Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/c41644/7603079588/il_fullxfull.7603079588_38a3.jpg',
  
    etsyListingId: '4441309891',},
  {
    sku: 'CROWPIN',
    title: 'American Crow Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/ef6b2d/7603060966/il_fullxfull.7603060966_r85a.jpg',
  
    etsyListingId: '4441314610',},
  {
    sku: 'HRBRSLPIN',
    title: 'Harbor Seal Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/a0b614/7650986847/il_fullxfull.7650986847_5x7o.jpg',
  
    etsyListingId: '4441304431',},
  {
    sku: 'CNPIN',
    title: 'Chambered Nautilus Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/c1b97a/7650979629/il_fullxfull.7650979629_7v6m.jpg',
  
    etsyListingId: '4432800571',},
  {
    sku: 'RMMPIN',
    title: 'Rosy Maple Moth Button',
    category: 'buttons',
    price: 3,
    image: 'https://i.etsystatic.com/63085988/r/il/1de649/7650981543/il_fullxfull.7650981543_r1x3.jpg',
  
    etsyListingId: '4432805425',},
  {
    sku: 'PINBUNDLE',
    title: 'Nature Illustrations Pin Set — Pick Any 3',
    category: 'gift-sets',
    price: 8,
    image: 'https://i.etsystatic.com/63085988/r/il/453dba/7603113980/il_fullxfull.7603113980_sfpz.jpg',
  
    etsyListingId: '4441303843',},

  // ── MAGNETS ─────────────────────────────────────────────────────────────
  {
    sku: 'BANANASLGMGNT',
    title: 'Banana Slug Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/ea7beb/7603203566/il_fullxfull.7603203566_rc6v.jpg',
  
    etsyListingId: '4441339338',},
  {
    sku: 'RMMMGNT',
    title: 'Rosy Maple Moth Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/d6a7f8/7651158907/il_fullxfull.7651158907_1b5j.jpg',
  
    etsyListingId: '4441333009',},
  {
    sku: 'HRBRSLMGNT',
    title: 'Harbor Seal Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/74884e/7603209942/il_fullxfull.7603209942_6oy6.jpg',
  
    etsyListingId: '4441332189',},
  {
    sku: 'SALMONMGNT',
    title: 'Sockeye Salmon Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/75c891/7603198066/il_fullxfull.7603198066_akoj.jpg',
  
    etsyListingId: '4441338338',},
  {
    sku: 'NAUTILUSMGNT',
    title: 'Chambered Nautilus Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/070176/7603193542/il_fullxfull.7603193542_nc8n.jpg',
  
    etsyListingId: '4441329179',},
  {
    sku: 'TAPIRMGNT',
    title: 'Malayan Tapir Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/8b1418/7603191412/il_fullxfull.7603191412_8wmd.jpg',
  
    etsyListingId: '4441327733',},
  {
    sku: 'CROWMGNT',
    title: 'American Crow Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/f28525/7603178538/il_fullxfull.7603178538_63d9.jpg',
  
    etsyListingId: '4441334876',},
  {
    sku: 'FROGMGNT',
    title: 'Pacific Tree Frog Magnet',
    category: 'magnets',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/95d9d9/7603157708/il_fullxfull.7603157708_prod.jpg',
  
    etsyListingId: '4441333816',},
  {
    sku: 'MGNTBUNDLE',
    title: 'Nature Illustrations Magnet Set — Pick Any 3',
    category: 'gift-sets',
    price: 10,
    image: 'https://i.etsystatic.com/63085988/r/il/90a22b/7603235908/il_fullxfull.7603235908_71us.jpg',
  
    etsyListingId: '4441338173',},

  // ── PRINTS ──────────────────────────────────────────────────────────────
  {
    sku: 'SEALIONPRNT',
    title: 'California Sea Lion Art Print',
    category: 'prints',
    price: 18,
    image: 'https://i.etsystatic.com/63085988/r/il/fd17fd/7645120422/il_fullxfull.7645120422_l3i0.jpg',
  
    etsyListingId: '4447777839',},
  {
    sku: 'NAUTILUSPRNT',
    title: 'Chambered Nautilus Art Print',
    category: 'prints',
    price: 18,
    image: 'https://i.etsystatic.com/63085988/r/il/ac3685/7620272668/il_fullxfull.7620272668_lwtf.jpg',
  
    etsyListingId: '4443966841',},
  {
    sku: 'OTTERPRNT',
    title: 'Sea Otter Art Print',
    category: 'prints',
    price: 18,
    image: 'https://i.etsystatic.com/63085988/r/il/32e972/7620205892/il_fullxfull.7620205892_qgdw.jpg',
  
    etsyListingId: '4443959293',},
  {
    sku: 'TAPIRLINO',
    title: 'Malayan Tapir Linocut Print',
    category: 'prints',
    price: 40,
    image: 'https://i.etsystatic.com/63085988/r/il/b1fc1f/7675603075/il_fullxfull.7675603075_lm0o.jpg',
  
    etsyListingId: '4445122797',},
  {
    sku: 'RACLINO',
    title: 'Raccoon Linocut Print',
    category: 'prints',
    price: 25,
    image: 'https://i.etsystatic.com/63085988/r/il/f31a6a/7627645210/il_fullxfull.7627645210_pd6g.jpg',
  
    etsyListingId: '4445120861',},
  {
    sku: 'TRDIGRDELINO',
    title: 'Tardigrade Linocut Print',
    category: 'prints',
    price: 25,
    image: 'https://i.etsystatic.com/63085988/r/il/67446d/7627641276/il_fullxfull.7627641276_5v8s.jpg',
  
    etsyListingId: '4445118653',},
  {
    sku: 'ANTEATERLINO',
    title: 'Giant Anteater Linocut Print',
    category: 'prints',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/30a744/7540506249/il_fullxfull.7540506249_aegh.jpg',
  
    etsyListingId: '4421322948',},
  {
    sku: 'STGBTLELINO',
    title: 'Stag Beetle Linocut Print',
    category: 'prints',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/367438/7540561055/il_fullxfull.7540561055_k0o7.jpg',
  
    etsyListingId: '4421333654',},
  {
    sku: 'SPNLUMPLINO',
    title: 'Pacific Spiny Lumpsucker Linocut Print',
    category: 'prints',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/a054b0/7492600530/il_fullxfull.7492600530_hsl8.jpg',
  
    etsyListingId: '4421325961',},
  {
    sku: 'MANTISLINO',
    title: 'Praying Mantis Linocut Print',
    category: 'prints',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/de6975/7492603614/il_fullxfull.7492603614_28w5.jpg',
  
    etsyListingId: '4421328021',},
  {
    sku: 'GILAMONLINO',
    title: 'Gila Monster Linocut Print',
    category: 'prints',
    price: 22,
    image: 'https://i.etsystatic.com/63085988/r/il/4b606f/7540515689/il_fullxfull.7540515689_nqzu.jpg',
  
    etsyListingId: '4421326200',},

  // ── GIFT SETS ───────────────────────────────────────────────────────────
  {
    sku: 'SCKEYESLMNBUNDL',
    title: 'Sockeye Salmon Gift Set',
    category: 'gift-sets',
    price: 16,
    image: 'https://i.etsystatic.com/63085988/r/il/7d0f94/7764323931/il_fullxfull.7764323931_9aiy.jpg',
  
    etsyListingId: '4458708826',},
  {
    sku: 'CICADAGLDBUND',
    title: 'Cicada Gift Set',
    category: 'gift-sets',
    price: 24,
    image: 'https://i.etsystatic.com/63085988/r/il/25ea12/7723401094/il_fullxfull.7723401094_hi9j.jpg',
  
    etsyListingId: '4457443049',},
  {
    sku: 'FLYAGRCGLDBUND',
    title: 'Fly Agaric Mushroom Gift Set',
    category: 'gift-sets',
    price: 24,
    image: 'https://i.etsystatic.com/63085988/r/il/9d8941/7771645089/il_fullxfull.7771645089_5067.jpg',
  
    etsyListingId: '4457435487',},
  {
    sku: '4467853176',
    title: 'Western Black Widow Stamp Sticker',
    category: 'stickers',
    price: 5,
    image: 'https://i.etsystatic.com/63085988/r/il/30da99/7826236745/il_1588xN.7826236745_pfns.jpg',
    etsyListingId: '4467853176',
  },
  {
    sku: '4467855174',
    title: 'Arctic Bumblebee Stamp Sticker',
    category: 'stickers',
    price: 5,
    image: 'https://i.etsystatic.com/63085988/r/il/7598b2/7778346398/il_1588xN.7778346398_o312.jpg',
    etsyListingId: '4467855174',
  },
  {
    sku: '4467848365',
    title: 'Cecropia Moth Stamp Sticker',
    category: 'stickers',
    price: 5,
    image: 'https://i.etsystatic.com/63085988/r/il/0332d0/7778353420/il_1588xN.7778353420_4fnh.jpg',
    etsyListingId: '4467848365',
  },
  {
    sku: '4467858004',
    title: 'Nature Stamp Sticker Set',
    category: 'gift-sets',
    price: 12,
    image: 'https://i.etsystatic.com/63085988/r/il/057013/7778363816/il_1588xN.7778363816_1oab.jpg',
    etsyListingId: '4467858004',
  },
  {
    sku: '4469333696',
    title: 'Opossum Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/89e77a/7835885943/il_1588xN.7835885943_b6zg.jpg',
    etsyListingId: '4469333696',
  },
  {
    sku: '4469328091',
    title: 'Raccoon Sticker',
    category: 'stickers',
    price: 4,
    image: 'https://i.etsystatic.com/63085988/r/il/6a5966/7835892691/il_1588xN.7835892691_czmy.jpg',
    etsyListingId: '4469328091',
  },
];
