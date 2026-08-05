'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDays, ShoppingCart, Sparkles, CreditCard, ChevronRight, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const MEAL_PRICE = 3700;
const MIN_DAYS = 8;

function PaystackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 252 59" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M250.716 29.5313C250.716 13.5604 237.49 0.334473 221.52 0.334473C205.549 0.334473 192.323 13.5604 192.323 29.5313C192.323 45.5022 205.549 58.7282 221.52 58.7282C237.49 58.7282 250.716 45.5022 250.716 29.5313ZM221.52 48.7513C211.542 48.7513 203.111 40.3204 203.111 30.3429C203.111 20.3653 211.542 11.9344 221.52 11.9344C231.498 11.9344 239.928 20.3653 239.928 30.3429C239.928 40.3204 231.498 48.7513 221.52 48.7513Z" fill="#011B33"></path><path d="M188.049 1.12195V57.9409H177.302V1.12195H188.049Z" fill="#011B33"></path><path d="M167.325 32.4939C171.139 32.4939 173.81 29.7129 173.81 26.2129C173.81 22.7129 171.139 19.9319 167.325 19.9319H156.468V57.9409H167.325C171.868 57.9409 174.649 54.2129 174.649 49.6699C174.649 45.1269 171.868 41.3989 167.325 41.3989H156.468V32.4939H167.325ZM145.821 1.12195V57.9409H156.468V11.1219H167.215C176.545 11.1219 184.449 18.2959 184.449 27.2619C184.449 34.3259 180.301 39.8429 174.871 42.4129V42.5229C181.745 44.5429 185.395 50.4889 185.395 57.9409H174.649C174.649 54.2129 171.868 57.9409 167.325 57.9409H156.468V41.3989H167.325C171.868 41.3989 174.649 45.1269 174.649 49.6699C185.395 49.6699 185.395 36.8799 185.395 27.2619C185.395 18.2959 176.545 11.1219 167.215 11.1219H145.821V1.12195Z" fill="#011B33"></path><path d="M125.719 36.3283L135.049 1.12195H145.795L132.895 43.1683L139.769 57.9409H128.595L124.153 47.1943L119.71 57.9409H108.314L115.41 43.1683L102.51 1.12195H113.256L125.719 36.3283Z" fill="#011B33"></path><path d="M91.9566 1.12195V57.9409H81.2099V1.12195H91.9566Z" fill="#011B33"></path><path d="M59.3204 1.12195V57.9409H48.5737V1.12195H59.3204Z" fill="#011B33"></path><path d="M38.8523 29.5313C38.8523 13.5604 25.6263 0.334473 9.65625 0.334473C-63.1375 0.334473 -19.5397 13.5604 -19.5397 29.5313C-19.5397 45.5022 -6.31375 58.7282 9.65625 58.7282C25.6263 58.7282 38.8523 45.5022 38.8523 29.5313ZM9.65625 48.7513C-0.32125 48.7513 -8.75225 40.3204 -8.75225 30.3429C-8.75225 20.3653 -0.32125 11.9344 9.65625 11.9344C19.6338 11.9344 28.0647 20.3653 28.0647 30.3429C28.0647 40.3204 19.6338 48.7513 9.65625 48.7513Z" fill="#011B33"></path>
    </svg>
  )
}

function FlutterwaveIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg width="24" height="24" viewBox="0 0 448 83" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M129.418 0.901855L87.0391 43.4357L129.418 82.5937H170.812L127.816 40.7118L170.812 0.901855H129.418Z" fill="#011B33"></path><path d="M83.457 41.5979L41.3496 0.901855H0.65332L42.7607 41.5979L0.65332 82.5937H41.3496L83.457 41.5979Z" fill="#011B33"></path><path d="M174.529 82.5937H215.226L174.529 42.1287V82.5937Z" fill="#F5A623"></path><path d="M309.845 23.3671H262.152V60.2266H313.117V46.6067H278.434V37.035H310.38V23.3671H309.845Z" fill="#011B33"></path><path d="M363.303 23.3671H318.883V60.2266H334.863V43.2626L363.303 23.3671ZM334.863 35.0391V23.3671H360.031L334.863 35.0391Z" fill="#011B33"></path><path d="M404.928 23.3671H388.947V60.2266H404.928V46.7906H421.444V60.2266H437.424V23.3671H421.444V36.8511H404.928V23.3671Z" fill="#011B33"></path><path d="M256.744 23.3671H221.012V60.2266H256.744V23.3671ZM237.294 50.1426V33.4511H240.462V50.1426H237.294Z" fill="#011B33"></path>
    </svg>
  )
}

export default function PickPlanPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const { totalCost, isDiscounted } = useMemo(() => {
    const totalMeals = selectedDates.length;
    let total = totalMeals * MEAL_PRICE;
    let discounted = false;

    if (totalMeals > 20) {
      total -= MEAL_PRICE;
      discounted = true;
    }

    return {
      totalCost: total,
      isDiscounted: discounted
    };
  }, [selectedDates]);

  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    const day = date.getDay();
    if (day === 0 || day === 6) return true;
    const isToday = date.toDateString() === new Date().toDateString();
    if (isToday && currentTime.getHours() >= 12) return true;
    return false;
  };

  const handleSelect = (dates: Date[] | undefined) => {
    if (dates) setSelectedDates(dates);
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Payment Successful!",
      description: "You're all set. Welcome to the 11 to 12 family.",
    });
    router.push('/dashboard');
  };

  const isEligible = selectedDates.length >= MIN_DAYS;

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Last Step: Pick Your Plan</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Select at least {MIN_DAYS} days to join the service. The math updates as you tap.
          </p>
        </div>
      </div>

      <Card className="shadow-2xl overflow-hidden border-primary/20 max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-5">
          {/* Calendar Section */}
          <div className="lg:col-span-3 p-6 md:p-8 space-y-6 bg-background border-r">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl">Delivery Schedule</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Tap days to schedule lunch. Today is gated after 12:00 PM.
            </p>
            <div className="flex justify-center p-2 rounded-xl border bg-muted/20">
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={handleSelect}
                disabled={disabledDays}
                className="rounded-md"
                numberOfMonths={1}
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="outline" className={isEligible ? "bg-primary/5 text-primary border-primary/20" : "bg-destructive/5 text-destructive border-destructive/20"}>
                    {selectedDates.length} Days Selected
                </Badge>
                {selectedDates.length > 0 && (
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-[10px] uppercase font-bold"
                        onClick={() => setSelectedDates([])}
                    >
                        Clear All
                    </Button>
                )}
            </div>
          </div>

          {/* Plan Summary Section */}
          <div className="lg:col-span-2 bg-primary/5 p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-headline text-primary">Summary</CardTitle>
                <Badge className={cn("h-8 px-3 text-lg font-headline", isEligible ? "bg-primary" : "bg-destructive")}>
                    {selectedDates.length}
                </Badge>
              </div>
              
              <Separator />

              <div className="space-y-4">
                 <p className="text-sm text-muted-foreground italic">
                  Premium lunch delivered directly to your desk.
                </p>
                {!isEligible && selectedDates.length > 0 && (
                  <div className="flex items-start gap-2 text-destructive font-bold text-xs bg-destructive/10 p-3 rounded border border-destructive/20">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>Oops! We only commit if you do. Select at least {MIN_DAYS} workdays to proceed. ({MIN_DAYS - selectedDates.length} more to go).</span>
                  </div>
                )}
                {isDiscounted && (
                  <div className="flex items-center gap-2 text-green-600 font-bold text-xs bg-green-50 p-2 rounded border border-green-200">
                    <Sparkles className="h-4 w-4" />
                    <span>20+ DAY REWARD: 1 FREE MEAL APPLIED!</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="pt-4 text-right space-y-1">
                <p className="text-muted-foreground text-xs uppercase font-bold tracking-widest">Initial Investment</p>
                <div className="flex flex-col items-end">
                    <p className="text-5xl font-headline text-primary">
                        ₦{totalCost.toLocaleString('en-NG')}
                    </p>
                    {selectedDates.length > 0 && (
                        <p className="text-muted-foreground text-[10px] mt-1 italic">
                            Covers {selectedDates.length} premium meal combos
                        </p>
                    )}
                </div>
              </div>
            </div>

            <div className="pt-8">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button 
                        size="lg" 
                        className="w-full font-bold text-lg shadow-xl shadow-primary/20 h-14"
                        disabled={!isEligible}
                    >
                      <ChevronRight className="mr-2 h-5 w-5" />
                      {isEligible ? "Proceed to Checkout" : `Select ${MIN_DAYS} Days`}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Secure Payment</AlertDialogTitle>
                        <AlertDialogDescription>
                            You're subscribing to {selectedDates.length} meals for ₦{totalCost.toLocaleString('en-NG')}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-4 py-4">
                        <p className="text-sm font-medium">Select a payment method:</p>
                        <div className="flex items-center justify-around p-4 border rounded-md">
                            <CreditCard className="h-8 w-8 text-gray-400" />
                            <PaystackIcon />
                            <FlutterwaveIcon />
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                            You will be redirected to our secure payment partner to complete your purchase.
                        </p>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handlePaymentSuccess}>Pay Now</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {!isEligible && (
                <p className="text-[10px] text-center text-muted-foreground mt-2 italic">
                    * Minimum commitment of {MIN_DAYS} workdays required. Anything less is just a snack.
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
