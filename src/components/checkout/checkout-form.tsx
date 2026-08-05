'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader2, Calendar as CalendarIcon, CheckCircle2, Copy, Banknote, Mail } from 'lucide-react';
import type { CustomPlan } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { processOrder, type ProcessOrderOutput } from '@/ai/flows/process-order-flow';

interface CheckoutFormProps {
  plan: CustomPlan;
}

export function CheckoutForm({ plan }: CheckoutFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [orderResult, setOrderResult] = useState<ProcessOrderOutput | null>(null);

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Process Order via AI for the witty message
      const result = await processOrder({
        firstName,
        lastName,
        email,
        totalCost: plan.totalCost,
        mealCount: plan.totalMeals,
      });
      setOrderResult(result);

      toast({ title: "Details Received!", description: "Follow the payment instructions to confirm." });
      setStep('success');
    } catch (error: any) {
      toast({
        title: `Error`,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Copied to clipboard." });
  };

  if (step === 'success' && orderResult) {
    return (
      <div className="space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
            </div>
            <h3 className="text-2xl font-headline text-primary">Order Pending Payment</h3>
            <div className="bg-muted/50 p-4 rounded-lg italic text-sm text-foreground">
                "{orderResult.invoiceMessage}"
            </div>
        </div>

        <Card className="border-primary/20 shadow-lg">
            <CardHeader className="pb-2 bg-primary/5">
                <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider text-primary">
                    <Banknote className="h-4 w-4" />
                    Payment Instructions
                </CardTitle>
                <CardDescription>Transfer ₦{plan.totalCost.toLocaleString('en-NG')} to the account below:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
                <div className="p-4 bg-secondary rounded-xl space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground uppercase font-bold">Bank</span>
                        <span className="font-bold text-foreground">Opay</span>
                    </div>
                    <div className="flex justify-between items-center border-y py-2 border-primary/10">
                        <span className="text-xs text-muted-foreground uppercase font-bold">Account Number</span>
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-xl font-bold text-primary">0123456789</span>
                            <button className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors" onClick={() => copyToClipboard("0123456789")}>
                                <Copy className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground uppercase font-bold">Account Name</span>
                        <span className="font-bold text-foreground uppercase">11 TO 12 FOODS LTD</span>
                    </div>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 text-sm space-y-4">
                    <p className="font-bold text-primary flex items-center gap-2">
                        <Mail className="h-4 w-4" /> What happens next?
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                        <li className="flex gap-2">
                            <span className="font-bold text-primary">•</span>
                            <span>Check your email (<strong>{email}</strong>) for your detailed invoice and <strong>reply to it with your payment receipt</strong>.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-primary">•</span>
                            <span>Alternatively, send a screenshot of payment to our WhatsApp: <strong>08135180316</strong></span>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-bold text-primary">•</span>
                            <span>Once confirmed, you'll receive a WhatsApp message adding you to our <strong>Client Broadcast List</strong> for daily updates.</span>
                        </li>
                    </ul>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full h-12 font-bold" variant="outline" onClick={() => window.location.href = '/'}>Return Home</Button>
            </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="md:col-span-1 space-y-4">
        <h3 className="font-bold text-lg">Order Summary</h3>
        <Card className="bg-muted/30 border-none shadow-none">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Meals Selected</span>
                <span className="font-bold">{plan.totalMeals}</span>
            </div>
            <Separator />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" /> Selected Dates
              </p>
              <ScrollArea className="h-24 rounded border p-2 bg-background">
                <div className="grid grid-cols-1 gap-1">
                  {plan.selectedDates.sort((a,b) => a.getTime() - b.getTime()).map((date, i) => (
                    <span key={i} className="text-xs">{date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <Separator />
            <div className="flex justify-between items-baseline pt-2">
                <span className="text-muted-foreground font-bold">Total</span>
                <span className="font-headline text-2xl text-primary">₦{plan.totalCost.toLocaleString('en-NG')}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1">
        <form onSubmit={handleSubmitDetails} className="space-y-4">
            <h3 className="font-bold text-lg">Delivery Information</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="Alex" value={firstName} onChange={(e) => setFirstName(e.target.value)} required disabled={isLoading} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} required disabled={isLoading} />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email-checkout">Work Email</Label>
                <Input id="email-checkout" type="email" placeholder="alex.doe@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
            </div>
            <div className="pt-4">
                <Button type="submit" className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20" disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                        "Proceed to Invoice"
                    )}
                </Button>
                <p className="text-[10px] text-center text-muted-foreground mt-4 italic">
                    By clicking, you'll receive your invoice and payment account details.
                </p>
            </div>
        </form>
      </div>
    </div>
  );
}
