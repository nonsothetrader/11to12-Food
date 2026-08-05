
import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="container grid items-center gap-8 px-4 py-12 text-center md:grid-cols-3 md:px-6 md:text-left">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
          </Link>
          <p className="text-sm text-muted-foreground">© 2024 11 to 12 Inc.</p>
        </div>
        <div className="flex justify-center gap-4 md:gap-8">
          <Link href="#" className="text-sm hover:underline">About Us</Link>
          <Link href="#" className="text-sm hover:underline">Contact</Link>
          <Link href="#" className="text-sm hover:underline">Terms of Service</Link>
        </div>
        <div className="flex justify-center gap-4 md:justify-end">
          <Link href="#" aria-label="Twitter">
            <Twitter className="h-6 w-6 text-muted-foreground hover:text-foreground" />
          </Link>
          <Link href="#" aria-label="Instagram">
            <Instagram className="h-6 w-6 text-muted-foreground hover:text-foreground" />
          </Link>
          <Link href="#" aria-label="Facebook">
            <Facebook className="h-6 w-6 text-muted-foreground hover:text-foreground" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
