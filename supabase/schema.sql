-- AI-Ways Forward · Supabase schema.
-- Run once: Supabase dashboard → SQL Editor → paste this file → Run. Safe to run again (it drops and recreates
-- its own policies). Then run supabase/seed.sql to copy the site's built-in articles and past event in.
-- Full walkthrough: docs/ADMIN.md.

-- ── Who is an admin ──────────────────────────────────────────────────────────────────────────────
-- A row here makes an account an admin. Rows are added by hand in the SQL editor (see docs/ADMIN.md) —
-- no policy lets the browser write to this table, so nobody can promote themselves.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.admins enable row level security;

drop policy if exists "admins: read own row" on public.admins;
create policy "admins: read own row" on public.admins
  for select to authenticated using (user_id = (select auth.uid()));

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- ── AI News articles ─────────────────────────────────────────────────────────────────────────────
-- `position` is the display order, ascending. A new article gets (lowest position − 1), i.e. it leads the page.
create table if not exists public.articles (
  id           uuid primary key default gen_random_uuid(),
  position     integer not null,
  source       text    not null,
  author       text    not null default '',
  author_href  text    check (author_href is null or author_href ~* '^https?://'),
  published_on date    not null,
  title        text    not null,
  href         text    not null check (href ~* '^https?://'),
  image_url    text    check (image_url is null or image_url ~* '^(https?://|/)'),
  created_at   timestamptz not null default now()
);
create index if not exists articles_position_idx on public.articles (position);
alter table public.articles enable row level security;

drop policy if exists "articles: anyone can read" on public.articles;
drop policy if exists "articles: admins insert" on public.articles;
drop policy if exists "articles: admins update" on public.articles;
drop policy if exists "articles: admins delete" on public.articles;
create policy "articles: anyone can read" on public.articles for select to anon, authenticated using (true);
create policy "articles: admins insert"   on public.articles for insert to authenticated with check (public.is_admin());
create policy "articles: admins update"   on public.articles for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "articles: admins delete"   on public.articles for delete to authenticated using (public.is_admin());

-- ── Speaker events ───────────────────────────────────────────────────────────────────────────────
-- status 'upcoming' → shown on Career Awareness (the "latest event" and its Join link).
-- status 'past'     → shown on the Past Speakers timeline.
-- bio / note are plain text; paragraphs are separated by a blank line and links are written [text](https://…).
create table if not exists public.events (
  id           uuid primary key default gen_random_uuid(),
  status       text not null default 'upcoming' check (status in ('upcoming', 'past')),
  speaker_name text not null,
  talk         text not null default '',
  when_text    text not null default '',
  event_date   date,
  bio          text not null default '',
  note         text not null default '',
  photo_url    text check (photo_url is null or photo_url ~* '^(https?://|/)'),
  join_url     text check (join_url is null or join_url ~* '^https?://'),
  created_at   timestamptz not null default now()
);
create index if not exists events_status_date_idx on public.events (status, event_date);
alter table public.events enable row level security;

drop policy if exists "events: anyone can read" on public.events;
drop policy if exists "events: admins insert" on public.events;
drop policy if exists "events: admins update" on public.events;
drop policy if exists "events: admins delete" on public.events;
create policy "events: anyone can read" on public.events for select to anon, authenticated using (true);
create policy "events: admins insert"   on public.events for insert to authenticated with check (public.is_admin());
create policy "events: admins update"   on public.events for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "events: admins delete"   on public.events for delete to authenticated using (public.is_admin());

-- ── Image uploads ────────────────────────────────────────────────────────────────────────────────
-- One public bucket for news thumbnails and speaker photos. Anyone can view; only admins can add, replace, remove.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 2097152, array['image/webp', 'image/jpeg', 'image/png'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "media: admins upload" on storage.objects;
drop policy if exists "media: admins update" on storage.objects;
drop policy if exists "media: admins delete" on storage.objects;
create policy "media: admins upload" on storage.objects for insert to authenticated with check (bucket_id = 'media' and public.is_admin());
create policy "media: admins update" on storage.objects for update to authenticated using (bucket_id = 'media' and public.is_admin());
create policy "media: admins delete" on storage.objects for delete to authenticated using (bucket_id = 'media' and public.is_admin());
