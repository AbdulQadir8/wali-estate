import { MainLayout } from '@/layouts/MainLayout';
import { Hero } from '@/sections/home/Hero';
import { About } from '@/sections/home/About';
import { Services } from '@/sections/home/Services';
import { DealingIn } from '@/sections/home/DealingIn';
import { DirectListing } from '@/sections/home/DirectListing';
import { FeaturedProperties } from '@/sections/home/FeaturedProperties';
import { ContactCTA } from '@/sections/home/ContactCTA';

export function Home() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Services />
      <DealingIn />
      <FeaturedProperties />
      <DirectListing />
      <ContactCTA />
    </MainLayout>
  );
}
