
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { testimonials } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const companyLogos = [
    { name: 'Paystack', Svg: () => <svg width="150" height="40" viewBox="0 0 252 59" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M250.716 29.5313C250.716 13.5604 237.49 0.334473 221.52 0.334473C205.549 0.334473 192.323 13.5604 192.323 29.5313C192.323 45.5022 205.549 58.7282 221.52 58.7282C237.49 58.7282 250.716 45.5022 250.716 29.5313ZM221.52 48.7513C211.542 48.7513 203.111 40.3204 203.111 30.3429C203.111 20.3653 211.542 11.9344 221.52 11.9344C231.498 11.9344 239.928 20.3653 239.928 30.3429C239.928 40.3204 231.498 48.7513 221.52 48.7513Z" fill="white"></path><path d="M188.049 1.12195V57.9409H177.302V1.12195H188.049Z" fill="white"></path><path d="M167.325 32.4939C171.139 32.4939 173.81 29.7129 173.81 26.2129C173.81 22.7129 171.139 19.9319 167.325 19.9319H156.468V57.9409H167.325C171.868 57.9409 174.649 54.2129 174.649 49.6699C174.649 45.1269 171.868 41.3989 167.325 41.3989H156.468V32.4939H167.325ZM145.821 1.12195V57.9409H156.468V11.1219H167.215C176.545 11.1219 184.449 18.2959 184.449 27.2619C184.449 34.3259 180.301 39.8429 174.871 42.4129V42.5229C181.745 44.5429 185.395 50.4889 185.395 57.9409H174.649C174.649 54.2129 171.868 57.9409 167.325 57.9409H156.468V41.3989H167.325C171.868 41.3989 174.649 45.1269 174.649 49.6699C185.395 49.6699 185.395 36.8799 185.395 27.2619C185.395 18.2959 176.545 11.1219 167.215 11.1219H145.821V1.12195Z" fill="white"></path><path d="M125.719 36.3283L135.049 1.12195H145.795L132.895 43.1683L139.769 57.9409H128.595L124.153 47.1943L119.71 57.9409H108.314L115.41 43.1683L102.51 1.12195H113.256L125.719 36.3283Z" fill="white"></path><path d="M91.9566 1.12195V57.9409H81.2099V1.12195H91.9566Z" fill="white"></path><path d="M59.3204 1.12195V57.9409H48.5737V1.12195H59.3204Z" fill="white"></path><path d="M38.8523 29.5313C38.8523 13.5604 25.6263 0.334473 9.65625 0.334473C-6.31375 0.334473 -19.5397 13.5604 -19.5397 29.5313C-19.5397 45.5022 -6.31375 58.7282 9.65625 58.7282C25.6263 58.7282 38.8523 45.5022 38.8523 29.5313ZM9.65625 48.7513C-0.32125 48.7513 -8.75225 40.3204 -8.75225 30.3429C-8.75225 20.3653 -0.32125 11.9344 9.65625 11.9344C19.6338 11.9344 28.0647 20.3653 28.0647 30.3429C28.0647 40.3204 19.6338 48.7513 9.65625 48.7513Z" fill="white"></path></svg> },
    { name: 'Flutterwave', Svg: () => <svg width="200" height="40" viewBox="0 0 448 83" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M129.418 0.901855L87.0391 43.4357L129.418 82.5937H170.812L127.816 40.7118L170.812 0.901855H129.418Z" fill="white"></path><path d="M83.457 41.5979L41.3496 0.901855H0.65332L42.7607 41.5979L0.65332 82.5937H41.3496L83.457 41.5979Z" fill="white"></path><path d="M174.529 82.5937H215.226L174.529 42.1287V82.5937Z" fill="white"></path><path d="M309.845 23.3671H262.152V60.2266H313.117V46.6067H278.434V37.035H310.38V23.3671H309.845Z" fill="white"></path><path d="M363.303 23.3671H318.883V60.2266H334.863V43.2626L363.303 23.3671ZM334.863 35.0391V23.3671H360.031L334.863 35.0391Z" fill="white"></path><path d="M404.928 23.3671H388.947V60.2266H404.928V46.7906H421.444V60.2266H437.424V23.3671H421.444V36.8511H404.928V23.3671Z" fill="white"></path><path d="M256.744 23.3671H221.012V60.2266H256.744V23.3671ZM237.294 50.1426V33.4511H240.462V50.1426H237.294Z" fill="white"></path></svg> },
    { name: 'Kuda', Svg: () => <svg width="100" height="40" viewBox="0 0 248 84" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M214.398 52.1247C208.762 52.1247 204.342 56.5447 204.342 62.1807C204.342 67.8167 208.762 72.2367 214.398 72.2367C220.034 72.2367 224.454 67.8167 224.454 62.1807C224.454 56.5447 220.034 52.1247 214.398 52.1247ZM214.398 83.2167C202.662 83.2167 193.362 73.9167 193.362 62.1807C193.362 50.4447 202.662 41.1447 214.398 41.1447C226.134 41.1447 235.434 50.4447 235.434 62.1807C235.434 73.9167 226.134 83.2167 214.398 83.2167Z" fill="white"></path><path d="M247.534 41.6967V82.6647H237.014V41.6967H247.534Z" fill="white"></path><path d="M182.012 51.5727L178.612 41.6967H189.682L174.572 82.6647H162.242L177.352 41.6967H166.282L162.882 51.5727L152.912 41.6967H163.982L179.742 82.6647H192.072L176.312 41.6967H200.042V30.7167H150.122V41.6967H150.122L150.122 41.6967L150.122 41.6967L150.122 41.6967L150.122 41.6967L150.122 41.6967L182.012 51.5727Z" fill="white"></path><path d="M115.895 41.6967L130.655 82.6647H118.495L115.095 72.7887H98.6648L95.2648 82.6647H83.1048L97.8648 41.6967H115.895ZM106.885 50.0487C106.885 50.0487 101.995 64.0927 101.445 65.6527H112.335L106.885 50.0487Z" fill="white"></path><path d="M47.7942 41.6967V82.6647H36.6942L57.1942 41.6967H72.8842V82.6647H61.9042V52.0047L47.7942 82.6647V41.6967Z" fill="white"></path><path d="M30.4109 41.6967V82.6647H19.4309V41.6967H30.4109Z" fill="white"></path><path d="M4.6853 41.1447L4.6853 41.1447C-7.0507 41.1447 -16.3507 50.4447 -16.3507 62.1807C-16.3507 73.9167 -7.0507 83.2167 4.6853 83.2167C16.4213 83.2167 25.7213 73.9167 25.7213 62.1807C25.7213 50.4447 16.4213 41.1447 4.6853 41.1447ZM4.6853 52.1247C10.3213 52.1247 14.7413 56.5447 14.7413 62.1807C14.7413 67.8167 10.3213 72.2367 4.6853 72.2367C-0.950703 72.2367 -5.3707 67.8167 -5.3707 62.1807C-5.3707 56.5447 -0.950703 52.1247 4.6853 52.1247Z" fill="white"></path><path d="M12.9103 0.666016H-3.5997C-3.5997 0.666016 -3.5997 18.557 -3.5997 22.846C-3.5997 27.135 0.559297 31.026 4.6853 31.026C8.8113 31.026 12.9103 27.135 12.9103 22.846C12.9103 18.557 12.9103 0.666016 12.9103 0.666016Z" fill="white"></path></svg> },
    { name: 'Interswitch', Svg: () => <svg width="200" height="40" viewBox="0 0 162 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M60.2013 16.0396C60.2013 7.63259 53.6083 1 45.2413 1C36.8743 1 30.2813 7.63259 30.2813 16.0396C30.2813 24.4466 36.8743 31.0792 45.2413 31.0792C53.6083 31.0792 60.2013 24.4466 60.2013 16.0396ZM45.2413 25.5976C40.2973 25.5976 36.2413 21.4116 36.2413 16.4256C36.2413 11.4396 40.2973 7.25359 45.2413 7.25359C50.1853 7.25359 54.2413 11.4396 54.2413 16.4256C54.2413 21.4116 50.1853 25.5976 45.2413 25.5976Z" fill="white"></path><path d="M63.0233 1.78613H69.4673V30.3651H63.0233V1.78613Z" fill="white"></path><path d="M102.618 20.3705L108.624 1.78613H115.506L100.206 30.3651H93.1503L99.1563 11.6091L87.8163 30.3651H81.0843L94.9203 5.43213L81.0843 1.78613H87.8163L99.7923 20.3705L102.618 20.3705Z" fill="white"></path><path d="M139.734 22.8631L134.424 30.3651H127.374L135.372 18.6771L126.126 7.42113L135.066 1.78613H141.072L131.292 13.9071L142.194 22.8631H139.734Z" fill="white"></path><path d="M161.416 1.78613H155.122L144.22 10.5891V1.78613H142.194H137.94V30.3651H144.22V21.4071L155.122 30.3651H161.416V1.78613Z" fill="white"></path><path d="M72.0643 1.78613H78.5083V30.3651H72.0643V1.78613Z" fill="white"></path><path d="M27.2587 1.78613H20.8147V30.3651H27.2587V1.78613Z" fill="white"></path><path d="M13.8967 1.78613H-0.00134277V8.11313H5.76066V30.3651H12.2047V8.11313H18.1147V1.78613H13.8967Z" fill="white"></path></svg> },
];

function WavySeparator() {
    return (
        <svg width="100%" height="25" viewBox="0 0 1440 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 12.5C240 12.5 240 25 480 25C720 25 720 0 960 0C1200 0 1200 12.5 1440 12.5" stroke="hsl(var(--secondary))" strokeWidth="2"/>
        </svg>
    );
}

function WavyLine() {
  return (
    <svg width="68" height="6" viewBox="0 0 68 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.70404 3.125C13.204 3.125 13.204 5.25 23.704 5.25C34.204 5.25 34.204 0.75 44.704 0.75C55.204 0.75 55.204 3.125 65.704 3.125" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground relative">
      <div className="absolute top-0 left-0 w-full">
        <WavySeparator />
      </div>
       <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 relative">
        <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">People Tolerate Us</h2>
            <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Look, some people don't hate our food. Here's proof from professionals who are probably just as tired as you are.
            </p>
        </div>

        <Carousel className="w-full max-w-2xl mx-auto" opts={{ loop: testimonials.length > 1 }}>
            <CarouselContent>
                {testimonials.map((testimonial, index) => {
                    const image = PlaceHolderImages.find(img => img.id === testimonial.avatar.id);
                    return (
                    <CarouselItem key={index}>
                        <div className="p-4">
                        <Card className="bg-transparent border-none shadow-none text-primary-foreground">
                            <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                                {image && (
                                <Image
                                    src={image.imageUrl}
                                    alt={`Avatar of ${testimonial.name}`}
                                    width={120}
                                    height={120}
                                    className="rounded-full border-4 border-primary-foreground/50 object-cover"
                                    data-ai-hint={testimonial.avatar.hint}
                                />
                                )}
                                <p className="text-xl md:text-2xl font-semibold">"{testimonial.quote}"</p>
                                <p className="font-medium">- {testimonial.name}</p>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    );
                })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary-foreground text-primary hover:bg-primary-foreground/90" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary-foreground text-primary hover:bg-primary-foreground/90" />
        </Carousel>
        
        <div className="mt-12">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70">
                {companyLogos.map(logo => (
                    <div key={logo.name}>
                        <logo.Svg />
                    </div>
                ))}
            </div>
        </div>

      </div>
      <div className="absolute bottom-0 left-0 w-full rotate-180">
        <WavySeparator />
      </div>
    </section>
  );
}
