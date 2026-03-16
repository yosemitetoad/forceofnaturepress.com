export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ locals }) => {
  const apiToken = locals.runtime.env.CF_API_TOKEN;
  const accountId = locals.runtime.env.CF_ACCOUNT_ID;

  if (!apiToken || !accountId) {
    return new Response(JSON.stringify({ error: 'Cloudflare API credentials not configured' }), { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/forceofnaturepresssite/deployments`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      const body = await res.text();
      return new Response(JSON.stringify({ error: 'Deploy failed', detail: body }), { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }));
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to trigger deploy' }), { status: 502 });
  }
};
