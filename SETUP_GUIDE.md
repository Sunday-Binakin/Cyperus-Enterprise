# Full-Stack eCommerce System Setup Guide

This guide will help you set up a complete eCommerce system using Supabase (database & auth) and Paystack (payments for Ghana).

## 🚀 Quick Start

### 1. Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env.local
```

2. Fill in your actual values in `.env.local`:
   - Get Supabase credentials from your Supabase project dashboard
   - Get Paystack keys from your Paystack dashboard
   - Update other configurations as needed

### 2. Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Run the database schema in your Supabase SQL editor:
```sql
-- Copy and paste the contents of src/app/lib/database-schema.sql
-- This will create all tables, triggers, RLS policies, and sample data
```

3. Enable Row Level Security (RLS) on all tables (should be enabled by the schema)

### 3. Authentication Setup

1. In your Supabase dashboard, go to Authentication > Settings
2. Configure allowed domains for your app
3. Enable Google OAuth (optional):
   - Add Google OAuth credentials
   - Set redirect URL to: `https://your-domain.com/auth/callback`

### 4. Paystack Setup (Ghana Payments)

1. Create a Paystack account at [paystack.com](https://paystack.com)
2. Get your test/live API keys from the dashboard
3. Add your domain to allowed origins in Paystack settings
4. Configure webhook endpoint: `https://your-domain.com/api/webhooks/paystack`

## 📁 Project Structure

```
src/
├── app/
│   ├── (client)/              # Client-facing pages
│   │   ├── layout.tsx         # Main layout with providers
│   │   ├── page.tsx           # Homepage
│   │   ├── products/          # Products listing
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout process
│   │   └── orders/            # Order management
│   ├── api/                   # API routes
│   │   ├── orders/            # Order operations
│   │   └── webhooks/          # Payment webhooks
│   ├── components/            # Reusable components
│   ├── context/               # React contexts
│   │   ├── AuthContext.tsx    # Authentication state
│   │   └── CartContext.tsx    # Shopping cart state
│   └── lib/                   # Utilities and services
│       ├── database-schema.sql # Complete database schema
│       ├── supabase.ts        # Supabase client and types
│       ├── product-service.ts # Product operations
│       ├── order-service.ts   # Order operations
│       └── paystack-service.ts # Payment processing
```

## 🛠 Features Implemented

### Database & Authentication
- ✅ Complete PostgreSQL schema with RLS policies
- ✅ User authentication with Supabase Auth
- ✅ Guest checkout support
- ✅ Admin permissions system
- ✅ Real-time cart synchronization

### Product Management
- ✅ Products with variants support
- ✅ Inventory management
- ✅ Category filtering
- ✅ Product search
- ✅ Image handling

### Shopping Cart
- ✅ Database-backed cart (replaces localStorage)
- ✅ Guest and authenticated user support
- ✅ Real-time updates across sessions
- ✅ Inventory validation
- ✅ Cart persistence

### Orders & Payments
- ✅ Complete order management
- ✅ Paystack integration for Ghana
- ✅ Order tracking
- ✅ Payment webhook handling
- ✅ Order status updates

### User Experience
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ WhatsApp integration

## 🧪 Testing the System

### 1. Database Operations
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Test Product Management
- Visit `/products` to see the product listing
- Test search and category filtering
- Add products to cart

### 3. Test Cart Functionality
- Add/remove items from cart
- Test quantity updates
- Verify cart persistence

### 4. Test Authentication
- Sign up/sign in with email
- Test Google OAuth (if configured)
- Verify cart synchronization after login

### 5. Test Checkout Process
- Go through complete checkout flow
- Test with Paystack test cards
- Verify order creation and status updates

## 🔧 Key Services

### ProductService (`product-service.ts`)
```typescript
// Get all products with filtering
const products = await productService.getProducts({
  category: 'electronics',
  limit: 20
});

// Search products
const results = await productService.searchProducts('laptop');

// Get featured products
const featured = await productService.getFeaturedProducts(8);
```

### CartContext (`CartContext.tsx`)
```typescript
const { items, addItem, removeItem, getTotalPrice } = useCart();

// Add item to cart
await addItem({
  product_id: 'product-uuid',
  name: 'Product Name',
  price: 100.00,
  image: '/product.jpg',
  inventory: 50
});
```

### PaystackService (`paystack-service.ts`)
```typescript
// Initialize payment
const payment = await paystackService.initializeTransaction({
  email: 'customer@example.com',
  amount: paystackService.formatAmount(100.00), // GHS 100
  metadata: { order_id: 'order-uuid' }
});

// Verify payment
const transaction = await paystackService.verifyTransaction(reference);
```

## 🌍 Ghana-Specific Features

### Currency & Payments
- **Currency**: Ghana Cedis (GHS)
- **Payment Methods**: Card, Bank Transfer, Mobile Money, USSD
- **Test Cards**: Use Paystack's test card numbers

### Mobile Money Integration
Paystack supports major Ghanaian mobile money providers:
- MTN Mobile Money
- Vodafone Cash
- AirtelTigo Money

### Local Business Features
- Ghana-friendly UI/UX
- Local phone number formatting
- WhatsApp Business integration
- Local delivery options support

## 📱 Mobile Optimization

The system is fully responsive and mobile-optimized:
- Touch-friendly interface
- Mobile payment methods
- Optimized loading for slower connections
- Progressive Web App features ready

## 🔒 Security Features

### Database Security
- Row Level Security (RLS) enabled
- User-specific data access
- Admin role permissions
- SQL injection protection

### Payment Security
- Paystack PCI compliance
- Webhook signature verification
- Secure API key handling
- HTTPS enforcement

### Authentication Security
- Supabase Auth security
- Session management
- Password policies
- OAuth integration

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```bash
# Production Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-key

# Production Paystack
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your-live-public-key
PAYSTACK_SECRET_KEY=sk_live_your-live-secret-key

# Production App URL
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 📞 Support & Contact

For technical support or business inquiries:
- **WhatsApp**: Integration ready in FloatingWhatsApp component
- **Email**: Configure in environment variables
- **Documentation**: This file and inline code comments

## 🔄 Next Steps

### Immediate Enhancements
1. **Admin Dashboard**: Product/order management interface
2. **Email Notifications**: Order confirmations and updates
3. **Inventory Alerts**: Low stock notifications
4. **Analytics**: Sales tracking and reporting

### Business Features
1. **Discount Codes**: Coupon system
2. **Shipping Calculator**: Delivery fee computation
3. **Multi-vendor**: Support multiple sellers
4. **Wishlist**: Save products for later

### Technical Improvements
1. **PWA**: Offline functionality
2. **Caching**: Redis integration
3. **CDN**: Image optimization
4. **Monitoring**: Error tracking and analytics

---

**Ready to launch your Ghanaian eCommerce business!** 🇬🇭✨
