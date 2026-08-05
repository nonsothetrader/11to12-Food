
'use client';

import { useState, useMemo } from 'react';
import { mockTickets } from '@/lib/mock-support';
import { mockUsers } from '@/lib/mock-users';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, MessageSquare, CheckCircle2, Archive, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { SupportTicket } from '@/lib/mock-support';

const formatCategory = (category: string) => {
  return category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const ticketsWithUsers = mockTickets.map(ticket => {
    const user = mockUsers.find(u => u.id === ticket.userId);
    return { ...ticket, userName: user?.name || 'Unknown User' };
});

export default function InboxPage() {
  const [tickets, setTickets] = useState(ticketsWithUsers);
  const [filters, setFilters] = useState({ subject: '', status: 'all', category: 'all' });
  const { toast } = useToast();

  const handleFilterChange = (key: 'subject' | 'status' | 'category', value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleStatusChange = (ticketId: string, newStatus: SupportTicket['status']) => {
    setTickets(currentTickets =>
      currentTickets.map(ticket =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
    toast({
        title: "Ticket Status Updated",
        description: `The ticket has been marked as ${newStatus}.`,
    });
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const subjectMatch = ticket.subject.toLowerCase().includes(filters.subject.toLowerCase());
      const statusMatch = filters.status === 'all' || ticket.status === filters.status;
      const categoryMatch = filters.category === 'all' || ticket.category === filters.category;
      return subjectMatch && statusMatch && categoryMatch;
    });
  }, [tickets, filters]);

  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
            <Mail className="h-8 w-8 text-primary" />
            <div>
                <h1 className="text-3xl font-bold">Support Inbox</h1>
                <p className="text-muted-foreground">
                Manage and respond to all user support tickets.
                </p>
            </div>
        </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Filter Tickets</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search by subject..."
            value={filters.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
            className="max-w-sm"
          />
          <div className="flex gap-4">
            <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by category..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
                <SelectItem value="meal-quality">Meal Quality</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map(ticket => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.userName}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                   <TableCell>
                    <Badge variant="outline">{formatCategory(ticket.category)}</Badge>
                  </TableCell>
                  <TableCell>{ticket.date}</TableCell>
                  <TableCell>
                     <Badge
                        className={cn(
                          'capitalize',
                          ticket.status === 'Open' && 'text-red-700 border-red-700',
                          ticket.status === 'In Progress' && 'text-yellow-700 border-yellow-700',
                          ticket.status === 'Resolved' && 'text-green-700 border-green-700',
                        )}
                        variant="outline"
                      >
                        {ticket.status}
                      </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                             <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(ticket.id, 'In Progress')}>
                                <Archive className="mr-2 h-4 w-4" />
                                Mark as In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-green-600" onClick={() => handleStatusChange(ticket.id, 'Resolved')}>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Mark as Resolved
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
