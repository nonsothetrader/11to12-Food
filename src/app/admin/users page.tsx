
import { mockUsers } from '@/lib/mock-users';
import { UserManagementClient } from '@/components/admin/user-management-client';

export default function UserManagementPage() {
  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">
          View, manage, and interact with your subscribers.
        </p>
      </div>
      <UserManagementClient users={mockUsers} />
    </div>
  );
}
