'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFirebase } from '@/firebase';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { doc, serverTimestamp } from 'firebase/firestore';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  occupation: z.string().optional(),
  workSchedule: z.string().optional(),
  workLocation: z.string().optional(),
  residenceArea: z.string().optional(),
  company: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function CompleteProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const { user, isUserLoading, firestore } = useFirebase();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      gender: '',
      dateOfBirth: '',
      occupation: '',
      workSchedule: '',
      workLocation: '',
      residenceArea: '',
      company: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (!isUserLoading && !user) {
        toast({
            title: 'Session Expired',
            description: 'Please start the signup process again.',
            variant: 'destructive'
        })
        router.push('/signup');
    }
  }, [user, isUserLoading, router, toast]);

  async function onSubmit(data: ProfileFormValues) {
    if (!user || !firestore || !email) {
        toast({
            title: 'Error',
            description: 'Session is invalid. Please start over.',
            variant: 'destructive'
        });
        router.push('/signup');
        return;
    }
    
    const userProfileData = {
        id: user.uid,
        email: email,
        name: data.fullName,
        subscriptionPlanId: 'none',
        createdAt: serverTimestamp(),
        ...data,
    };

    const profileRef = doc(firestore, `users/${user.uid}/profile/${user.uid}`);
    setDocumentNonBlocking(profileRef, userProfileData, { merge: true });

    toast({
      title: 'Awesome! Your details have been saved.',
      description: 'Now, let’s get you subscribed to your first meal plan.',
    });

    router.push('/signup/pick-plan');
  }

  if (isUserLoading || !user) {
      return (
        <div className="flex h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
      )
  }

  return (
    <Card className="w-full max-w-2xl my-8">
        <CardHeader>
            <CardTitle>Let us know you</CardTitle>
            <CardDescription>We just want to know who we’re cooking for. Fill this out, and let's get you sorted.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Section 1 */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">About You</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                             <FormField control={form.control} name="fullName" render={({ field }) => (
                                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Alex Doe" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input disabled value={email} /></FormControl></FormItem>
                        </div>
                         <div className="grid sm:grid-cols-2 gap-4">
                             <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                                <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="(for delivery or confirmation)" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                             <FormField control={form.control} name="gender" render={({ field }) => (
                                <FormItem><FormLabel>Gender</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                            )}/>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                                <FormItem><FormLabel>Date of Birth (Optional)</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="occupation" render={({ field }) => (
                                <FormItem><FormLabel>Occupation</FormLabel><FormControl><Input placeholder="e.g., Product Designer" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                         <div className="grid sm:grid-cols-2 gap-4">
                             <FormField control={form.control} name="workSchedule" render={({ field }) => (
                                <FormItem><FormLabel>Work Schedule</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="9-5">9–5</SelectItem><SelectItem value="hybrid">Hybrid</SelectItem><SelectItem value="remote">Remote</SelectItem><SelectItem value="student">Student</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                            )}/>
                             <FormField control={form.control} name="company" render={({ field }) => (
                                <FormItem><FormLabel>Company (Optional)</FormLabel><FormControl><Input placeholder="e.g., Google" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                           <FormField control={form.control} name="workLocation" render={({ field }) => (
                                <FormItem><FormLabel>Work/Hub Location</FormLabel><FormControl><Input placeholder="e.g., The Orchard Hub, Lekki" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                             <FormField control={form.control} name="residenceArea" render={({ field }) => (
                                <FormItem><FormLabel>Residence Area</FormLabel><FormControl><Input placeholder="e.g., Ikeja GRA" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Saving...' : 'Submit & Pick a Plan'}
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
