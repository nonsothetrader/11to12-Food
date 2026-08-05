
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { recentMeals } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function RecentMealsList() {
    const [ratings, setRatings] = useState<{ [key: string]: number }>(
        recentMeals.reduce((acc, meal) => ({ ...acc, [meal.id]: meal.rating }), {})
    );
    const { toast } = useToast();

    const handleRating = (mealId: string, rating: number) => {
        if (ratings[mealId] > 0) return; // Already rated

        setRatings(prev => ({ ...prev, [mealId]: rating }));
        const meal = recentMeals.find(m => m.id === mealId);
        toast({
            title: 'Rating Submitted!',
            description: `You rated "${meal?.name}" ${rating} stars. Thanks for your feedback!`,
        });
    };

    return (
        <div>
            <h4 className="text-md font-semibold mb-2">Rate Your Recent Meals</h4>
            <div className="space-y-4">
                {recentMeals.map((meal) => {
                    const image = PlaceHolderImages.find(img => img.id === meal.image.id);
                    const isRated = ratings[meal.id] > 0;
                    return (
                        <div key={meal.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                            <div className="flex items-center gap-4">
                                {image && (
                                    <Image
                                        src={image.imageUrl}
                                        alt={meal.name}
                                        width={50}
                                        height={50}
                                        className="rounded-md object-cover h-12 w-12"
                                        data-ai-hint={meal.image.hint}
                                    />
                                )}
                                <div>
                                    <p className="font-semibold">{meal.name}</p>
                                    <p className="text-sm text-muted-foreground">{meal.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={cn(
                                            'w-5 h-5',
                                            isRated ? '' : 'cursor-pointer',
                                            (ratings[meal.id] || 0) >= star ? 'text-primary fill-primary' : 'text-muted-foreground'
                                        )}
                                        onClick={() => handleRating(meal.id, star)}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
