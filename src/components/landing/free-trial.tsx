
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, PartyPopper, Sparkles } from 'lucide-react';
import { CountdownTimer } from './countdown-timer';
import { getWittyConfirmation } from '@/ai/flows/witty-confirmation-flow';
import Link from 'next/link';
import { useFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export function FreeTrial() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const { firestore } = useFirebase();


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmationMessage || !firestore) return;

    setIsLoading(true);

    try {
      // Save email to Firestore
      await addDoc(collection(firestore, 'giveaway_entries'), {
        email: email,
        timestamp: serverTimestamp(),
      });
      
      // Get witty confirmation
      const wittyResponse = await getWittyConfirmation({ email });
      setConfirmationMessage(wittyResponse.confirmationMessage);

    } catch (error) {
      console.error("Error saving email or getting confirmation:", error);
      // Fallback message
      setConfirmationMessage(`Alright, ${email}, you're in! But don't quit your day job just yet. Good luck!`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="free-trial" className="w-full py-12 md:py-24 lg:py-32 bg-secondary border-y">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-1 md:gap-16 items-center">
          <div className="space-y-4 text-center">
            {confirmationMessage ? (
                <div className="p-8 rounded-2xl bg-background border-2 border-primary shadow-2xl max-w-lg mx-auto relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10"><Sparkles className="h-12 w-12" /></div>
                    <div className="text-center relative z-10">
                        <PartyPopper className="h-16 w-16 text-primary mx-auto mb-4 animate-bounce" />
                        <h3 className="text-3xl font-headline mb-4">You're on the list!</h3>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg border italic mb-6">
                      <p className="text-foreground font-medium text-lg leading-relaxed">
                          {`"${confirmationMessage}"`}
                      </p>
                    </div>
                    <div className="font-semibold text-primary flex items-start gap-2 p-4 bg-primary/10 rounded-xl mb-6 text-sm">
                        <p>Founding members get priority access and exclusive early-bird rates. Why wait for the lottery?</p>
                    </div>
                    <Button asChild size="lg" className="w-full font-bold text-lg h-14">
                        <Link href="/signup">Build My Real Plan</Link>
                    </Button>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-2">
                        THE HUNGER GAMES: LAGOS EDITION
                    </div>
                    <h2 className="text-4xl font-headline tracking-tighter sm:text-5xl md:text-6xl text-primary">Get a Free Lunch. Seriously.</h2>
                    <div className="flex justify-center py-6">
                      <CountdownTimer />
                    </div>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed mx-auto font-medium">
                      We're giving away premium meals to a few lucky office warriors. Drop your work email below to enter the lottery. No spam, just vibes (and maybe Jollof).
                    </p>
                    <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-8 max-w-md mx-auto">
                        <Input
                            name="email"
                            type="email"
                            placeholder="your.name@company.com"
                            className="h-14 text-lg border-2 focus:border-primary px-6 rounded-xl"
                            required
                            disabled={isLoading}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button type="submit" size="lg" className="h-14 px-8 font-bold text-lg rounded-xl shadow-lg" disabled={isLoading || !email}>
                            {isLoading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                               <>
                                Gimme Food
                                <ArrowRight className="ml-2 h-5 w-5" />
                               </>
                            )}
                        </Button>
                    </form>
                    <p className="text-xs text-muted-foreground pt-4 italic">
                        *By entering, you agree to be playfully insulted by our AI bot.
                    </p>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
