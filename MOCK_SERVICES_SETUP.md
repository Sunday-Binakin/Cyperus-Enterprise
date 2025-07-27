# Cyperus E-commerce Development Setup

This application now uses **mock services** instead of external dependencies for development simplicity.

## Mock Services Included

✅ **Mock Authentication**: localStorage-based user authentication  
✅ **Mock Product Service**: In-memory product database with simulated API delays  
✅ **Mock Payment Service**: Interactive payment simulation with success/failure testing  
✅ **Mock Order Service**: Complete order management with tracking and status updates  

## Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd cyperus
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Open [http://localhost:3000](http://localhost:3000)
   - All services work without external dependencies
   - Data is stored in localStorage and memory (resets on browser refresh)

## Mock Service Features

### Authentication
- Create accounts and sign in/out
- Data persisted in localStorage
- Automatic session management
- Password validation and user metadata

### Products
- Comprehensive product catalog with categories
- Search and filtering functionality
- Variant support and inventory tracking
- Simulated API delays for realistic experience

### Cart & Orders
- Add/remove items from cart
- Complete checkout process
- Order tracking with status updates
- Address management

### Payments
- Interactive payment modal for testing
- Choose success or failure outcomes
- Multiple payment methods supported
- Order confirmation flow

## Testing Payment Flows

When checking out:
1. Fill in shipping details
2. Select payment method
3. Click "Place Order"
4. In the payment modal, choose:
   - **Simulate Success**: Completes order successfully
   - **Simulate Failure**: Tests error handling
   - **Cancel**: Tests cancellation flow

## Development Notes

- **No External Dependencies**: No Supabase, Paystack, or other external services required
- **Instant Setup**: Works immediately after `npm install` and `npm run dev`
- **Reset Data**: Refresh browser to reset all mock data
- **Extensible**: Easy to replace mock services with real implementations later

## File Structure

```
src/app/lib/
├── mock-data.ts           # Product catalog and static data
├── mock-payment-service.ts # Payment processing simulation
├── mock-order-service.ts   # Order management and tracking
└── product-service.ts      # Product operations and search

src/app/context/
└── AuthContext.tsx        # Mock authentication provider
```

## Future Integration

To integrate real services later:
1. Replace mock services with real implementations
2. Update context providers to use real APIs
3. Add environment variables for service configuration
4. Update package.json with required dependencies

The application architecture supports easy migration from mock to real services.
