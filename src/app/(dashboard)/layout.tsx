'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFirebase, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/my-meals', label: 'My Meals' },
    { href: '/subscription', label: 'Subscription' },
    { href: '/profile', label: 'Profile' },
    { href: '/support', label: 'Support' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { auth } = useFirebase();
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/login');
    } catch (error) {
      console.error('Logout Error:', error);
      toast({
        title: 'Logout Failed',
        description: 'Something went wrong while logging out.',
        variant: 'destructive',
      });
    }
  };

  if (isUserLoading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Logo className="h-20 w-20 animate-pulse text-primary" />
        </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-secondary p-4">
        <div className="flex items-center mb-8">
            <Link href="/">
                <Logo className="h-40 w-40 text-primary" />
            </Link>
        </div>
        <nav className="flex flex-col space-y-2">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant={pathname === link.href ? 'default' : 'ghost'}
              className="justify-start"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
          <header className="flex items-center justify-end border-b h-14 px-4 bg-background">
              <div className="text-sm font-medium mr-auto text-muted-foreground">
                Welcome, {user.displayName || user.email}
              </div>
              <Button onClick={handleLogout} variant="outline">
                  Logout
              </Button>
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
