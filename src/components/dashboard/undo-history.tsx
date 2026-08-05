'use client';

import { useState, useEffect } from 'react';
import type { LastAction } from '@/app/(dashboard)/dashboard/page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, History } from 'lucide-react';
import { Badge } from '../ui/badge';

interface UndoHistoryProps {
    undoableActions: LastAction[];
    handleUndo: (actionId: string) => void;
}

const getActionText = (action: LastAction): string => {
    const dateString = action.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    switch(action.action) {
        case 'accept':
            return `Meal accepted for ${dateString}`;
        case 'skip':
            return `Meal skipped for ${dateString}`;
        case 'use_credit_meal':
            return `Extra meal on ${dateString}`;
        default:
            return 'Action taken';
    }
}

export function UndoHistory({ undoableActions, handleUndo }: UndoHistoryProps) {
    const [, setTick] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTick(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    
    if (undoableActions.length === 0) {
        return null;
    }

    const fiveMinutes = 5 * 60 * 1000;

    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Recent Actions
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {undoableActions.map(action => {
                        const timePassed = Date.now() - action.timestamp;
                        const timeLeft = Math.max(0, fiveMinutes - timePassed);
                        const minutes = Math.floor(timeLeft / (1000 * 60));
                        const seconds = Math.floor((timeLeft / 1000) % 60);

                        return (
                            <li key={action.id} className="flex items-center justify-between p-2 rounded-md bg-background/50">
                                <span className="text-sm">{getActionText(action)}</span>
                                <div className="flex items-center gap-2">
                                     <Badge variant="outline">
                                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                                     </Badge>
                                     <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => handleUndo(action.id)}
                                    >
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Undo</span>
                                    </Button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </CardContent>
        </Card>
    );
}
