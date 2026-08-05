
'use client';

import { useState } from 'react';
import type { PermissionKey } from '../layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { addMockAdmin, getMockAdmins, type AdminUser } from '@/lib/mock-users';
import { Checkbox } from '@/components/ui/checkbox';

const permissionsMap: { id: PermissionKey, label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'users', label: 'Users' },
    { id: 'menu', label: 'Menu' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'inbox', label: 'Inbox' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings (Super Admin)' },
];

const initialNewUser = {
  email: '',
  password: '',
  permissions: permissionsMap.reduce((acc, perm) => ({ ...acc, [perm.id]: false }), {} as Record<PermissionKey, boolean>)
};

export default function SettingsPage() {
  const { toast } = useToast();
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(getMockAdmins());
  const [newUser, setNewUser] = useState(initialNewUser);
  
  const handleInvite = () => {
    if (!newUser.email || !newUser.password) {
      toast({
        title: 'Error',
        description: 'Please fill out email and password fields.',
        variant: 'destructive',
      });
      return;
    }
    const newAdmin = {
      id: `admin-${adminUsers.length + 1}`,
      ...newUser,
    };
    addMockAdmin(newAdmin);
    setAdminUsers(getMockAdmins()); // Refresh the list
    setNewUser(initialNewUser); // Reset the form
    toast({
      title: 'Admin Invited!',
      description: `${newAdmin.email} has been added with selected permissions.`,
    });
  };
  
  const handlePermissionChange = (permissionId: PermissionKey, checked: boolean) => {
    setNewUser(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permissionId]: checked
      }
    }));
  };

  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
        <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your application settings and preferences.</p>
        </div>

        <Tabs defaultValue="permissions" className="space-y-4">
            <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="permissions">Users & Permissions</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>Update your company information and branding.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="company-name">Company Name</Label>
                            <Input id="company-name" defaultValue="11 to 12 Inc." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="support-email">Support Email</Label>
                            <Input id="support-email" type="email" defaultValue="support@11to12.com" />
                        </div>
                         <div className="space-y-2">
                            <Label>Company Logo</Label>
                            <Input type="file" />
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>
            </TabsContent>
             <TabsContent value="notifications">
                <Card>
                    <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>Configure when and how users receive notifications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <Label>Order Confirmation Email</Label>
                                <p className="text-sm text-muted-foreground">Send an email when a user confirms a meal.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                             <div>
                                <Label>Daily Meal Reminder</Label>
                                <p className="text-sm text-muted-foreground">Send a reminder at 12pm about the next day's meal.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <Label>Delivery Notifications</Label>
                                <p className="text-sm text-muted-foreground">Notify users when their meal is out for delivery.</p>
                            </div>
                            <Switch />
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="billing">
                <Card>
                    <CardHeader>
                        <CardTitle>Billing Settings</CardTitle>
                        <CardDescription>Manage payment gateway integrations.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="paystack-key">Paystack API Key</Label>
                            <Input id="paystack-key" type="password" defaultValue="pk_test_xxxxxxxxxxxxxxxx" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="flutterwave-key">Flutterwave API Key</Label>
                            <Input id="flutterwave-key" type="password" />
                        </div>
                        <p className="text-sm text-muted-foreground">Your API keys are stored securely and are never exposed on the client-side.</p>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="permissions">
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Invite New Admin</CardTitle>
                            <CardDescription>Add a new team member to the admin dashboard.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="new-admin-email">Email Address</Label>
                                    <Input id="new-admin-email" type="email" placeholder="new.admin@11to12.com" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="new-admin-password">Temporary Password</Label>
                                    <Input id="new-admin-password" type="password" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label>Permissions</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border rounded-md">
                                    {permissionsMap.map(permission => (
                                        <div key={permission.id} className="flex items-center space-x-2">
                                            <Checkbox 
                                                id={`perm-${permission.id}`}
                                                checked={newUser.permissions[permission.id]}
                                                onCheckedChange={(checked) => handlePermissionChange(permission.id, !!checked)}
                                            />
                                            <Label htmlFor={`perm-${permission.id}`} className="font-normal">{permission.label}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Button onClick={handleInvite}>Send Invitation</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Admins</CardTitle>
                            <CardDescription>Manage existing admin accounts and permissions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {adminUsers.map(user => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.email}</TableCell>
                                            <TableCell>{user.permissions.settings ? 'Super Admin' : 'Admin'}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}
