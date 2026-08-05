'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OrderFiltersProps {
  filters: { choice: string; creditUsed: string };
  setFilters: (filters: { choice: string; creditUsed: string }) => void;
}

export function OrderFilters({ filters, setFilters }: OrderFiltersProps) {
  const handleFilterChange = (filterName: 'choice' | 'creditUsed', value: string) => {
    setFilters({ ...filters, [filterName]: value });
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="meal-choice-filter">Meal Choice</Label>
                    <Select value={filters.choice} onValueChange={(value) => handleFilterChange('choice', value)}>
                        <SelectTrigger id="meal-choice-filter">
                            <SelectValue placeholder="Filter by meal choice..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Choices</SelectItem>
                            <SelectItem value="accepted">Accepted Meal</SelectItem>
                            <SelectItem value="skipped">Skipped Meal</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="credit-use-filter">Credit Use</Label>
                     <Select value={filters.creditUsed} onValueChange={(value) => handleFilterChange('creditUsed', value)}>
                        <SelectTrigger id="credit-use-filter">
                            <SelectValue placeholder="Filter by credit use..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Credit Use</SelectItem>
                            <SelectItem value="none">No Credit Used</SelectItem>
                            <SelectItem value="extra-meal">Extra Meal</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
