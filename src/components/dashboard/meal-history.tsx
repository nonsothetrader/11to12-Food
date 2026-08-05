
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MealHistoryChart } from './meal-history-chart';
import { RecentMealsList } from './recent-meals-list';

export function MealHistory() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Your Meal Journey</CardTitle>
            <CardDescription>Visualize your eating habits and rate your past meals.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
            <MealHistoryChart />
            <RecentMealsList />
        </CardContent>
    </Card>
  );
}
