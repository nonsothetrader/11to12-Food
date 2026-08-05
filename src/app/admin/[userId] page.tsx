
import { mockUsers } from '@/lib/mock-users';
import { mockTickets } from '@/lib/mock-support';
import { UserDetailView } from '@/components/admin/user-detail-view';
import { notFound } from 'next/navigation';

export default function UserDetailPage({ params }: { params: { userId: string } }) {
  const user = mockUsers.find(u => u.id === params.userId);
  const userTickets = mockTickets.filter(t => t.userId === params.userId);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
      <UserDetailView user={user} tickets={userTickets} />
    </div>
  );
}
