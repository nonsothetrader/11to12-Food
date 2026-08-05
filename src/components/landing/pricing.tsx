
'use client';

import { PricingCalculator } from './pricing-calculator';

export function Pricing() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Build Your Perfect Lunch Plan</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              No more rigid tiers. You decide how many meals you need. It's probably cheaper than your daily Gala and Lacasera habit.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl py-12">
          <PricingCalculator />
        </div>
      </div>
    </section>
  );
}
