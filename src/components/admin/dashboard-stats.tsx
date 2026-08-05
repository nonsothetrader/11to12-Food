
'use client';

import type { UserOrder } from '@/lib/mock-orders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Utensils, Package, Star, TrendingUp, Wallet } from 'lucide-react';

interface DashboardStatsProps {
  orders: UserOrder[];
}

export function DashboardStats({ orders }: DashboardStatsProps) {
  const totalOrders = orders.length;
  const acceptedMeals = orders.filter(o => o.choice === 'accepted').length;
  const subPacks = orders.filter(o => o.choice === 'sub-pack').length;
  const creditsUsed = orders.filter(o => o.creditUsed !== 'none').length;

  // Mock data for new stats
  const activeSubscribers = 125;
  const revenueToday = '₦' + (totalOrders * 2200).toLocaleString();


  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue (Today)</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{revenueToday}</div>
          <p className="text-xs text-muted-foreground">Based on today's confirmed orders</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeSubscribers}</div>
          <p className="text-xs text-muted-foreground">+5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
          <Utensils className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrders}</div>
          <p className="text-xs text-muted-foreground">{acceptedMeals} Accepted, {subPacks} Sub Packs</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Credits Used Today</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{creditsUsed}</div>
          <p className="text-xs text-muted-foreground">Extra meals or sub-packs redeemed</p>
        </CardContent>
      </Card>
    </div>
  );
}
