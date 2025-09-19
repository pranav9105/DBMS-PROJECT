import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-6 flex items-center justify-between">
        <Logo />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Receipt Wallet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
