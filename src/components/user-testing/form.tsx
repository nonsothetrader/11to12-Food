'use client';

import { useState, useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { PartyPopper, Plus, Minus } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Label } from '@/components/ui/label';
import { Badge } from '../ui/badge';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const MEAL_PRICE = 3700;

const step1Schema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required.' }),
  email: z.string().email({ message: 'A valid email is required.' }),
  whatsappNumber: z.string().min(10, { message: 'A valid WhatsApp number is required.' }),
  occupation: z.string().min(2, { message: 'Occupation is required.' }),
  workLocation: z.string().min(3, { message: 'Work location is required.' }),
});

const step2Schema = z.object({
  mealTypes: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one meal type.",
  }),
  spiceLevel: z.string({ required_error: 'Please select your preferred spice level.' }),
  proteins: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one protein.",
  }),
});

const step3Schema = z.object({
  totalMeals: z.number().min(1, { message: "Please select at least one meal." }),
  isGoodDeal: z.string({ required_error: "Be honest, we can take it." }),
});


const combinedSchema = step1Schema.merge(step2Schema).merge(step3Schema);
type FormValues = z.infer<typeof combinedSchema>;

const mealTypes = [
  { id: 'rice-based', label: 'Rice-based' },
  { id: 'pasta', label: 'Pasta' },
  { id: 'swallow', label: 'Swallow' },
  { id: 'light-meal', label: 'Light Meal' },
];

const proteins = [
  { id: 'chicken', label: 'Chicken' },
  { id: 'fish', label: 'Fish' },
  { id: 'beef', label: 'Beef' },
  { id: 'turkey', label: 'Turkey' },
];

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

type DayMealCount = {
    [key: string]: number;
}

const steps = [
  { id: 'Step 1', title: 'Your Vitals', schema: step1Schema, fields: ['fullName', 'email', 'whatsappNumber', 'occupation', 'workLocation'] },
  { id: 'Step 2', title: 'Your Taste', schema: step2Schema, fields: ['mealTypes', 'spiceLevel', 'proteins'] },
  { id: 'Step 3', title: 'Edit Your Food Plan', schema: step3Schema, fields: ['totalMeals', 'isGoodDeal'] },
];

export function UserTestingForm() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [deliveryDaysCount, setDeliveryDaysCount] = useState(1);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday']);
  const [dayMealCounts, setDayMealCounts] = useState<DayMealCount>({'Monday': 1});
  const [numberOfWeeks, setNumberOfWeeks] = useState(4);


  const form = useForm<FormValues>({
    resolver: zodResolver(steps[currentStep].schema),
    defaultValues: {
      fullName: '',
      email: '',
      whatsappNumber: '',
      occupation: '',
      workLocation: '',
      mealTypes: [],
      proteins: [],
      spiceLevel: '',
      totalMeals: 1,
      isGoodDeal: undefined,
    },
    mode: 'onChange',
  });
  
  const totalWeeklyMeals = useMemo(() => {
    return Object.values(dayMealCounts).reduce((sum, count) => sum + count, 0);
  }, [dayMealCounts]);
  
  useEffect(() => {
    form.setValue('totalMeals', totalWeeklyMeals, { shouldValidate: true });
  }, [totalWeeklyMeals, form]);

  const { totalCost } = useMemo(() => {
    const weekly = totalWeeklyMeals * MEAL_PRICE;
    const total = weekly * numberOfWeeks;
    
    return {
      totalCost: total,
    };
  }, [totalWeeklyMeals, numberOfWeeks]);


  const handleDeliveryDaysChange = (increment: number) => {
    const newCount = Math.max(1, Math.min(6, deliveryDaysCount + increment));
    setDeliveryDaysCount(newCount);

    if (newCount < selectedDays.length) {
        const sortedSelectedDays = [...selectedDays].sort((a,b) => weekdays.indexOf(a) - weekdays.indexOf(b));
        const newSelectedDays = sortedSelectedDays.slice(0, newCount);
        setSelectedDays(newSelectedDays);
        const newMealCounts = { ...dayMealCounts };
        Object.keys(newMealCounts).forEach(day => {
            if (!newSelectedDays.includes(day)) {
                delete newMealCounts[day];
            }
        });
        setDayMealCounts(newMealCounts);
    }
  }

  const handleDayToggle = (day: string) => {
    let newSelectedDays;
    const newMealCounts = { ...dayMealCounts };

    if (selectedDays.includes(day)) {
        newSelectedDays = selectedDays.filter(d => d !== day);
        delete newMealCounts[day];
    } else {
        if (selectedDays.length >= deliveryDaysCount) return;
        newSelectedDays = [...selectedDays, day];
        newMealCounts[day] = 1; 
    }
    
    setSelectedDays(newSelectedDays);
    setDayMealCounts(newMealCounts);
  }
  
  const handleMealCountChange = (day: string, increment: number) => {
    const newCount = Math.max(1, (dayMealCounts[day] || 0) + increment);
    setDayMealCounts({ ...dayMealCounts, [day]: newCount });
  }
  
  const handleWeeksChange = (increment: number) => {
    setNumberOfWeeks(prev => Math.max(1, prev + increment));
  }

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as any, { shouldFocus: true });
    if (!output) return;

    if (currentStep === steps.length - 1) {
        await form.handleSubmit(onSubmit)();
    } else {
        setCurrentStep(prev => prev + 1);
    }
  };

  const prev = () => setCurrentStep(prev => prev - 1);

  const onSubmit = (data: FormValues) => {
    const finalData = {
        ...data,
        customPlan: {
            deliveryDays: selectedDays,
            mealsPerDay: dayMealCounts,
            totalWeeklyMeals: totalWeeklyMeals,
            numberOfWeeks: numberOfWeeks,
            totalCost: totalCost,
        }
    }
    console.log('Form data submitted:', finalData);
    toast({
      title: 'Feedback Received!',
      description: "Thanks for helping us out. We'll be in touch soon!",
    });
    setFormSubmitted(true);
  };
  
  if (formSubmitted) {
      return (
          <Card className="w-full max-w-2xl">
              <CardHeader className="text-center">
                <PartyPopper className="mx-auto h-12 w-12 text-primary" />
                <CardTitle>You're Awesome!</CardTitle>
                <CardDescription>Thank you for your feedback. We've saved your details and will notify you with a special launch discount.</CardDescription>
              </CardHeader>
          </Card>
      )
  }

  return (
    <>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <Progress value={(currentStep + 1) * 33.33} className="mb-4" />
          <CardTitle>{steps[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                  {currentStep === 0 && (
                    <motion.div
                        key={0}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Alex Doe" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="alex.doe@workplace.com" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <FormField control={form.control} name="whatsappNumber" render={({ field }) => (
                            <FormItem><FormLabel>WhatsApp Number</FormLabel><FormControl><Input placeholder="e.g. 08012345678" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="occupation" render={({ field }) => (
                            <FormItem><FormLabel>Occupation</FormLabel><FormControl><Input placeholder="e.g., Product Designer" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                        <div className="grid sm:grid-cols-1 gap-4">
                            <FormField control={form.control} name="workLocation" render={({ field }) => (
                            <FormItem><FormLabel>Work/Hub Location</FormLabel><FormControl><Input placeholder="e.g., The Orchard Hub, Lekki" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 1 && (
                    <motion.div
                        key={1}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-6">
                        <FormField control={form.control} name="mealTypes" render={() => (
                            <FormItem><FormLabel>Meal Type Preference</FormLabel><FormDescription>What do you usually go for?</FormDescription>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                            {mealTypes.map((item) => (<FormField key={item.id} control={form.control} name="mealTypes" render={({ field }) => {
                                return (<FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0"><FormControl><Checkbox checked={field.value?.includes(item.id)} onCheckedChange={(checked) => {
                                    return checked ? form.setValue('mealTypes', [...(field.value ?? []), item.id]) : form.setValue('mealTypes', field.value?.filter((value) => value !== item.id) ?? [])
                                }} /></FormControl><FormLabel className="font-normal">{item.label}</FormLabel></FormItem>)
                            }} />))}
                            </div><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="spiceLevel" render={({ field }) => (
                            <FormItem><FormLabel>Spice Level</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="How hot do you like it?" /></SelectTrigger></FormControl><SelectContent><SelectItem value="mild">Mild</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="hot">Hot</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="proteins" render={() => (
                            <FormItem><FormLabel>Favorite Protein</FormLabel><FormDescription>Pick your power-up.</FormDescription>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                            {proteins.map((item) => (<FormField key={item.id} control={form.control} name="proteins" render={({ field }) => {
                                return (<FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0"><FormControl><Checkbox checked={field.value?.includes(item.id)} onCheckedChange={(checked) => {
                                    return checked ? form.setValue('proteins', [...(field.value ?? []), item.id]) : form.setValue('proteins', field.value?.filter((value) => value !== item.id) ?? [])
                                }} /></FormControl><FormLabel className="font-normal">{item.label}</FormLabel></FormItem>)
                            }} />))}
                            </div><FormMessage /></FormItem>
                        )}/>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                        key={2}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <FormLabel>Days per week?</FormLabel>
                                <div className="flex items-center gap-4">
                                    <Button type="button" variant="outline" size="icon" onClick={() => handleDeliveryDaysChange(-1)}><Minus/></Button>
                                    <span className="text-xl font-bold w-10 text-center">{deliveryDaysCount}</span>
                                    <Button type="button" variant="outline" size="icon" onClick={() => handleDeliveryDaysChange(1)}><Plus/></Button>
                                </div>
                            </div>
                             <div className="space-y-2">
                                <FormLabel>Number of weeks?</FormLabel>
                                <div className="flex items-center gap-4">
                                    <Button type="button" variant="outline" size="icon" onClick={() => handleWeeksChange(-1)}><Minus/></Button>
                                    <span className="text-xl font-bold w-10 text-center">{numberOfWeeks}</span>
                                    <Button type="button" variant="outline" size="icon" onClick={() => handleWeeksChange(1)}><Plus/></Button>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <FormLabel>Select your delivery days</FormLabel>
                            <FormDescription>{selectedDays.length} / {deliveryDaysCount} selected</FormDescription>
                            <div className="grid grid-cols-3 gap-2 pt-2">
                                {weekdays.map(day => (
                                    <div key={day} className="flex items-center space-x-2">
                                        <Checkbox 
                                            id={day} 
                                            checked={selectedDays.includes(day)} 
                                            onCheckedChange={() => handleDayToggle(day)}
                                            disabled={!selectedDays.includes(day) && selectedDays.length >= deliveryDaysCount}
                                        />
                                        <Label htmlFor={day} className={cn("font-normal", (!selectedDays.includes(day) && selectedDays.length >= deliveryDaysCount) && "text-muted-foreground")}>{day}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <FormLabel>How many meals do you want to receive per delivery?</FormLabel>
                            {selectedDays.length > 0 ? selectedDays.sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b)).map(day => (
                                <div key={day} className="flex items-center justify-between">
                                    <Label>{day}</Label>
                                    <div className="flex items-center gap-4">
                                        <Button type="button" variant="outline" size="icon" onClick={() => handleMealCountChange(day, -1)}><Minus/></Button>
                                        <span className="text-lg font-bold w-8 text-center">{dayMealCounts[day] || 0}</span>
                                        <Button type="button" variant="outline" size="icon" onClick={() => handleMealCountChange(day, 1)}><Plus/></Button>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-sm text-muted-foreground text-center py-4">Select at least one delivery day above.</p>
                            )}
                        </div>

                        <Separator />

                        <div className="p-4 bg-muted rounded-lg space-y-2">
                            <h3 className="font-bold text-center">Your Estimated Plan</h3>
                            <div className="text-center md:text-right">
                                <p className="text-muted-foreground">Total for {totalWeeklyMeals * numberOfWeeks} meals over {numberOfWeeks} weeks</p>
                                <p className="text-2xl font-bold text-primary">₦{totalCost.toLocaleString('en-NG')}</p>
                                 <p className="text-muted-foreground text-sm">({totalWeeklyMeals} meals per week)</p>
                            </div>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="isGoodDeal"
                          render={({ field }) => (
                            <FormItem className="space-y-3 rounded-lg border p-4">
                              <FormLabel className="text-base">Be honest, does this price feel right for the plan you've built?</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="yes-perfect" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Yes, it's a perfect deal</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="maybe-a-bit-high" />
                                    </FormControl>
                                    <FormLabel className="font-normal">It's a little high, but maybe</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="no-too-expensive" />
                                    </FormControl>
                                    <FormLabel className="font-normal">No, that's too expensive for me</FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />


                        <FormField control={form.control} name="totalMeals" render={() => <FormMessage className="text-center" />} />
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="ghost" onClick={prev} disabled={currentStep === 0}>
                  Go Back
                </Button>
                <Button type="button" onClick={next}>
                    {currentStep === steps.length - 1 ? 'Submit Feedback' : 'Next Step'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
    </>
  );
}
