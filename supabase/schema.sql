-- AVIAN's database: one save per player.
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- It's safe to run again; it only creates what's missing.

create table if not exists public.saves (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  journal    jsonb not null default '{}'::jsonb check (jsonb_typeof(journal) = 'object'), -- bird id -> best photo stars (1-3)
  money      integer not null default 0 check (money >= 0),                              -- dollars, for boat fares
  progress   jsonb not null default '{}'::jsonb check (jsonb_typeof(progress) = 'object'), -- story flags + beaten nemesis birds
  location   jsonb,                                                                          -- where you last stood: { map, x, y, facing, at }
  updated_at timestamptz not null default now()
);

-- Added after the first release: saves made before it get an empty progress.
alter table public.saves add column if not exists progress jsonb not null default '{}'::jsonb check (jsonb_typeof(progress) = 'object');
alter table public.saves add column if not exists location jsonb;

-- Row level security: a signed-in player can only see and change their own save.
-- The site's public (anon/publishable) key can't read anyone else's row.
alter table public.saves enable row level security;

grant select, insert, update on public.saves to authenticated;

drop policy if exists "Players read their own save" on public.saves;
create policy "Players read their own save" on public.saves
  for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Players create their own save" on public.saves;
create policy "Players create their own save" on public.saves
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Players update their own save" on public.saves;
create policy "Players update their own save" on public.saves
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
