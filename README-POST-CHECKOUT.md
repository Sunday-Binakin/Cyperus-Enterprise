# 🛒 Cyperus E-commerce Post-Checkout Flow

A comprehensive post-checkout user experience built with Next.js, Supabase, and Paystack integration.

## ✨ Features

### 🎯 Complete Checkout Experience
- **Smart Address Management**: Auto-fill from saved addresses with new address forms
- **Payment Options**: Paystack integration + Cash on Delivery
- **Real-time Validation**: Form validation with user-friendly error messages
- **Mobile Optimized**: Fully responsive design for all devices

### 🎉 Order Confirmation
- **Celebration Animation**: Confetti effects and visual feedback
- **Instant Confirmation**: Order details with receipt download
- **Order Tracking**: Direct link to track order progress
- **Email Notifications**: Automated confirmation emails

### 📦 Order Tracking System
- **Visual Progress Bar**: Real-time status with completion percentage
- **Detailed Timeline**: Event-by-event tracking with timestamps
- **Courier Integration**: Delivery company info and tracking numbers
- **Estimated Delivery**: Smart delivery date predictions

### 📋 Order Management
- **Order History**: Paginated listing with search and filters
- **Status Filtering**: Filter by pending, shipped, delivered, etc.
- **Quick Actions**: View details, download receipts, contact support
- **Mobile Support**: Touch-optimized interface

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project
- Paystack account with API keys

### Installation

1. **Clone and Install**
```bash
git clone <your-repo>
cd cyperus
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env.local
```

Configure your environment variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Paystack
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key
PAYSTACK_SECRET_KEY=sk_test_your_secret_key

# Optional Notifications
DISCORD_WEBHOOK_URL=your_discord_webhook
SLACK_WEBHOOK_URL=your_slack_webhook
```

3. **Database Setup**
Run the SQL schema in your Supabase dashboard:
```sql
-- Copy and execute the contents of src/app/lib/supabase-schema.sql
```

4. **Paystack Webhook Configuration**
- Go to Paystack Dashboard → Settings → Webhooks
- Add endpoint: `https://yourdomain.com/api/webhooks/paystack`
- Select events: `charge.success`, `charge.failed`

5. **Start Development**
```bash
npm run dev
```

## 🏗️ Architecture

### File Structure
```
src/app/
├── (client)/
│   ├── checkout/page.tsx          # Main checkout page
│   ├── order-success/page.tsx     # Order confirmation
│   ├── orders/
│   │   ├── page.tsx               # Orders listing
│   │   └── [id]/page.tsx          # Order tracking
├── api/
│   └── webhooks/
│       └── paystack/route.ts      # Webhook handler
├── lib/
│   ├── paystack.ts               # Paystack integration
│   ├── orderService.ts           # Order management
│   └── supabase-schema.sql       # Database schema
└── context/
    └── CartContext.tsx           # Enhanced cart management
```

### Database Schema
- **orders**: Main order information
- **order_items**: Individual product items
- **order_tracking_events**: Status timeline
- **order_courier_info**: Delivery details
- **customer_addresses**: Saved addresses
- **cart_items**: Persistent cart storage

## 💳 Payment Integration

### Paystack Setup
1. **Test Mode**: Use test API keys for development
2. **Webhook Security**: HMAC signature verification implemented
3. **Error Handling**: Comprehensive payment failure handling
4. **Mobile Support**: Optimized for mobile payments

### Test Cards
```
Success: 4084084084084081
Decline: 4084084084084081 (wrong CVV: 000)
Insufficient: Use amount 10,000,000 (in kobo)
```

## 🔄 Order Flow

### 1. Checkout Process
```
Cart → Checkout → Address → Payment → Confirmation
```

### 2. Payment Processing
```
Paystack Modal → Payment → Webhook → Order Update → Success Page
```

### 3. Order Tracking
```
Order Created → Confirmed → Processing → Shipped → Delivered
```

## 🛡️ Security Features

- **Row Level Security**: User-specific data access
- **Webhook Verification**: HMAC signature validation
- **Input Validation**: Client and server-side validation
- **Environment Variables**: Secure credential management

## 📱 Mobile Optimization

- **Responsive Design**: Tailwind CSS breakpoints
- **Touch Interactions**: Optimized for mobile use
- **Progressive Enhancement**: Works without JavaScript
- **Performance**: Optimized loading and interactions

## 🎨 User Experience

### Animations & Feedback
- **Confetti Celebration**: Order success animation
- **Loading States**: Clear loading indicators
- **Toast Notifications**: User action feedback
- **Progress Indicators**: Order status visualization

### Error Handling
- **Graceful Degradation**: Fallbacks for failures
- **Clear Messages**: User-friendly error explanations
- **Retry Mechanisms**: Easy recovery from errors
- **Support Links**: Direct access to help

## 🔧 Development

### Adding New Features

1. **New Order Status**
```typescript
// Add to orderService.ts
export type OrderStatus = 'pending' | 'confirmed' | 'your_new_status';
```

2. **Custom Tracking Events**
```typescript
await orderService.addTrackingEvent(
  orderId, 
  'custom_status', 
  'Custom description',
  'Location',
  'Additional notes'
);
```

3. **Webhook Events**
```typescript
// Add to api/webhooks/paystack/route.ts
case 'your.custom.event':
  await handleCustomEvent(event.data);
  break;
```

### Testing

1. **Order Flow Testing**
```bash
# Start development server
npm run dev

# Test complete checkout flow
# 1. Add items to cart
# 2. Go to checkout
# 3. Fill shipping info
# 4. Test payment methods
# 5. Verify order tracking
```

2. **Webhook Testing**
```bash
# Use ngrok for local webhook testing
npx ngrok http 3000

# Update Paystack webhook URL to ngrok URL
# Test webhooks from Paystack dashboard
```

## 🔍 Monitoring

### Key Metrics
- Order conversion rates
- Payment success rates
- Average order completion time
- User drop-off points

### Error Tracking
- Payment failures
- Webhook processing errors
- Database connection issues
- API response times

## 🚀 Deployment

### Vercel Deployment
```bash
# Build and deploy
npm run build
vercel --prod
```

### Environment Variables
Set all required environment variables in your deployment platform:
- Supabase credentials
- Paystack API keys
- Webhook URLs (optional)

### Webhook URL Update
Update Paystack webhook URL to your production domain:
```
https://yourdomain.com/api/webhooks/paystack
```

## 📖 API Reference

### Order Service Methods
```typescript
// Create new order
const order = await orderService.createOrder(orderData);

// Get order details
const order = await orderService.getOrder(orderId);

// Update order status
await orderService.updateOrderStatus(orderId, 'shipped');

// Add tracking event
await orderService.addTrackingEvent(orderId, 'custom', 'Description');
```

### Paystack Integration
```typescript
// Initialize payment
const response = await paystackService.initializeTransaction({
  email: 'customer@email.com',
  amount: 50000, // in kobo
  reference: 'unique_ref',
  metadata: { order_id: 'order_123' }
});

// Verify transaction
const verification = await paystackService.verifyTransaction(reference);
```

## 🐛 Troubleshooting

### Common Issues

1. **Payment Modal Not Opening**
```javascript
// Ensure Paystack script is loaded
await loadPaystackScript();
```

2. **Webhook Not Receiving Events**
- Check webhook URL in Paystack dashboard
- Verify HTTPS endpoint (required for production)
- Check webhook signature validation

3. **Database Connection Issues**
- Verify Supabase credentials
- Check Row Level Security policies
- Ensure proper table permissions

4. **Order Not Creating**
- Check required fields validation
- Verify user authentication
- Review Supabase logs

### Debug Mode
```javascript
// Enable debug logging
console.log('Order creation data:', orderData);
console.log('Paystack response:', paymentResponse);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Paystack**: Payment processing
- **Supabase**: Database and authentication
- **Next.js**: React framework
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **Canvas Confetti**: Celebration animations

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check the documentation in `/docs`
- Review the troubleshooting section

---

Built with ❤️ for seamless e-commerce experiences
