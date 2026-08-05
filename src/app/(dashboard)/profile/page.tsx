
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { userProfile } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  deliveryAddress: z.string().min(10, { message: 'Please enter a complete address.' }),
  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
  occupation: z.string().optional(),
  workSchedule: z.string().optional(),
  lunchTime: z.string().optional(),
  spiceLevel: z.string().optional(),
  mealTypes: z.array(z.string()).optional(),
  proteins: z.array(z.string()).optional(),
  dislikes: z.string().optional(),
  lunchHabit: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const mealTypes = [
  { id: 'rice-based', label: 'Rice-based' },
  { id: 'pasta', label: 'Pasta' },
  { id: 'swallow', label: 'Swallow' },
  { id: 'light-meal', label: 'Light Meal' },
  { id: 'beans', label: 'Beans' },
];

const proteins = [
  { id: 'chicken', label: 'Chicken' },
  { id: 'fish', label: 'Fish' },
  { id: 'turkey', label: 'Turkey' },
  { id: 'beef', label: 'Beef' },
  { id: 'egg', label: 'Egg' },
];

export default function ProfilePage() {
  const { toast } = useToast();
  
  const defaultValues: Partial<ProfileFormValues> = {
    fullName: userProfile.name,
    email: userProfile.email,
    deliveryAddress: userProfile.deliveryAddress,
    mealTypes: ['rice-based', 'pasta'],
    proteins: ['chicken', 'beef'],
    spiceLevel: 'medium',
    lunchTime: '12:00-or-after',
    workSchedule: '9-5',
    lunchHabit: 'work',
  };
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'Profile Updated!',
      description: 'Your changes and taste preferences have been saved.',
    });
  }

  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
        <div>
            <h1 className="text-3xl font-bold">My Profile & Taste</h1>
            <p className="text-muted-foreground">Manage how we cook and deliver for you.</p>
        </div>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Basic details for delivery and identification.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <FormField control={form.control} name="fullName" render={({ field }) => (
                                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Alex Doe" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>Email</FormLabel><FormControl><Input disabled type="email" {...field} /></FormControl></FormItem>
                            )}/>
                        </div>
                        <FormField control={form.control} name="deliveryAddress" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Primary Delivery Address</FormLabel>
                                <FormControl><Textarea placeholder="123 Fresh Lane, Foodie City, 12345" className="resize-none" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <div className="grid sm:grid-cols-3 gap-4">
                             <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                                <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="080..." {...field} /></FormControl></FormItem>
                            )}/>
                             <FormField control={form.control} name="workSchedule" render={({ field }) => (
                                <FormItem><FormLabel>Work Schedule</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="9-5">9–5</SelectItem><SelectItem value="hybrid">Hybrid</SelectItem><SelectItem value="remote">Remote</SelectItem></SelectContent></Select></FormItem>
                            )}/>
                             <FormField control={form.control} name="lunchHabit" render={({ field }) => (
                                <FormItem><FormLabel>Eating Habit</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="work">At the Office</SelectItem><SelectItem value="home">At Home</SelectItem><SelectItem value="both">Flexible</SelectItem></SelectContent></Select></FormItem>
                            )}/>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Taste DNA</CardTitle>
                        <CardDescription>Tell our kitchen exactly how you like your food.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <FormField control={form.control} name="spiceLevel" render={({ field }) => (
                                <FormItem><FormLabel>Spice Level</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="mild">Mild (Safe)</SelectItem><SelectItem value="medium">Medium (Nigerian Standard)</SelectItem><SelectItem value="hot">Hot (Fire)</SelectItem></SelectContent></Select></FormItem>
                            )}/>
                            <FormField control={form.control} name="lunchTime" render={({ field }) => (
                                <FormItem><FormLabel>Preferred Delivery Window</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="11:00">11:00 AM</SelectItem><SelectItem value="11:30">11:30 AM</SelectItem><SelectItem value="12:00-or-after">12:00 PM or after</SelectItem></SelectContent></Select></FormItem>
                            )}/>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                             <FormField control={form.control} name="mealTypes" render={() => (
                                <FormItem><FormLabel>Meal Type Preference</FormLabel>
                                <div className="grid grid-cols-2 gap-2 pt-2">
                                {mealTypes.map((item) => (<FormField key={item.id} control={form.control} name="mealTypes" render={({ field }) => {
                                    return (<FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0"><FormControl><Checkbox checked={field.value?.includes(item.id)} onCheckedChange={(checked) => {
                                        return checked ? field.onChange([...(field.value ?? []), item.id]) : field.onChange(field.value?.filter((value) => value !== item.id))
                                    }} /></FormControl><FormLabel className="font-normal">{item.label}</FormLabel></FormItem>)
                                }} />))}
                                </div></FormItem>
                            )}/>
                             <FormField control={form.control} name="proteins" render={() => (
                                <FormItem><FormLabel>Protein Preference</FormLabel>
                                <div className="grid grid-cols-2 gap-2 pt-2">
                                {proteins.map((item) => (<FormField key={item.id} control={form.control} name="proteins" render={({ field }) => {
                                    return (<FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0"><FormControl><Checkbox checked={field.value?.includes(item.id)} onCheckedChange={(checked) => {
                                        return checked ? field.onChange([...(field.value ?? []), item.id]) : field.onChange(field.value?.filter((value) => value !== item.id))
                                    }} /></FormControl><FormLabel className="font-normal">{item.label}</FormLabel></FormItem>)
                                }} />))}
                                </div></FormItem>
                            )}/>
                        </div>
                        
                        <FormField control={form.control} name="dislikes" render={({ field }) => (
                            <FormItem><FormLabel>Any specific dislikes?</FormLabel><FormControl><Input placeholder="e.g., I don’t like onions or crayfish" {...field} /></FormControl><FormDescription>We'll try our best to accommodate these in your meals.</FormDescription></FormItem>
                        )}/>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">Update My Taste Profile</Button>
                </div>
            </form>
        </Form>
    </div>
  );
}
