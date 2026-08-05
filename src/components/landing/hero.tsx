'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const dynamicWords = ['Edible.', 'On-time.', 'Decent.', 'Actually good.', 'Pay once, eat every day.'];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');

  useEffect(() => {
    const type = () => {
      const fullWord = dynamicWords[wordIndex];
      if (isDeleting) {
        setCurrentWord(fullWord.substring(0, currentWord.length - 1));
      } else {
        setCurrentWord(fullWord.substring(0, currentWord.length + 1));
      }

      if (!isDeleting && currentWord === fullWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentWord === '') {
        setIsDeleting(false);
        setWordIndex((prevIndex) => (prevIndex + 1) % dynamicWords.length);
      }
    };

    const typingSpeed = isDeleting ? 100 : 200;
    const timer = setTimeout(type, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, wordIndex]);

  return (
    <section className="relative w-full bg-primary text-primary-foreground py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span>Lunch that’s</span>
                <br />
                <span className="relative inline-block mt-2">
                  <span className="absolute bottom-0 left-0 w-full h-3/5 bg-accent/80 transform skew-y-[-2deg]"></span>
                  <span className="relative text-black">{currentWord}</span>
                </span>
              </h1>
              <p className="max-w-xl text-lg sm:text-xl text-primary-foreground/90 font-medium leading-relaxed">
                Between back-to-back meetings, Lagos traffic, and late office hours, finding time for a proper meal feels impossible. That’s why 11 to 12 was created for 9 to 5ers.
              </p>
            </div>

            <Button size="lg" asChild variant="secondary" className="h-16 px-10 text-xl font-bold transform transition-transform duration-300 hover:scale-105 bg-background text-foreground hover:bg-background/90 shadow-xl">
              <Link href="#pricing">Feed Me</Link>
            </Button>
          </div>

          {/* Right Column: Hero Image/GIF */}
          <div className="relative h-[350px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transform md:rotate-2 transition-transform duration-500 hover:rotate-0">
             {heroImage && (
                  <Image
                      src={heroImage.imageUrl}
                      alt={heroImage.description}
                      fill
                      className="object-cover"
                      priority
                      unoptimized // Critical for GIF rendering
                      data-ai-hint={heroImage.imageHint}
                  />
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
