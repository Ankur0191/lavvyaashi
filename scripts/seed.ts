import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join } from "path";

// Manually parse .env.local since dotenv isn't installed
const envContent = readFileSync(join(process.cwd(), ".env.local"), "utf-8");
for (const line of envContent.split('\n')) {
  if (line.trim() && !line.startsWith('#')) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) {
      process.env[key.trim()] = rest.join('=').trim();
    }
  }
}

// The URL might be incorrect in .env.local ("your-project"). Let's try to extract from the token if so.
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
if (supabaseUrl.includes("your-project")) {
  supabaseUrl = "https://bwrpzcjcdyqhfvyxquqx.supabase.co";
}

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Starting seed on", supabaseUrl);
  
  // 1. Insert Categories
  const { data: cat1, error: errC1 } = await supabase
    .from("categories")
    .upsert({ slug: 'face-care', name: 'Face Care', description: 'Luxury skincare for your face', position: 1 }, { onConflict: 'slug' })
    .select()
    .single();

  const { data: cat2, error: errC2 } = await supabase
    .from("categories")
    .upsert({ slug: 'body-care', name: 'Body Care', description: 'Luxury skincare for your body', position: 2 }, { onConflict: 'slug' })
    .select()
    .single();

  if (errC1 || errC2) {
    console.error("Error inserting categories:", errC1, errC2);
    return;
  }
  
  console.log("Categories inserted:", cat1.name, cat2.name);

  // 2. Insert Products
  const products = [
    {
      slug: 'radiance-botanical-serum',
      name: 'Radiance Botanical Serum',
      category_id: cat1.id,
      summary: 'A powerful anti-aging serum with 24k gold flakes.',
      description: 'Formulated with rare botanical extracts and 24k gold flakes, this serum revitalizes the skin.',
      thumbnail: '/products/serum.webp',
      price: 4500.00,
      mrp: 5500.00,
      stock: 100,
      featured: true,
      best_seller: true,
      trending: false,
      new_arrival: false,
      tags: ["serum", "anti-aging", "gold"],
      benefits: ["Reduces fine lines", "Boosts collagen", "Instant radiance"]
    },
    {
      slug: 'velvet-hydration-cream',
      name: 'Velvet Hydration Cream',
      category_id: cat1.id,
      summary: 'Deep moisture cream for dry and sensitive skin.',
      description: 'A rich, velvety cream that provides intense hydration for up to 48 hours.',
      thumbnail: '/products/cream.webp',
      price: 3200.00,
      mrp: 3800.00,
      stock: 150,
      trending: true,
      featured: false,
      best_seller: false,
      new_arrival: false,
      tags: ["cream", "hydration", "moisturizer"],
      benefits: ["48h moisture", "Soothes sensitivity", "Repairs barrier"]
    },
    {
      slug: 'luminous-body-oil',
      name: 'Luminous Body Oil',
      category_id: cat2.id,
      summary: 'Luxurious body oil for a sun-kissed glow.',
      description: 'This lightweight, fast-absorbing body oil is infused with jojoba, sweet almond, and a hint of shimmer.',
      thumbnail: '/products/oil.webp',
      price: 2800.00,
      mrp: 3500.00,
      stock: 80,
      featured: true,
      new_arrival: true,
      trending: false,
      best_seller: false,
      tags: ["body oil", "glow", "hydration"],
      benefits: ["Fast absorbing", "Silky smooth finish", "Subtle shimmer"]
    },
    {
      slug: 'purifying-clay-mask',
      name: 'Purifying Clay Mask',
      category_id: cat1.id,
      summary: 'Detoxifying mask with French green clay.',
      description: 'A deep-cleansing mask that draws out impurities and minimizes pores without stripping the skin.',
      thumbnail: '/products/mask.webp',
      price: 1800.00,
      mrp: 2200.00,
      stock: 200,
      featured: false,
      best_seller: false,
      trending: false,
      new_arrival: false,
      tags: ["mask", "detox", "pores"],
      benefits: ["Minimizes pores", "Draws out impurities", "Mattifies skin"]
    }
  ];

  for (const product of products) {
    const { error } = await supabase
      .from("products")
      .upsert(product, { onConflict: 'slug' });
      
    if (error) {
      console.error("Error inserting product", product.name, error);
    } else {
      console.log("Inserted product", product.name);
    }
  }

  console.log("Seed completed!");
}

seed().catch(console.error);
