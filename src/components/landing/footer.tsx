import { Logo } from '@/components/logo';
import { Linkedin, Instagram, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
            <Logo />
        </div>
        <p className="text-sm text-muted-foreground order-2 sm:order-1">
          © {new Date().getFullYear()} Receipt Manager. All rights reserved.
        </p>
        <div className="flex gap-4 order-1 sm:order-2">
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
            </Link>
             <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
            </Link>
        </div>
      </div>
    </footer>
  );
}
