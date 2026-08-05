
'use client';

import * as React from 'react';
import { useState } from 'react';
import type { WeeklyMenuItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { useMenuStore } from '@/hooks/use-menu-store';
import { Utensils, CalendarIcon } from 'lucide-react';
import { toDateString } from '@/lib/utils';

const defaultMeal: Omit<WeeklyMenuItem, 'day'> = {
    mealName: '',
    image: { id: 'dash-meal-1', width: 600, height: 400, hint: 'new meal' },
    ingredients: [],
    mealType: 'Other',
    allergens: '',
};

export default function MenuManagementPage() {
  const { toast } = useToast();
  const { menu, setMenuForDate } = useMenuStore();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMeal, setCurrentMeal] = useState<Omit<WeeklyMenuItem, 'day'>>(defaultMeal);

  React.useEffect(() => {
    if (selectedDate) {
      const dateString = toDateString(selectedDate);
      const existingMeal = menu.get(dateString);
      setCurrentMeal(existingMeal ? { ...existingMeal } : defaultMeal);
    }
  }, [selectedDate, menu]);

  const handleInputChange = (field: keyof Omit<WeeklyMenuItem, 'day'>, value: any) => {
    setCurrentMeal(prev => ({ ...prev, [field]: value }));
  };
  
  const handleIngredientsChange = (value: string) => {
    const ingredients = value.split(',').map(ing => ing.trim());
    handleInputChange('ingredients', ingredients);
  };

  const handleSaveChanges = () => {
    if (!selectedDate || !currentMeal.mealName) {
      toast({
        title: 'Error',
        description: "Please select a date and enter a meal name.",
        variant: 'destructive',
      });
      return;
    }

    const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const mealToSave: WeeklyMenuItem = { ...currentMeal, day: dayOfWeek };
    setMenuForDate(selectedDate, mealToSave);

    toast({
      title: 'Menu Updated!',
      description: `The meal for ${selectedDate.toLocaleDateString()} has been saved.`,
    });
  };
  
  const dayOfWeek = selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long' }) : 'No date selected';
  const isWeekend = selectedDate && (selectedDate.getDay() === 0 || selectedDate.getDay() === 6);

  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <p className="text-muted-foreground">Select a date to create or update a meal for that day.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Select a Date</h3>
            <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
            />
        </div>
        <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils /> 
                {selectedDate ? `Meal for ${selectedDate.toLocaleDateString()}` : 'Select a Date'}
              </CardTitle>
              <CardDescription>
                {dayOfWeek} {isWeekend ? '(Weekend - No delivery)' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isWeekend ? (
                <div className="text-center text-muted-foreground py-10">
                    <CalendarIcon className="mx-auto h-12 w-12 mb-2" />
                    <p>No meals are scheduled on weekends.</p>
                </div>
              ) : (
                <>
                <div className="space-y-2">
                    <Label htmlFor={`mealName`}>Meal Name</Label>
                    <Input
                    id={`mealName`}
                    value={currentMeal.mealName}
                    onChange={(e) => handleInputChange('mealName', e.target.value)}
                    placeholder="e.g., Lemon Herb Chicken"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`mealType`}>Meal Type</Label>
                    <Select
                        value={currentMeal.mealType}
                        onValueChange={(value) => handleInputChange('mealType', value)}
                    >
                        <SelectTrigger id={`mealType`}>
                            <SelectValue placeholder="Select meal type..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Chicken">Chicken</SelectItem>
                            <SelectItem value="Beef">Beef</SelectItem>
                            <SelectItem value="Fish">Fish</SelectItem>
                            <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`ingredients`}>Ingredients</Label>
                    <Textarea
                    id={`ingredients`}
                    value={currentMeal.ingredients.join(', ')}
                    onChange={(e) => handleIngredientsChange(e.target.value)}
                    placeholder="e.g., Chicken, Rice, Broccoli"
                    />
                    <p className="text-xs text-muted-foreground">Separate ingredients with a comma.</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`allergens`}>Allergens</Label>
                    <Input
                    id={`allergens`}
                    value={currentMeal.allergens}
                    onChange={(e) => handleInputChange('allergens', e.target.value)}
                    placeholder="e.g., Nuts, Dairy"
                    />
                </div>
                <Button onClick={handleSaveChanges} className="w-full">
                    Save Changes
                </Button>
                </>
              )}
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
