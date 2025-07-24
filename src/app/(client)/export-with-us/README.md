# Cyperus Enterprise Export Page

## Setup Instructions

### 1. Image Requirements
Place the following images in the `/public/images/` directory:
- `tigernut-factory.jpg` - Hero background image (1920x1080px recommended)
- `tigernut-farm.jpg` - Farm image for "Why Choose Us" section (800x600px recommended)

### 2. Supabase Database Setup

#### Export Inquiries Table
This table stores submissions from the "Become a Distributor" form:

```sql
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
```

#### Products Catalog Table
For storing product information:

```sql
create table public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null,
  description text,
  price numeric not null,
  inventory integer not null,
  image_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Set up row level security policies
alter table public.products enable row level security;

-- Allow anyone to read products
create policy "Allow public read access to products"
  on public.products for select
  to anon
  using (true);

-- Only allow authenticated admins to modify products
create policy "Allow admin to modify products"
  on public.products for all
  to authenticated
  using (auth.uid() in (
    select auth.uid() from auth.users 
    where auth.email() in (select email from public.admin_users)
  ))
  with check (auth.uid() in (
    select auth.uid() from auth.users 
    where auth.email() in (select email from public.admin_users)
  ));
```

### 3. Supabase Storage Setup
1. Create a new bucket named `product-images`
2. Set public access to "true" to allow anonymous reads
3. Update RLS policies to restrict uploads to authenticated admin users

### 4. Environment Variables
Make sure your `.env.local` file contains:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Real-time Updates
This page includes Supabase's real-time features for inventory tracking, but you will need to enable real-time in your Supabase project settings.
