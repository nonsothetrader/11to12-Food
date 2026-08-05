'use client';

import { Logo } from '@/components/logo';
import { UserTestingForm } from '@/components/user-testing/form';

export default function UserTestingPage() {
  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="flex flex-col items-center text-center">
                <Logo className="h-16 w-16 text-primary mb-4" />
                <h1 className="text-4xl font-bold">Help Us Shape the Future of Lunch!</h1>
                <p className="text-muted-foreground mt-2 max-w-lg">
                    We're building something new and need your expert opinion. Answer a few super-quick questions to help us create the perfect lunch service for you.
                </p>
            </div>
            <UserTestingForm />
        </div>
    </div>
  );
}
