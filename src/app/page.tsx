
'use client';

import * as React from 'react';
import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { WeeklyMenuPreview } from '@/components/landing/weekly-menu-preview';
import { Testimonials } from '@/components/landing/testimonials';
import { Pricing } from '@/components/landing/pricing';
import { FreeTrial } from '@/components/landing/free-trial';
import { Faq } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';

/**
 * The root page of the application, now serving as the Main Marketing Landing Page.
 */
export default function LandingHomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <WeeklyMenuPreview />
        <Pricing />
        <FreeTrial />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
