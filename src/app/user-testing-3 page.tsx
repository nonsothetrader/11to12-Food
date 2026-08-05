'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            {...props}
        >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 6.555 0 11.895 5.335 11.895 11.891 0 6.556-5.34 11.894-11.894 11.894-1.99 0-3.882-.527-5.58-1.502L.057 24zm6.597-3.807c1.676.995 3.606 1.558 5.577 1.558 5.458 0 9.898-4.44 9.898-9.898s-4.44-9.898-9.898-9.898-9.898 4.44-9.898 9.898c0 2.05.626 3.999 1.748 5.633l-1.198 4.354 4.465-1.149zM16.51 14.51c-.175-.28-.577-.448-.827-.482-.252-.035-1.442-.71-1.666-.79-.225-.08-.387-.12-.549.12-.16.239-.628.789-.772.949-.142.158-.285.178-.535.06-.25-.115-1.058-.389-2.015-1.233-.746-.66-1.251-1.486-1.396-1.734-.145-.248-.013-.382.11-.504.11-.11.248-.28.373-.42.124-.14.167-.239.248-.399.083-.16.042-.302-.018-.423-.06-.12-.549-1.313-.752-1.798-.195-.466-.39-.4-.548-.4h-.477c-.167 0-.448.06-.67.3-.22.24-.864.84-.864 1.998s.885 2.323 1.009 2.483c.125.16 1.724 2.657 4.178 3.642 2.454.985 2.454.656 2.894.623.44-.033 1.442-.584 1.638-1.15.195-.565.195-1.042.135-1.15z" />
        </svg>
    );
}

export default function UserTestingPage() {
  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center mb-8">
                <Logo className="h-16 w-16 text-primary mb-4" />
                <h1 className="text-4xl font-bold">Help Us Shape the Future of Lunch (via WhatsApp!)</h1>
                <p className="text-muted-foreground mt-2 max-w-lg">
                    We're building something new and need your expert opinion. Tap the button below to chat with our friendly bot and tell us what you think. Your feedback is crucial!
                </p>
            </div>
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>Ready to share your thoughts?</CardTitle>
                    <CardDescription>
                        It only takes a couple of minutes. We'll guide you through a few quick questions right in WhatsApp.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild size="lg" className="w-full">
                        <Link href="https://wa.me/2347033972316" target="_blank">
                            <WhatsAppIcon className="mr-2 h-6 w-6" />
                            Start Chat on WhatsApp
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
