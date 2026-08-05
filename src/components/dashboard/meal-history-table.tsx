
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { mealHistoryFull } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import type { RecentMeal } from '@/lib/types';


export function MealHistoryTable() {
    const [ratings, setRatings] = useState<{ [key: string]: number }>(
        mealHistoryFull.reduce((acc, meal) => ({ ...acc, [meal.id]: meal.rating }), {})
    );
    const { toast } = useToast();

    const handleRating = (mealId: string, rating: number) => {
        if (ratings[mealId] > 0) return; // Already rated

        setRatings(prev => ({ ...prev, [mealId]: rating }));
        const meal = mealHistoryFull.find(m => m.id === mealId);
        toast({
            title: 'Rating Submitted!',
            description: `You rated "${meal?.name}" ${rating} stars. Thanks for your feedback!`,
        });
    };
    
    return (
        <Card>
            <CardContent className="pt-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Meal</TableHead>
                            <TableHead className="text-center">Rating</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mealHistoryFull.map((meal) => {
                            const image = PlaceHolderImages.find(img => img.id === meal.image.id);
                            const isRated = ratings[meal.id] > 0;
                            return (
                                <TableRow key={meal.id}>
                                    <TableCell className="font-medium">{meal.date}</TableCell>
                                    <TableCell>
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
                                            <span>{meal.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center">
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
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
