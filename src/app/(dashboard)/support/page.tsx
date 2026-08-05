
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const supportFormSchema = z.object({
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters long.',
  }),
  category: z.enum(['billing', 'delivery', 'meal-quality', 'technical'], {
    required_error: "You need to select a category.",
  }),
  message: z.string().min(20, {
    message: 'Message must be at least 20 characters long.',
  }),
});

type SupportFormValues = z.infer<typeof supportFormSchema>;

export default function SupportPage() {
  const { toast } = useToast();
  
  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    mode: 'onChange',
  });

  function onSubmit(data: SupportFormValues) {
    toast({
      title: 'Support Ticket Submitted!',
      description: 'Thank you for your feedback. Our team will get back to you shortly.',
    });
    form.reset({ subject: '', message: '', category: undefined });
  }

  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
        <div>
            <h1 className="text-3xl font-bold">Support & Feedback</h1>
            <p className="text-muted-foreground">Have an issue or a suggestion? Let us know!</p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Submit a New Ticket</CardTitle>
                <CardDescription>Our team typically responds within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel>What is this about?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="billing" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Billing</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="delivery" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Delivery</FormLabel>
                                    </FormItem>
                                     <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="meal-quality" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Meal Quality</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="technical" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Technical Issue</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Late Delivery on Tuesday" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Please describe your issue in detail..."
                                        className="resize-y min-h-[150px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Send Message</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
