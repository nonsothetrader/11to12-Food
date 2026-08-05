'use client';

import type { UserOrder } from '@/lib/mock-orders';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils, XCircle, Star, Ban, Truck, CheckCircle } from 'lucide-react';

interface OrderTableProps {
  orders: UserOrder[];
}

const formatText = (text: string) => {
  return text.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const ChoiceIcon = ({ choice }: { choice: UserOrder['choice'] }) => {
    switch(choice) {
        case 'accepted': return <Utensils className="h-4 w-4 text-green-500" />;
        case 'skipped': return <XCircle className="h-4 w-4 text-red-500" />;
        default: return null;
    }
}

const CreditIcon = ({ credit }: { credit: UserOrder['creditUsed'] }) => {
     switch(credit) {
        case 'extra-meal': return <Badge variant="outline" className="text-green-600 border-green-600"><Star className="mr-1" /> Extra Meal</Badge>;
        case 'none': return <span className="flex items-center text-muted-foreground text-xs"><Ban className="mr-1" /> None</span>;
        default: return null;
    }
}

const StatusIndicator = ({ status }: { status: UserOrder['status'] }) => {
    switch(status) {
        case 'Out for Delivery': return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Truck className="mr-1" /> Out for Delivery</Badge>;
        case 'Delivered': return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="mr-1" /> Delivered</Badge>;
        default: return null;
    }
}

export function OrderTable({ orders }: OrderTableProps) {
  return (
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
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <TableRow key={order.userId}>
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
                                No orders match the current filters.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
