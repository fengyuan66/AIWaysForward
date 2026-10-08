// The one place the site talks to its backend (Supabase: Postgres + Auth + Storage). See docs/ADMIN.md.
//
// • Public pages ship with all their content bundled (src/content/*.js) and only *enhance* from the database,
//   so the site still renders if Supabase is unconfigured, offline, or a free-tier project is paused.
// • The SDK is loaded on demand in its own chunk; visitors who never need it never download it.
// • `VITE_BACKEND_DEMO=1` (npm run dev:demo) swaps in a localStorage stand-in so the admin console can be tried
//   without a Supabase project. It exists only in dev builds — Vite removes it from `npm run build`.

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
const demo = import.meta.env.DEV && import.meta.env.VITE_BACKEND_DEMO === '1';

export const backendEnabled = demo || Boolean(url && key);
export const backendIsDemo = demo;

let clientPromise = null;

// Resolves to a Supabase client, or null when no backend is configured.
export function getClient() {
  if (!backendEnabled) return Promise.resolve(null);
  clientPromise ??= load();
  return clientPromise;
}

async function load() {
  if (demo) {
    const { createDemoClient } = await import('./demoClient.js');
    return createDemoClient();
  }
  const { createClient } = await import('@supabase/supabase-js');
  return createClient(url, key);
}
