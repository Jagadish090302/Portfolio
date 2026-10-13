-- JAGADISH CYBERPUNK PORTFOLIO — Supabase setup
-- Run SECTION A first. Create the Auth user and obtain their UUID before running SECTION B.

-- SECTION A: Shared portfolio data table and public read access
create table if not exists public.portfolio_content (
  id integer primary key check (id = 1),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_content enable row level security;

drop policy if exists "Anyone can view portfolio" on public.portfolio_content;
create policy "Anyone can view portfolio"
on public.portfolio_content for select
to anon, authenticated
using (true);

grant select on public.portfolio_content to anon, authenticated;
grant insert, update on public.portfolio_content to authenticated;

insert into public.portfolio_content (id, content)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- SECTION B: Replace EVERY occurrence of 25e9071c-d25f-4b4f-978a-8a0672a5f0bf with the UUID of your
-- own user from Supabase Dashboard > Authentication > Users, then run this section.
-- Do not leave the placeholder in place.

drop policy if exists "Portfolio owner can update" on public.portfolio_content;
drop policy if exists "Portfolio owner can insert" on public.portfolio_content;
create policy "Portfolio owner can update"
on public.portfolio_content for update
to authenticated
using (auth.uid() = '25e9071c-d25f-4b4f-978a-8a0672a5f0bf'::uuid)
with check (auth.uid() = '25e9071c-d25f-4b4f-978a-8a0672a5f0bf'::uuid);

create policy "Portfolio owner can insert"
on public.portfolio_content for insert
to authenticated
with check (auth.uid() = '25e9071c-d25f-4b4f-978a-8a0672a5f0bf'::uuid);

-- SECTION C: Create a Storage bucket named `certificates` in Dashboard > Storage.
-- Set it to PUBLIC so portfolio visitors can view certificates by their public URL.
-- Then replace the UUID placeholder below and run these Storage policies.

drop policy if exists "Portfolio owner can upload certificates" on storage.objects;
drop policy if exists "Portfolio owner can update certificates" on storage.objects;
drop policy if exists "Portfolio owner can delete certificates" on storage.objects;

create policy "Portfolio owner can upload certificates"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'certificates'
  and auth.uid() = '25e9071c-d25f-4b4f-978a-8a0672a5f0bf'::uuid
);

create policy "Portfolio owner can update certificates"
on storage.objects for update
to authenticated
using (
  bucket_id = 'certificates'
  and auth.uid() = '25e9071c-d25f-4b4f-978a-8a0672a5f0bf'::uuid
)
with check (
  bucket_id = 'certificates'
  and auth.uid() = '25e9071c-d25f-4b4f-978a-8a0672a5f0bf'::uuid
);

create policy "Portfolio owner can delete certificates"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'certificates'
  and auth.uid() = '25e9071c-d25f-4b4f-978a-8a0672a5f0bf'::uuid
);
