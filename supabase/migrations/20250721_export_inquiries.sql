-- Create export_inquiries table for form submissions
create table public.export_inquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  company text not null,
  email text not null,
  country text not null,
  interests text[] not null,
  message text,
  created_at timestamp with time zone default now(),
  contacted boolean default false,
  notes text
);

-- Set up row level security policies
alter table public.export_inquiries enable row level security;

-- Only allow admins to read from this table (protect customer data)
create policy "Allow admins to read export inquiries"
  on public.export_inquiries for select
  to authenticated
  using (auth.uid() in (
    select auth.uid() from auth.users 
    where auth.email() in (select email from public.admin_users)
  ));

-- Allow anonymous users to insert inquiries
create policy "Allow anonymous users to insert export inquiries"
  on public.export_inquiries for insert
  to anon
  with check (true);
