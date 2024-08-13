'use client';
import CourseSection from '@/components/webpage/CourseSection';
import { Footer } from '@/components/webpage/Footer';
import Hero from '@/components/webpage/Hero';
import LearnSection from '@/components/webpage/LearnSection';
import MooveBannerSection from '@/components/webpage/MooveBannerSection';
import PartnersSection from '@/components/webpage/PartnersSection';
import TeamSection from '@/components/webpage/TeamSection';
import { Header } from '@/components/webpage/Header';

export default function Home() {
  return (
    <>
      {/* TODO:
        - Add background image to hero
        - Modify autoplay with scrolling focus
        - Modify the banner with figma design then logo wrapped and gradient 
        - Update addresses and social links
        - Fitting content descriptions for the site
        - Update partners' logo
      */}
      <Header />
      <Hero />
      <LearnSection />
      <CourseSection />
      <TeamSection />
      <MooveBannerSection />
      <PartnersSection />
      <Footer />
    </>
  );
}
