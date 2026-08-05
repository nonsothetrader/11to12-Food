'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getOrders, type UserOrder } from '@/lib/mock-orders';
import { OrderFilters } from '@/components/admin/order-filters';
import { OrderTable } from '@/components/admin/order-table';
import { DashboardStats } from '@/components/admin/dashboard-stats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { globalAdminMessage, setGlobalAdminMessage } from '@/app/(dashboard)/dashboard/page';
import { ChefHat } from 'lucide-react';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [filters, setFilters] = useState<{ choice: string; creditUsed: string }>({
    choice: 'all',
    creditUsed: 'all',
  });
  const [message, setMessage] = useState(globalAdminMessage.message);
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const { toast } = useToast();

  useEffect(() => {
    // Subscribe to order updates
    const interval = setInterval(() => {
        const currentOrders = getOrders();
        // Naive check for changes
        if (JSON.stringify(currentOrders) !== JSON.stringify(orders)) {
            setOrders(currentOrders);
        }
    }, 500);

    return () => clearInterval(interval);
  }, [orders]);


  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay('morning');
    } else if (hour < 18) {
      setTimeOfDay('afternoon');
    } else {
      setTimeOfDay('evening');
    }
    setOrders(getOrders());
  }, []);

  const handlePublishMessage = () => {
    setGlobalAdminMessage({
        title: "A Message from Admin",
        message: message,
    });
    toast({
      title: 'Message Published!',
      description: 'The new message is now visible to all users on their dashboard.',
    });
  };

  const filteredOrders = orders.filter(order => {
    const choiceMatch = filters.choice === 'all' || order.choice === filters.choice;
    const creditMatch = filters.creditUsed === 'all' || order.creditUsed === filters.creditUsed;
    return choiceMatch && creditMatch;
  });

  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Good {timeOfDay}, Admin Justice 👋</h1>
        <p className="text-muted-foreground">
          Here's a snapshot of today's operations.
        </p>
      </div>

      <DashboardStats orders={orders} />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <OrderFilters filters={filters} setFilters={setFilters} />
          <OrderTable orders={filteredOrders} />
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Announcements Manager</CardTitle>
                    <CardDescription>Publish a message to all users.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="admin-message">Message</Label>
                        <Textarea 
                            id="admin-message"
                            placeholder="Enter a message for your users..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="h-32"
                        />
                    </div>
                    <Button onClick={handlePublishMessage} className="w-full">
                        Publish Message
                    </Button>
                </CardContent>
            </Card>
            <Link href="/admin/kitchen" className="block">
                <Card className="hover:bg-muted/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ChefHat />
                            Kitchen Operations
                        </CardTitle>
                        <CardDescription>Manage daily cooking, ingredients, and stock levels.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            View today's cook list, track ingredient requirements, and monitor packaging inventory.
                        </p>
                    </CardContent>
                </Card>
            </Link>
        </div>
      </div>

    </div>
  );
}
