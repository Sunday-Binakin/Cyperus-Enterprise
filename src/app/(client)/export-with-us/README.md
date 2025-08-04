# Cyperus Enterprise Export Page

## Setup Instructions

### 1. Image Requirements
Place the following images in the `/public/images/` directory:
- `tigernut-factory.jpg` - Hero background image (1920x1080px recommended)
- `tigernut-farm.jpg` - Farm image for "Why Choose Us" section (800x600px recommended)

### 2. Client-Side Data Management

#### Export Inquiries Storage
This page uses client-side mock services for demonstration purposes. In a production environment, you would integrate with your preferred backend service.

The export inquiries are handled by the mock service which includes the following data structure:

```typescript
interface ExportInquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  country: string;
  interests: string[];
  message?: string;
  createdAt: Date;
  contacted: boolean;
  notes?: string;
}

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
```

### 3. Mock Services Integration
The export page integrates with the following mock services:
- Mock product service for inventory data
- Mock inquiry service for form submissions
- Mock authentication service for admin access

### 4. Environment Variables
Make sure your `.env.local` file contains:
```
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

### 5. Client-Side Features
This page includes client-side features for:
- Real-time inventory display using mock data
- Form submission handling with local storage
- Export inquiry management
