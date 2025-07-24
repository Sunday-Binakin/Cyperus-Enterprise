-- ================================
-- CYPERUS ECOMMERCE DATABASE SCHEMA
-- ================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ================================
-- PRODUCTS & INVENTORY MANAGEMENT
-- ================================

-- Main products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  inventory INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  meta_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product variants (sizes, colors, flavors, etc.)
CREATE TABLE IF NOT EXISTS variants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g., "500g", "Large", "Red"
  price_adjustment DECIMAL(10,2) DEFAULT 0, -- +/- from base price
  inventory INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  meta_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product images (multiple images per product)
CREATE TABLE IF NOT EXISTS product_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================
-- USER PROFILES & ADDRESSES
-- ================================

-- Extended user profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shipping addresses
CREATE TABLE IF NOT EXISTS addresses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT,
  country TEXT NOT NULL DEFAULT 'Ghana',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================
-- CART MANAGEMENT
-- ================================

-- Shopping cart (supports both logged-in users and guests)
CREATE TABLE IF NOT EXISTS cart (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID, -- For guest users
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES variants(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL, -- Store price at time of adding to cart
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure unique cart items per user/session
  UNIQUE(user_id, product_id, variant_id),
  UNIQUE(session_id, product_id, variant_id),
  
  -- Ensure either user_id or session_id is provided
  CHECK ((user_id IS NOT NULL) OR (session_id IS NOT NULL))
);

-- ================================
-- ORDERS & PAYMENTS
-- ================================

-- Main orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id UUID, -- For guest orders
  
  -- Order totals
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'GHS',
  
  -- Order status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
  )),
  
  -- Payment information
  payment_id TEXT, -- Paystack transaction reference
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN (
    'pending', 'paid', 'failed', 'refunded', 'cancelled'
  )),
  payment_method TEXT NOT NULL CHECK (payment_method IN (
    'paystack', 'cash_on_delivery', 'bank_transfer'
  )),
  
  -- Shipping information
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  
  -- Timestamps
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Metadata
  notes TEXT,
  meta_data JSONB DEFAULT '{}'
);

-- Order items (what was purchased)
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE RESTRICT,
  variant_id UUID REFERENCES variants(id) ON DELETE SET NULL,
  
  -- Product details at time of purchase
  product_name TEXT NOT NULL,
  variant_name TEXT,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  
  -- Product snapshot
  product_snapshot JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order tracking events
CREATE TABLE IF NOT EXISTS order_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- ================================
-- PAYMENT MANAGEMENT
-- ================================

-- Payment transactions log
CREATE TABLE IF NOT EXISTS payment_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  payment_reference TEXT UNIQUE NOT NULL,
  payment_method TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'GHS',
  status TEXT NOT NULL CHECK (status IN ('pending', 'success', 'failed', 'cancelled')),
  gateway_response JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Failed payments for retry/analysis
CREATE TABLE IF NOT EXISTS failed_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  payment_reference TEXT,
  error_code TEXT,
  error_message TEXT,
  gateway_response JSONB DEFAULT '{}',
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================
-- ADMIN & ANALYTICS
-- ================================

-- Admin users (additional permissions)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'manager', 'staff')),
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- System notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  meta_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================
-- INDEXES FOR PERFORMANCE
-- ================================

-- Products indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- Variants indexes
CREATE INDEX IF NOT EXISTS idx_variants_product_id ON variants(product_id);
CREATE INDEX IF NOT EXISTS idx_variants_active ON variants(is_active);

-- Cart indexes
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_session_id ON cart(session_id);
CREATE INDEX IF NOT EXISTS idx_cart_product_id ON cart(product_id);

-- Orders indexes
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_session_id ON orders(session_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

-- Order items indexes
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- Payment transactions indexes
CREATE INDEX IF NOT EXISTS idx_payment_transactions_order_id ON payment_transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_reference ON payment_transactions(payment_reference);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_status ON payment_transactions(status);

-- ================================
-- FUNCTIONS & TRIGGERS
-- ================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  order_num TEXT;
BEGIN
  -- Generate order number: CYP-YYYYMMDD-XXXXX
  order_num := 'CYP-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 99999 + 1)::TEXT, 5, '0');
  
  -- Ensure uniqueness
  WHILE EXISTS (SELECT 1 FROM orders WHERE order_number = order_num) LOOP
    order_num := 'CYP-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 99999 + 1)::TEXT, 5, '0');
  END LOOP;
  
  RETURN order_num;
END;
$$ LANGUAGE plpgsql;

-- Function to set default order number
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to validate cart item price
CREATE OR REPLACE FUNCTION validate_cart_price()
RETURNS TRIGGER AS $$
DECLARE
  product_price DECIMAL(10,2);
  variant_adjustment DECIMAL(10,2) := 0;
BEGIN
  -- Get product base price
  SELECT price INTO product_price FROM products WHERE id = NEW.product_id;
  
  -- Get variant price adjustment if applicable
  IF NEW.variant_id IS NOT NULL THEN
    SELECT price_adjustment INTO variant_adjustment FROM variants WHERE id = NEW.variant_id;
  END IF;
  
  -- Set the correct price
  NEW.price := product_price + COALESCE(variant_adjustment, 0);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ================================
-- APPLY TRIGGERS
-- ================================

-- Updated_at triggers
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_updated_at BEFORE UPDATE ON cart
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_transactions_updated_at BEFORE UPDATE ON payment_transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Order number trigger
CREATE TRIGGER set_order_number_trigger BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION set_order_number();

-- Cart price validation trigger
CREATE TRIGGER validate_cart_price_trigger BEFORE INSERT OR UPDATE ON cart
  FOR EACH ROW EXECUTE FUNCTION validate_cart_price();

-- ================================
-- ROW LEVEL SECURITY (RLS)
-- ================================

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE failed_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- ================================
-- PUBLIC READ POLICIES (Products)
-- ================================

-- Products are publicly readable when active
CREATE POLICY "Products are publicly readable" ON products
  FOR SELECT USING (is_active = true);

-- Variants are publicly readable when active
CREATE POLICY "Variants are publicly readable" ON variants
  FOR SELECT USING (is_active = true);

-- Product images are publicly readable
CREATE POLICY "Product images are publicly readable" ON product_images
  FOR SELECT USING (true);

-- ================================
-- USER-SPECIFIC POLICIES
-- ================================

-- Profiles: Users can only access their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Addresses: Users can only access their own addresses
CREATE POLICY "Users can manage own addresses" ON addresses
  FOR ALL USING (auth.uid() = user_id);

-- Cart: Users can access their cart or session-based cart
CREATE POLICY "User cart access" ON cart
  FOR ALL USING (
    auth.uid() = user_id OR 
    (session_id IS NOT NULL AND user_id IS NULL)
  );

-- Orders: Users can view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Order items: Users can view items from their orders
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Order tracking: Users can view tracking for their orders
CREATE POLICY "Users can view own order tracking" ON order_tracking
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_tracking.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Payment transactions: Users can view their payment transactions
CREATE POLICY "Users can view own payments" ON payment_transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = payment_transactions.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Notifications: Users can view their own notifications
CREATE POLICY "Users can view own notifications" ON notifications
  FOR ALL USING (auth.uid() = user_id);

-- ================================
-- ADMIN POLICIES
-- ================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin can manage products
CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (is_admin());

-- Admin can manage variants
CREATE POLICY "Admins can manage variants" ON variants
  FOR ALL USING (is_admin());

-- Admin can manage all orders
CREATE POLICY "Admins can manage orders" ON orders
  FOR ALL USING (is_admin());

-- Admin can manage order tracking
CREATE POLICY "Admins can manage order tracking" ON order_tracking
  FOR ALL USING (is_admin());

-- Admin can view payment transactions
CREATE POLICY "Admins can view payments" ON payment_transactions
  FOR SELECT USING (is_admin());

-- Admin can view failed payments
CREATE POLICY "Admins can view failed payments" ON failed_payments
  FOR ALL USING (is_admin());

-- ================================
-- GRANT PERMISSIONS
-- ================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant permissions on tables
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Grant execute on functions
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- ================================
-- SAMPLE DATA (Optional)
-- ================================

-- Insert sample admin user (replace with your user ID)
-- INSERT INTO admin_users (user_id, role) VALUES ('your-auth-user-id', 'admin');

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category, inventory) VALUES
('TIGERNUTS MEAL SWALLOW: COCONUT MIX 1700g', 'Premium tigernut meal with coconut mix for traditional swallow preparation', 125.00, '/images/products/coconut-mix.jpg', 'meal', 50),
('TIGERNUTS MEAL SWALLOW: ORIGINAL 1700g', 'Original tigernut meal for authentic swallow experience', 125.00, '/images/products/original-meal.jpg', 'meal', 30),
('DRIZZLES: TIGERNUT CHILLI SAUCE 320 ML', 'Spicy tigernut chilli sauce perfect for any meal', 50.00, '/images/products/chilli-sauce.jpg', 'sauce', 100),
('SNACKS: TRAIL MIX WITH NUTS 320 Grams', 'Healthy trail mix with tigernuts and other premium nuts', 50.00, '/images/products/trail-mix.jpg', 'snacks', 75);

-- Insert sample variants
INSERT INTO variants (product_id, name, price_adjustment, inventory) 
SELECT id, '500g', -25.00, 20 FROM products WHERE name LIKE '%1700g%';

INSERT INTO variants (product_id, name, price_adjustment, inventory) 
SELECT id, '160ml', -15.00, 50 FROM products WHERE name LIKE '%320 ML%';

COMMIT;
