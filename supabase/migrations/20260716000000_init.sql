-- Migration: Initial Schema for Lavvyaashi
-- Description: Creates tables for profiles, categories, products, addresses, cart, and orders.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  avatar TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'name', 'New User'), 'customer');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. CATEGORIES
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  ingredients TEXT,
  benefits JSONB DEFAULT '[]',
  how_to_use TEXT,
  images JSONB DEFAULT '[]',
  thumbnail TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  mrp DECIMAL(10,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  sku TEXT UNIQUE,
  weight TEXT,
  volume TEXT,
  tags JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT false,
  trending BOOLEAN DEFAULT false,
  new_arrival BOOLEAN DEFAULT false,
  best_seller BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0.0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ADDRESSES
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  line1 TEXT NOT NULL,
  line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'India',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CART ITEMS
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- 6. ORDERS
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'refund_requested', 'refunded')),
  subtotal DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  coupon_code TEXT,
  coupon_discount DECIMAL(10,2) DEFAULT 0,
  shipping DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('razorpay', 'stripe', 'cod')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_id TEXT,
  address JSONB NOT NULL,
  tracking_number TEXT,
  estimated_delivery TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ORDER ITEMS
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_thumbnail TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10,2) NOT NULL,
  variant TEXT
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view and edit their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Categories & Products: Anyone can read
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);

-- Addresses: Users can manage their own addresses
CREATE POLICY "Users can manage own addresses" ON public.addresses FOR ALL USING (auth.uid() = user_id);

-- Cart: Users can manage their own cart
CREATE POLICY "Users can manage own cart" ON public.cart_items FOR ALL USING (auth.uid() = user_id);

-- Orders: Users can view their own orders, only create own orders
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
  order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid())
);
CREATE POLICY "Users can insert own order items" ON public.order_items FOR INSERT WITH CHECK (
  order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid())
);

-- SEED DATA (Categories & Products)
-- Since we are doing a quick migration, we'll use DO block to seed
DO $$
DECLARE
  face_cat_id UUID;
  body_cat_id UUID;
  product_id_1 UUID;
  product_id_2 UUID;
BEGIN
  -- Insert Categories
  INSERT INTO public.categories (name, slug, description, position)
  VALUES ('Face Care', 'face-care', 'Luxury skincare for your face', 1)
  RETURNING id INTO face_cat_id;
  
  INSERT INTO public.categories (name, slug, description, position)
  VALUES ('Body Care', 'body-care', 'Luxury skincare for your body', 2)
  RETURNING id INTO body_cat_id;

  -- Insert Products
  INSERT INTO public.products (
    name, slug, category_id, summary, description, thumbnail, price, mrp, stock, featured, best_seller, tags, benefits
  ) VALUES (
    'Radiance Botanical Serum',
    'radiance-botanical-serum',
    face_cat_id,
    'A powerful anti-aging serum with 24k gold flakes.',
    'Formulated with rare botanical extracts and 24k gold flakes, this serum revitalizes the skin, reducing fine lines and providing an instant radiant glow. Ideal for all skin types.',
    '/products/serum.webp',
    4500.00,
    5500.00,
    100,
    true,
    true,
    '["serum", "anti-aging", "gold"]'::jsonb,
    '["Reduces fine lines", "Boosts collagen", "Instant radiance"]'::jsonb
  );

  INSERT INTO public.products (
    name, slug, category_id, summary, description, thumbnail, price, mrp, stock, trending, tags, benefits
  ) VALUES (
    'Velvet Hydration Cream',
    'velvet-hydration-cream',
    face_cat_id,
    'Deep moisture cream for dry and sensitive skin.',
    'A rich, velvety cream that provides intense hydration for up to 48 hours. Enriched with hyaluronic acid and shea butter, it restores the skins natural barrier.',
    '/products/cream.webp',
    3200.00,
    3800.00,
    150,
    true,
    '["cream", "hydration", "moisturizer"]'::jsonb,
    '["48h moisture", "Soothes sensitivity", "Repairs barrier"]'::jsonb
  );

  INSERT INTO public.products (
    name, slug, category_id, summary, description, thumbnail, price, mrp, stock, featured, new_arrival, tags, benefits
  ) VALUES (
    'Luminous Body Oil',
    'luminous-body-oil',
    body_cat_id,
    'Luxurious body oil for a sun-kissed glow.',
    'This lightweight, fast-absorbing body oil is infused with jojoba, sweet almond, and a hint of shimmer. Leaves the skin feeling silky smooth and looking luminous.',
    '/products/oil.webp',
    2800.00,
    3500.00,
    80,
    true,
    true,
    '["body oil", "glow", "hydration"]'::jsonb,
    '["Fast absorbing", "Silky smooth finish", "Subtle shimmer"]'::jsonb
  );

  INSERT INTO public.products (
    name, slug, category_id, summary, description, thumbnail, price, mrp, stock, best_seller, tags, benefits
  ) VALUES (
    'Purifying Clay Mask',
    'purifying-clay-mask',
    face_cat_id,
    'Detoxifying mask with French green clay.',
    'A deep-cleansing mask that draws out impurities and minimizes pores without stripping the skin. Contains French green clay and matcha green tea extract.',
    '/products/mask.webp',
    1800.00,
    2200.00,
    200,
    false,
    '["mask", "detox", "pores"]'::jsonb,
    '["Minimizes pores", "Draws out impurities", "Mattifies skin"]'::jsonb
  );
END $$;
