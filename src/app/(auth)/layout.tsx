import Link from 'next/link';
import { Logo } from '@/components/logo';
import { FirebaseProvider } from '@/firebase';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary">
      <FirebaseProvider>
        <div className="mb-8">
          <Link href="/">
            <Logo className="h-40 w-40 text-primary" />
          </Link>
        </div>
        {children}
      </FirebaseProvider>
    </div>
  );
}
