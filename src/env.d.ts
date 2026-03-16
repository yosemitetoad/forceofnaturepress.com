/// <reference path="../.astro/types.d.ts" />

type Runtime = import('@astrojs/cloudflare').Runtime<{
  DB: D1Database;
  UPLOADS: R2Bucket;
  ADMIN_PASSWORD: string;
  CF_API_TOKEN: string;
  CF_ACCOUNT_ID: string;
}>;

declare namespace App {
  interface Locals extends Runtime {}
}
