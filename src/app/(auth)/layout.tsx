'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { FirebaseProvider, initializeFirebase } from '@/firebase';

const { firebaseApp, firestore, auth } = initializeFirebase();

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      firestore={firestore}
      auth={auth}
    >
      <div className="flex min-h-screen flex-col items-center justify-center bg-secondary">
        <div className="mb-8">
          <Link href="/">
            <Logo className="h-40 w-40 text-primary" />
          </Link>
        </div>
        {children}
      </div>
    </FirebaseProvider>
  );
}
