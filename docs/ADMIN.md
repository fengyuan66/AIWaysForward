# Admin console — setup and how it works

An admin signs in from the header's **Log In** pill and can then:

- set the **latest event** (speaker, talk, date line, **Join link**, bio, photo) that Career Awareness shows, and move it to **Past Speakers** when it is over;
- **create, edit and delete AI News articles** (headline, link, source, author, date, thumbnail).

Guests, and signed-in accounts that are not admins, see the site exactly as before. The console, its code and its shortcut pills are never rendered or downloaded for them.

## Stack — and why

| Piece | Choice | Why |
| --- | --- | --- |
| Backend | **Supabase** (hosted Postgres + Auth + Storage) | A static Vite site has no server, and rolling your own login is the thing not to do. Supabase gives sign-in, a database and image storage behind one small client library, and **Row Level Security** lets the database itself refuse writes from anyone who is not an admin. Open source, so it can be self-hosted later. |
| Client | `@supabase/supabase-js`, loaded **on demand** in its own chunk | Visitors who never sign in don't pay for it (the main bundle grew ~3.6 kB gzip; the SDK is a separate ~55 kB chunk, the admin console another ~4 kB). |
| UI | Native `<dialog>`, native forms, the existing design system | No modal/form/admin framework. |
| Fallback | All content is still bundled (`src/content/`) | If Supabase is unconfigured, offline, or a free project is paused, the site renders its built-in content unchanged. |

Alternatives considered:

- **Decap CMS / TinaCMS** (Git-based): great for markdown sites, but editors need GitHub accounts, every edit is a commit + redeploy, and it can't give the in-site "Log In" button the brief asks for.
- **PocketBase**: lovely single binary, but you must host and back up a server.
- **Firebase**: workable, but proprietary, and Cloud Storage needs the paid Blaze plan, so image uploads would not be free.
- **Clerk / Auth0 + a database**: more moving parts for the same result.

### The one gotcha: free-tier pausing

A free Supabase project is **paused after about a week without activity** (check [supabase.com/pricing](https://supabase.com/pricing) for the current rule). While paused, sign-in and edits stop working, but **the public site keeps rendering from its bundled content** — though changes made through the console would not show until the project is restored (dashboard → Restore). If the site must always show admin-made changes, use the Pro plan (about $25/month) or visit the site's admin once a week.

## One-time setup (≈ 10 minutes)

1. **Create a project** at <https://supabase.com> (free plan is fine). Note the *Project URL* and the *anon public* key: Project Settings → API.
2. **Create the tables and rules.** Dashboard → SQL Editor → paste `supabase/schema.sql` → Run. Then paste `supabase/seed.sql` → Run (this copies the site's 9 articles and the Christopher Dede event in, so the admin lists start populated). If you edit `src/content/news.js` or `career.js` later, `npm run seed:sql` regenerates `supabase/seed.sql`.
3. **Create the admin account.** Authentication → Users → *Add user* → email + password, tick *Auto confirm*. Then, in the SQL Editor, make it an admin:

   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'director@ai-waysforward.com';
   ```

   (Use the real admin email. Repeat for each admin.)
4. **Turn off public sign-ups.** Authentication → Sign In / Providers → switch off *Allow new users to sign up*. Admin accounts are only ever created in step 3.
5. **Connect the site.** Copy `.env.example` to `.env.local` and fill in the two values. On Netlify / Vercel, add the same two variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in the site's environment settings and redeploy — Vite bakes them in at build time.
6. `npm run dev`, click **Log In**, sign in. You are taken to `/admin`.

The anon key is **public by design** — it ships in the browser. Security comes from Row Level Security, not from hiding it. Never put the `service_role` key anywhere in this project.

## Day-to-day

| To do this | Do this |
| --- | --- |
| Announce the next speaker | Log In → Admin → **Events** → *Add event*: name, talk, "When" (exactly as it should read), date, **Join link**, bio, note, photo. Leave status **Upcoming**. It appears at the top of Career Awareness with a *Join Meeting* button. |
| Change the Join link | Events → *Edit* on that event → *Join link* → Save. |
| After the event | Events → **Move to Past**. It leaves Career Awareness and appears on Past Speakers (grouped by the event date's year). The Join button is not shown for past events. |
| Add a news story | **AI News** → *New article* → Publish. It becomes the lead story on `/innovation` and the first of the three on Home. |
| Remove something | *Delete* asks twice (the button turns red and reads "Confirm delete"). |

Bio and note text: separate paragraphs with a blank line; write links as `[chrisdede.com](https://chrisdede.com)`. Only plain `http(s)` links become links.

## How the pieces fit

```
src/lib/backend.js       the only place that creates the Supabase client (lazy); decides enabled / demo / off
src/auth/AuthProvider    session + isAdmin (a row in public.admins) → useAuth()
src/components/AuthControl · LoginDialog     header pill + native <dialog> sign-in
src/pages/Admin.jsx (lazy) + components/admin/*   the console, behind a route guard
src/lib/admin-api.js     every write the console makes (+ image resize/upload)
src/lib/content.js       useArticles / useUpcomingEvents / usePastEvents: bundled content first, database rows when they arrive
supabase/schema.sql      tables, constraints, Row Level Security, the `media` storage bucket
supabase/seed.sql        generated (npm run seed:sql) copy of the bundled articles + Dede event
```

**Security model.** The route guard and the hidden buttons are courtesy only; anyone can read the JavaScript. What actually protects the data is `supabase/schema.sql`: every table allows `select` to everyone but `insert / update / delete` only when `public.is_admin()` is true, i.e. the caller's user id is in `public.admins` — a table the browser can read for its own row but never write. Links are also checked twice (a `check` constraint in SQL, and `safeHref` when rendering) so a `javascript:` URL can't be stored or followed. Uploaded images go to a public `media` bucket limited to 2 MB WebP/JPEG/PNG, writable only by admins.

## Try it without Supabase (dev only)

```bash
npm run dev:demo
```

Starts the site against a localStorage stand-in (`src/lib/demoClient.js`), seeded from the bundled content. Sign in with **any email ending `@admin.demo`** (any password) to be an admin, or any other email to see the non-admin experience. Data lives in your browser only. This is **not security**, and it is compiled out of `npm run build`.

## Not done / decisions for later

- **Password reset and email templates** use Supabase's defaults (and its small built-in email quota on the free plan). Configure SMTP in the dashboard if admins will use "forgot password".
- **Two-factor sign-in** for admins is available in Supabase (Authentication → MFA) but not wired into the sign-in dialog.
- **Contact / FAQ forms** are still the `mailto:` draft described in `docs/TBD_REGISTER.md`. Supabase could also store those submissions — say if you want it.
- **Reordering** news is by publication in the console (new articles go to the top). There is no drag-to-reorder.
