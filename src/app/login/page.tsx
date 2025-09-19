'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard/loading');
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center space-y-6 rounded-lg border border-border bg-card p-10 text-card-foreground">
        <Logo />
        <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
                Sign in
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
                to continue to Receipt Manager
            </p>
        </div>
        <form onSubmit={handleLogin} className="w-full space-y-6">
            <div className="grid w-full items-center gap-1.5 text-center">
                <Label htmlFor="email">Email or phone</Label>
                <Input id="email" type="email" required />
            </div>
            <div className="text-sm text-center">
                <Link href="#" className="font-semibold text-primary hover:underline">
                    Forgot email?
                </Link>
            </div>
            <div className="text-center">
                <p className="text-sm text-muted-foreground">
                    Not your computer? Use a private browsing window to sign in.
                    <Link href="#" className="font-semibold text-primary hover:underline ml-1">
                        Learn more
                    </Link>
                </p>
            </div>
            <div className="flex items-center justify-between pt-4">
                <Button variant="ghost" asChild>
                    <Link href="/register">Create account</Link>
                </Button>
                <Button type="submit">
                    Next
                </Button>
            </div>
        </form>
    </div>
  );
}
