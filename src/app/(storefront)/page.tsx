import { Hero } from "@/components/home/Hero";
import { MarqueeBar } from "@/components/home/MarqueeBar";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { StorySection } from "@/components/home/StorySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = await createClient();

  // Fetch up to 4 featured products (for now just fetching 4 products)
  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(id, name, slug)")
    .limit(4);

  return (
    <>
      <Hero />
      <MarqueeBar />
      <FeaturedCategories />
      <FeaturedProducts products={products || []} />
      <StorySection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
