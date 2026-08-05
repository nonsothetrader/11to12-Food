
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { getFullOrders, updateOrderStatus, type FullOrder } from '@/lib/mock-orders';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Utensils, Package, XCircle, Star, Ban, ChevronLeft, ChevronRight, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { toDateString } from '@/lib/utils';


const formatText = (text: string) => {
  return text.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const ChoiceIcon = ({ choice }: { choice: FullOrder['choice'] }) => {
    switch(choice) {
        case 'accepted': return <Utensils className="h-4 w-4 text-green-500" />;
        case 'sub-pack': return <Package className="h-4 w-4 text-blue-500" />;
        case 'skipped': return <XCircle className="h-4 w-4 text-red-500" />;
        default: return null;
    }
}

const CreditIcon = ({ credit }: { credit: FullOrder['creditUsed'] }) => {
     switch(credit) {
        case 'extra-meal': return <Badge variant="outline" className="text-green-600 border-green-600"><Star className="mr-1" /> Extra Meal</Badge>;
        case 'extra-sub-pack': return <Badge variant="outline" className="text-blue-600 border-blue-600"><Star className="mr-1" /> Extra Sub Pack</Badge>;
        case 'none': return <span className="flex items-center text-muted-foreground text-xs"><Ban className="mr-1" /> None</span>;
        default: return null;
    }
}

const StatusIndicator = ({ status }: { status: FullOrder['status'] }) => {
    switch(status) {
        case 'Pending': return <Badge variant="outline"><AlertCircle className="mr-1 text-orange-500" /> Pending</Badge>;
        case 'Out for Delivery': return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Truck className="mr-1" /> Out for Delivery</Badge>;
        case 'Delivered': return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="mr-1" /> Delivered</Badge>;
        case 'Cancelled': return <Badge variant="destructive"><XCircle className="mr-1" /> Cancelled</Badge>;
        default: return null;
    }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<FullOrder[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filters, setFilters] = useState({
    user: '',
    choice: 'all',
  });

  useEffect(() => {
    // Subscribe to order updates
    const interval = setInterval(() => {
        const currentOrders = getFullOrders();
        // Naive check for changes. In a real app, this would be more efficient.
        if (JSON.stringify(currentOrders) !== JSON.stringify(orders)) {
            setOrders(currentOrders);
        }
    }, 500); // Poll for changes every half second

    return () => clearInterval(interval);
  }, [orders]);

  useEffect(() => {
      setOrders(getFullOrders());
  }, []);

  const handleFilterChange = (key: 'user' | 'choice', value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (direction: 'prev' | 'next') => {
    setSelectedDate(currentDate => {
      const newDate = new Date(currentDate);
      const increment = direction === 'prev' ? -1 : 1;
      
      do {
        newDate.setDate(newDate.getDate() + increment);
      } while (newDate.getDay() === 0 || newDate.getDay() === 6); // 0 = Sunday, 6 = Saturday

      return newDate;
    });
  };

  const filteredOrders = useMemo(() => {
    // Format selectedDate to match the string format in mock data
    const dateString = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    return orders.filter(order => {
      const dateMatch = order.orderDate === dateString;
      const userMatch = order.userName.toLowerCase().includes(filters.user.toLowerCase());
      const choiceMatch = filters.choice === 'all' || order.choice === filters.choice;
      return dateMatch && userMatch && choiceMatch;
    });
  }, [selectedDate, filters, orders]);
  
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Track and manage all customer orders.</p>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg border bg-card">
           <Button variant="outline" size="icon" onClick={() => handleDateChange('prev')}>
                <ChevronLeft className="h-4 w-4" />
           </Button>
           <div className="text-center font-semibold min-w-[240px]">
             {formattedDate}
           </div>
           <Button variant="outline" size="icon" onClick={() => handleDateChange('next')}>
                <ChevronRight className="h-4 w-4" />
           </Button>
        </div>
      </div>


      <Card>
        <CardHeader>
          <CardTitle>Filter Orders for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</CardTitle>
          <CardDescription>Narrow down the order list by user or meal choice.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search by user name..."
            value={filters.user}
            onChange={(e) => handleFilterChange('user', e.target.value)}
            className="max-w-sm"
          />
          <Select value={filters.choice} onValueChange={(value) => handleFilterChange('choice', value)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by choice..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Choices</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="skipped">Skipped</SelectItem>
                <SelectItem value="sub-pack">Sub Pack</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Meal Choice</TableHead>
                <TableHead>Credit Used</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <TableRow key={order.orderId}>
                    <TableCell className="font-medium">{order.userName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ChoiceIcon choice={order.choice} />
                        <span>{formatText(order.choice)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                        <CreditIcon credit={order.creditUsed} />
                    </TableCell>
                    <TableCell>
                        <StatusIndicator status={order.status} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No orders found for this date.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
