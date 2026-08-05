
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { BarChart2, Bell, ChefHat, Gift, Home, Mail, Package, Settings, ShoppingCart, Users } from 'lucide-react';
import { useEffect } from 'react';
import { useFirebase, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

export type PermissionKey = 'dashboard' | 'orders' | 'kitchen' | 'users' | 'menu' | 'inbox' | 'analytics' | 'settings' | 'giveaway';

type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
  permission: PermissionKey;
};

const navLinks: NavLink[] = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: Home, permission: 'dashboard' },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, permission: 'orders' },
    { href: '/admin/kitchen', label: 'Kitchen Ops', icon: ChefHat, permission: 'kitchen' },
    { href: '/admin/users', label: 'Users', icon: Users, permission: 'users' },
    { href: '/admin/menu', label: 'Menu Management', icon: Package, permission: 'menu' },
    { href: '/admin/inbox', label: 'Inbox', icon: Mail, permission: 'inbox' },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart2, permission: 'analytics' },
    { href: '/admin/giveaway-entries', label: 'Giveaway Entries', icon: Gift, permission: 'giveaway' },
    { href: '/admin/settings', label: 'Settings', icon: Settings, permission: 'settings' },
];

const ADMIN_EMAILS = ['admin@11to12.com', 'kitchen@11to12.com', 'logistics@11to12.com'];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { auth } = useFirebase();
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.push('/login');
      } else if (!ADMIN_EMAILS.includes(user.email?.toLowerCase() || '')) {
        toast({ 
          title: 'Access Denied', 
          description: 'You do not have administrator privileges.', 
          variant: 'destructive' 
        });
        router.push('/dashboard');
      }
    }
  }, [user, isUserLoading, router, toast]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      router.push('/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  // Only render children if user is logged in AND is an admin
  if (isUserLoading || !user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() || '')) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-secondary">
            <div className="flex flex-col items-center gap-4">
                <Logo className="h-20 w-20 animate-pulse text-primary" />
                <p className="text-muted-foreground animate-pulse">Verifying credentials...</p>
            </div>
        </div>
      );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-secondary p-4 flex flex-col hidden md:flex">
        <div className="flex items-center mb-8 px-2">
            <Link href="/">
                <Logo className="h-12 w-12 text-primary" />
            </Link>
            <span className="font-headline text-xl ml-2 text-primary">Admin</span>
        </div>
        <nav className="flex flex-col space-y-2 flex-1">
            {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                    <Button
                        key={link.href}
                        asChild
                        variant={pathname.startsWith(link.href) ? 'default' : 'ghost'}
                        className="justify-start gap-2"
                        >
                        <Link href={link.href}>
                            <Icon className="h-4 w-4" />
                            {link.label}
                        </Link>
                    </Button>
                );
            })}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
          <header className="flex items-center justify-end border-b h-14 px-4 gap-4 bg-background">
              <div className="text-sm font-medium text-muted-foreground mr-auto">
                Justice Dashboard
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button onClick={handleLogout} variant="outline">
                  Logout
              </Button>
          </header>
          <main className="flex-1 overflow-auto bg-muted/40">{children}</main>
      </div>
    </div>
  );
}
