import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const productsToInsert = [
  {
    name: "Kanti Vardhan Divine Glow Face Cream",
    slug: "divine-glow-cream",
    summary: "Luxury face cream for a divine, radiant glow.",
    description: "Experience the ultimate luxury with Kanti Vardhan Divine Glow Face Cream. Enriched with rare ingredients like Saffron and Gold, this cream deeply nourishes the skin, leaving it soft, supple, and glowing.",
    ingredients: "Kesar (Saffron), Chandan (Sandalwood), Manjistha Extract, Mulethi Extract, Khas Extract, Haldi (Turmeric) Extract, Gulab Jal (Rose Water), Gaay Ka Ghee (Cow’s Ghee), Badam Tel (Almond Oil), gel Base.",
    benefits: ["Deeply nourishes and hydrates", "Enhances natural radiance", "Improves skin texture", "Reduces dullness"],
    how_to_use: "Apply a small amount to cleansed face and neck. Gently massage in upward circular motions until fully absorbed. Use twice daily for best results.",
    thumbnail: "/products/productimages/Kanti Vardhan Divine Glow Face Cream.png",
    price: 3499.00,
    mrp: 4500.00,
    stock: 100,
    featured: true,
    best_seller: true,
    tags: ["cream", "glow", "face"]
  },
  {
    name: "Acne Clear Gel",
    slug: "acne-clear-gel",
    summary: "Targeted spot treatment for clear, blemish-free skin.",
    description: "Say goodbye to stubborn breakouts with our powerful Acne Clear Gel. Formulated with potent botanical extracts, it helps soothe inflammation, reduce redness, and prevent future acne formation.",
    ingredients: "Manjistha Extract, Haridra (Turmeric) Extract, Semal Thorns Extract, Sariva Shwet Extract, Lodhra Extract, Masoor Extract, Gel Base.",
    benefits: ["Targeted acne treatment", "Soothes inflammation", "Reduces redness", "Prevents future breakouts"],
    how_to_use: "Apply a thin layer directly to blemishes and problem areas after cleansing. Use up to three times daily as needed.",
    thumbnail: "/products/productimages/ACNE CLEAR GEL.png",
    price: 1899.00,
    mrp: 2400.00,
    stock: 150,
    trending: true,
    tags: ["gel", "acne", "treatment"]
  },
  {
    name: "Bust Lift Tightening Cream",
    slug: "bust-lift-tightening-cream",
    summary: "Firming and toning cream for a lifted appearance.",
    description: "Enhance your natural curves with our Bust Lift Tightening Cream. This specialized formula helps improve skin elasticity, providing a firmer and more toned look.",
    ingredients: "Gambhari Extract, Ashwagandha Extract, Badi Kateri Extract, Gulab Ki Patti (Rose Petals), Til Oil (Sesame Oil), Cream Base.",
    benefits: ["Improves skin elasticity", "Firms and tones", "Enhances natural curves", "Deeply moisturizes"],
    how_to_use: "Massage gently onto the bust area using upward, circular motions until fully absorbed. Use daily after showering.",
    thumbnail: "/products/productimages/Burst lift tightening cream.png",
    price: 2800.00,
    mrp: 3500.00,
    stock: 80,
    featured: true,
    new_arrival: true,
    tags: ["cream", "body", "firming"]
  },
  {
    name: "V Tightening Rejuvenating Cream",
    slug: "v-tightening-rejuvenating-cream",
    summary: "Rejuvenating and tightening cream for intimate wellness.",
    description: "A gentle yet effective rejuvenating cream designed for intimate areas. Formulated with carefully selected Ayurvedic ingredients to help tone, tighten, and restore natural balance.",
    ingredients: "Dhay Ka Phool Extract, Kooth Extract, Badi Harad (Haritaki) Extract, Fitkari (Alum), Majuphal (Oak Gall), Lodhra (Phal) Extract, Anar Ki Chaal Extract, Kadvi Tumbi Extract, Gel Base.",
    benefits: ["Tones and tightens", "Restores natural balance", "Gentle on sensitive areas", "Rejuvenating properties"],
    how_to_use: "Apply a small amount to the required area as directed. For external use only.",
    thumbnail: "/products/productimages/V tightening cream.png",
    price: 2499.00,
    mrp: 3200.00,
    stock: 120,
    best_seller: true,
    tags: ["cream", "intimate", "tightening"]
  }
];

async function seedProducts() {
  console.log("Seeding products...");
  
  // First, ensure categories exist or get them
  const { data: categories, error: catError } = await supabase.from('categories').select('*');
  
  if (catError) {
    console.error("Error fetching categories:", catError);
    return;
  }
  
  let faceCatId = categories.find(c => c.slug === 'face-care')?.id;
  let bodyCatId = categories.find(c => c.slug === 'body-care')?.id;
  
  // Just clear old products to keep it clean (or we can just insert)
  console.log("Deleting old products...");
  await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  for (let i = 0; i < productsToInsert.length; i++) {
    const p = productsToInsert[i];
    const category_id = p.tags.includes('body') || p.tags.includes('intimate') ? bodyCatId : faceCatId;
    
    const { error } = await supabase.from('products').insert({
      ...p,
      category_id,
      images: [p.thumbnail]
    });
    
    if (error) {
      console.error(`Error inserting ${p.name}:`, error);
    } else {
      console.log(`Successfully inserted ${p.name}`);
    }
  }
  
  console.log("Seeding completed!");
}

seedProducts();
