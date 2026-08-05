
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SubscriberChart } from '@/components/admin/charts/subscriber-chart';
import { RevenueChart } from '@/components/admin/charts/revenue-chart';
import { PopularMealsChart } from '@/components/admin/charts/popular-meals-chart';
import { BarChart2, DollarSign, Heart, Users } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
       <div>
        <h1 className="text-3xl font-bold">Analytics & Insights</h1>
        <p className="text-muted-foreground">
          Visualize your business performance and customer trends.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₦1,250,000</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+230</div>
                <p className="text-xs text-muted-foreground">+10.2% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">4.8/5</div>
                <p className="text-xs text-muted-foreground">Based on 1,200 reviews</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Delivery Success</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">99.2%</div>
                <p className="text-xs text-muted-foreground">On-time delivery rate</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Subscriber Growth</CardTitle>
                <CardDescription>Total subscribers over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <SubscriberChart />
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Revenue by Month</CardTitle>
                <CardDescription>Monthly revenue trends.</CardDescription>
            </CardHeader>
            <CardContent>
                <RevenueChart />
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Most Popular Meals</CardTitle>
            <CardDescription>Top-rated meals based on user feedback.</CardDescription>
        </CardHeader>
        <CardContent>
            <PopularMealsChart />
        </CardContent>
      </Card>
    </div>
  );
}
