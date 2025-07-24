# Quick Development Setup

## 🚨 Environment Variables Required

The cart system needs Supabase configuration to work properly. Here's how to set it up quickly:

### 1. Create `.env.local` file

Create a `.env.local` file in your project root with these variables:

```bash
# Supabase Configuration (Required for cart/auth)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Paystack Configuration (Optional for now)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your-paystack-public-key
PAYSTACK_SECRET_KEY=sk_test_your-paystack-secret-key
```

### 2. Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings > API
4. Copy your Project URL and anon/public key
5. Paste them into your `.env.local` file

### 3. Set Up Database (Optional)

If you want the full database functionality:

1. In your Supabase project dashboard, go to SQL Editor
2. Copy and paste the content from `src/app/lib/database-schema.sql`
3. Run the SQL to create all tables and policies

### 4. Development Mode

The cart system will work in fallback mode with localStorage if Supabase isn't configured.

**With Supabase**: Full database-backed cart with real-time sync
**Without Supabase**: localStorage-based cart (data lost on browser clear)

### 5. Current Status

✅ **Cart Context**: Enhanced with database integration + localStorage fallback
✅ **Auth Context**: Handles missing Supabase configuration gracefully  
✅ **Product Service**: Database-ready product management
✅ **Paystack Service**: Ghana payment processing ready
✅ **Error Handling**: Comprehensive fallbacks for development

## 🔧 Testing

You can test the system immediately:

```bash
npm run dev
```

- Cart will use localStorage if Supabase isn't configured
- No errors will be thrown for missing database
- All UI components work normally
- Authentication features will show appropriate messages

## 🎯 Quick Start Checklist

- [ ] Copy `.env.example` to `.env.local`
- [ ] Add Supabase URL and key (from supabase.com)
- [ ] Start development server (`npm run dev`)
- [ ] Test cart functionality on `/products` page
- [ ] Optionally: Run database schema for full features

**The system is now development-ready with graceful fallbacks!** 🚀
