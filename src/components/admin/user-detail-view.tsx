
'use client';

import { useState } from 'react';
import type { MockUser } from '@/lib/mock-users';
import type { SupportTicket } from '@/lib/mock-support';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, User, CreditCard, Star, MessageSquare, PauseCircle, Phone, Mail, MoreHorizontal, CheckCircle2, Archive } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mealHistoryFull } from '@/lib/data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface UserDetailViewProps {
  user: MockUser;
  tickets: SupportTicket[];
}

const formatCategory = (category: string) => {
  return category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const userMeals = mealHistoryFull.slice(0, 3); // Mock: just show some recent meals

export function UserDetailView({ user, tickets: initialTickets }: UserDetailViewProps) {
  const [tickets, setTickets] = useState(initialTickets);
  const { toast } = useToast();

  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.map(n => n[0]).join('');
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


  return (
    <div>
        <div className="mb-4">
            <Button asChild variant="outline" size="sm">
            <Link href="/admin/users">
                <ChevronLeft className="mr-2" />
                Back to All Users
            </Link>
            </Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader className="flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Subscription</span>
                            <Badge variant={user.plan === 'Pro' ? 'default' : 'secondary'}>{user.plan}</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Status</span>
                            <Badge
                                className={cn(
                                'capitalize',
                                user.status === 'Active' && 'text-green-700 border-green-700',
                                user.status === 'Paused' && 'text-yellow-700 border-yellow-700',
                                user.status === 'Cancelled' && 'text-red-700 border-red-700',
                                )}
                                variant="outline"
                            >
                                {user.status}
                            </Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Meal Credits</span>
                            <span className="font-semibold flex items-center gap-1"><Star className="h-4 w-4 text-primary" /> {user.credits}</span>
                        </div>
                        <Separator />
                        <p className="text-sm text-muted-foreground pt-2">
                            <span className="font-semibold text-foreground">Delivery Address:</span><br/>
                            {user.deliveryAddress}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Support Tickets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tickets.length > 0 ? tickets.map(ticket => (
                                    <TableRow key={ticket.id}>
                                        <TableCell className="font-medium">{ticket.subject}</TableCell>
                                        <TableCell><Badge variant="outline">{formatCategory(ticket.category)}</Badge></TableCell>
                                        <TableCell>
                                            <Badge
                                                className={cn(
                                                    'capitalize',
                                                    ticket.status === 'Open' && 'text-red-700 border-red-700',
                                                    ticket.status === 'In Progress' && 'text-yellow-700 border-yellow-700',
                                                    ticket.status === 'Resolved' && 'text-green-700 border-green-700',
                                                )}
                                                variant="outline"
                                            >{ticket.status}</Badge>
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
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center h-24">No support tickets found for this user.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Meal History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {userMeals.map(meal => {
                                const image = PlaceHolderImages.find(img => img.id === meal.image.id);
                                return (
                                    <li key={meal.id} className="flex items-center justify-between">
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
                                            <div>
                                                <p className="font-semibold">{meal.name}</p>
                                                <p className="text-sm text-muted-foreground">{meal.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {[...Array(meal.rating)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                                            ))}
                                            {[...Array(5 - meal.rating)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-muted-foreground" />
                                            ))}
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Admin Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-2">
                        <Button variant="outline"><PauseCircle className="mr-2" /> Pause Sub</Button>
                        <Button variant="outline"><CreditCard className="mr-2" /> Refund Credit</Button>
                        <Button variant="outline"><MessageSquare className="mr-2" /> Send Message</Button>
                        <Button variant="outline"><Phone className="mr-2" /> Call User</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
