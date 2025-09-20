'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a mock login. In a real app, you'd validate credentials.
    toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
    });
    router.push('/dashboard/loading');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-sm space-y-6">
            <div className="text-center space-y-2">
                <Logo />
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-muted-foreground">Enter your credentials to access your account</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
            </div>
            <div className="flex items-center justify-end text-sm">
                    <Link href="#" className="font-semibold text-primary hover:underline">
                        Forgot password?
                    </Link>
                </div>
            <Button type="submit" className="w-full">
                Login
            </Button>
            </form>
            <div className="text-center text-sm">
                <p>
                    Don't have an account?{' '}
                    <Link href="/register" className="font-semibold text-primary hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    </div>
  );
}
