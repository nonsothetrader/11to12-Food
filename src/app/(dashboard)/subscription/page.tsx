
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, Download, ExternalLink } from 'lucide-react';
import { userProfile, billingHistory, pricingPlans } from '@/lib/data';
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
import { useToast } from '@/hooks/use-toast';

export default function SubscriptionPage() {
  const currentPlan = pricingPlans.find(plan => plan.name === 'Pro');
  const { toast } = useToast();

  const handleCancelSubscription = () => {
    toast({
        title: 'Subscription Canceled',
        description: 'Your subscription has been canceled and will not renew.',
        variant: 'destructive',
    });
  }

  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Subscription</h1>
        <p className="text-muted-foreground">Manage your billing and subscription plan.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
           <Card>
                <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>You are currently on the {currentPlan?.name} plan.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {currentPlan && (
                    <div className="p-4 rounded-md bg-secondary flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold flex items-center gap-2">{currentPlan.name} <Badge>Active</Badge></h3>
                            <p className="text-muted-foreground">{currentPlan.price}</p>
                            <ul className="mt-4 space-y-2 text-sm">
                                {currentPlan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary" />
                                    <span>{feature}</span>
                                </li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground">Next payment on Jul 30, 2024</p>
                         </div>
                    </div>
                    )}
                </CardContent>
            </Card>

           <Card>
                <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>Review your past payments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                    {billingHistory.map(item => (
                        <li key={item.id} className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Payment for {item.date}</p>
                                <p className="text-sm text-muted-foreground">Invoice #{item.invoiceId}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="font-semibold">{item.amount}</p>
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2" />
                                    PDF
                                </Button>
                            </div>
                        </li>
                    ))}
                    </ul>
                </CardContent>
           </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center gap-4 p-3 rounded-md border">
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                        <div>
                            <p className="font-semibold">Visa **** 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/26</p>
                        </div>
                    </div>
                    <Button variant="link" className="p-0 h-auto">
                        Update payment method <ExternalLink className="ml-2" />
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Manage Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button className="w-full">Change Plan</Button>
                    <Separator />
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full">Cancel Subscription</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                            <AlertDialogDescription>
                            Your subscription will be active until the end of the current billing period. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                            <AlertDialogAction onClick={handleCancelSubscription}>Yes, Cancel</AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
