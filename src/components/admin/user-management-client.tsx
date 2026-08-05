
'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { MockUser } from '@/lib/mock-users';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PauseCircle, PlayCircle, UserX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface UserManagementClientProps {
  users: MockUser[];
}

export function UserManagementClient({ users: initialUsers }: UserManagementClientProps) {
  const [users, setUsers] = useState<MockUser[]>(initialUsers);
  const [filters, setFilters] = useState({ name: '', plan: 'all', status: 'all' });
  const { toast } = useToast();
  const router = useRouter();

  const handleFilterChange = (key: 'name' | 'plan' | 'status', value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleStatusChange = (e: React.MouseEvent, userId: string, newStatus: MockUser['status']) => {
    e.stopPropagation(); // Prevent row click from firing
    setUsers(currentUsers =>
      currentUsers.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    toast({
        title: "User Status Updated",
        description: `User's subscription has been ${newStatus.toLowerCase()}.`,
    });
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(filters.name.toLowerCase());
      const planMatch = filters.plan === 'all' || user.plan === filters.plan;
      const statusMatch = filters.status === 'all' || user.status === filters.status;
      return nameMatch && planMatch && statusMatch;
    });
  }, [users, filters]);

  const handleRowClick = (userId: string) => {
    router.push(`/admin/users/${userId}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search by name..."
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            className="max-w-sm"
          />
          <div className="flex gap-4">
            <Select value={filters.plan} onValueChange={(value) => handleFilterChange('plan', value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by plan..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="Starter">Starter</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow 
                  key={user.id} 
                  onClick={() => handleRowClick(user.id)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.plan === 'Pro' ? 'default' : user.plan === 'Enterprise' ? 'secondary' : 'outline'}>{user.plan}</Badge>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{user.credits}</TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                             <DropdownMenuItem onClick={(e) => handleStatusChange(e, user.id, 'Active')}>
                                <PlayCircle className="mr-2 h-4 w-4" />
                                Resume Subscription
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => handleStatusChange(e, user.id, 'Paused')}>
                                <PauseCircle className="mr-2 h-4 w-4" />
                                Pause Subscription
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={(e) => handleStatusChange(e, user.id, 'Cancelled')}>
                                <UserX className="mr-2 h-4 w-4" />
                                Cancel Subscription
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
