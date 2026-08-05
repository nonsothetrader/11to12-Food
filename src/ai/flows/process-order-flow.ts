'use server';

/**
 * @fileOverview Processes a guest checkout and generates a witty invoice/payment summary.
 *
 * - processOrder - A function that handles the order processing.
 * - ProcessOrderInput - The input type for the processOrder function.
 * - ProcessOrderOutput - The return type for the processOrder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessOrderInputSchema = z.object({
  firstName: z.string().describe('The user\'s first name.'),
  lastName: z.string().describe('The user\'s last name.'),
  email: z.string().describe('The user\'s email address.'),
  totalCost: z.number().describe('The total cost of the meal plan.'),
  mealCount: z.number().describe('The number of meals selected.'),
});
export type ProcessOrderInput = z.infer<typeof ProcessOrderInputSchema>;

const ProcessOrderOutputSchema = z.object({
  invoiceMessage: z.string().describe('A witty, savage summary of the invoice.'),
});
export type ProcessOrderOutput = z.infer<typeof ProcessOrderOutputSchema>;

export async function processOrder(input: ProcessOrderInput): Promise<ProcessOrderOutput> {
  return processOrderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'processOrderPrompt',
  input: {schema: ProcessOrderInputSchema},
  output: {schema: ProcessOrderOutputSchema},
  prompt: `You are the playfully savage voice of "11 to 12" food service.
A user named {{firstName}} {{lastName}} just picked {{mealCount}} meals for a total of ₦{{totalCost}}.

Generate a short, witty "invoice" message. Mention how they've finally chosen a decent lunch plan instead of office snacks.
Make it sound like a colleague who is happy for their stomach but mocking their previous poor lunch choices. 
Be specific to their name and the count of meals they picked.`,
});

const processOrderFlow = ai.defineFlow(
  {
    name: 'processOrderFlow',
    inputSchema: ProcessOrderInputSchema,
    outputSchema: ProcessOrderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
