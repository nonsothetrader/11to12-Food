
import { ClipboardList, Truck, UtensilsCrossed } from 'lucide-react';
import { howItWorksSteps } from '@/lib/data';

const icons = [
  <ClipboardList key="1" className="h-10 w-10" />,
  <Truck key="2" className="h-10 w-10" />,
  <UtensilsCrossed key="3" className="h-10 w-10" />,
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--primary-darker))_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary-foreground/20 px-3 py-1 text-sm">How This Works</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Escape Your Lunch Rut</h2>
            <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              It’s not rocket science. It's just lunch. Here’s the ridiculously simple process to get started.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-12 py-12 lg:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <div key={step.step} className="flex flex-col items-center text-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-foreground/20 animate-float">
                {icons[index]}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-primary-foreground/90">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
