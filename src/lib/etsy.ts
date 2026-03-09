import type { ShopCategory, ShopItem } from '../data/shop';

interface EtsyListingImage {
  url_570xN: string;
  rank: number;
}

interface EtsyListing {
  listing_id: number;
  title: string;
  price: { amount: number; divisor: number };
  tags: string[];
  images: EtsyListingImage[];
}

interface EtsyResponse {
  count: number;
  results: EtsyListing[];
}

function mapCategory(title: string): ShopCategory {
  const t = title.toLowerCase();
  if (t.includes('sticker sheet')) return 'sticker-sheets';
  if (t.includes('sticker')) return 'stickers';
  if (t.includes('keychain')) return 'keychains';
  if (t.includes('earring')) return 'earrings';
  if (t.includes('button') || t.includes('pick any') || (t.includes('pin') && t.includes('set'))) return 'buttons';
  if (t.includes('magnet')) return 'magnets';
  if (t.includes('print')) return 'prints';
  if (t.includes('gift set') || t.includes('bundle')) return 'gift-sets';
  return 'stickers';
}

export async function fetchEtsyListings(): Promise<ShopItem[]> {
  const apiKey = import.meta.env.ETSY_API_KEY;
  if (!apiKey) throw new Error('ETSY_API_KEY not set');

  const res = await fetch(
    'https://openapi.etsy.com/v3/application/shops/forceofnaturepress/listings/active?limit=100&includes=Images',
    { headers: { 'x-api-key': apiKey } }
  );

  if (!res.ok) throw new Error(`Etsy API error: ${res.status} ${res.statusText}`);

  const data: EtsyResponse = await res.json();

  return data.results.map(listing => ({
    sku: String(listing.listing_id),
    title: listing.title,
    category: mapCategory(listing.title),
    price: listing.price.amount / listing.price.divisor,
    image: listing.images?.find(img => img.rank === 1)?.url_570xN ?? listing.images?.[0]?.url_570xN ?? '',
    etsyListingId: String(listing.listing_id),
  }));
}
