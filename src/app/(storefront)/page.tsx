import { Hero } from "@/components/home/Hero";
import { MarqueeBar } from "@/components/home/MarqueeBar";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { StorySection } from "@/components/home/StorySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBar />
      <FeaturedCategories />
      <FeaturedProducts />
      <StorySection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
