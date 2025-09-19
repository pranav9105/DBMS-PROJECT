'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { UserCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase() === 'random@123gmail.com' && password === 'Random@123gmail.com') {
      router.push('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email or password. Please try again.',
      });
    }
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
        
        {step === 1 && (
            <form onSubmit={handleNext} className="w-full space-y-6">
                <div className="grid w-full items-center gap-1.5 text-center">
                    <Label htmlFor="email">Email or phone</Label>
                    <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
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
        )}

        {step === 2 && (
             <form onSubmit={handleLogin} className="w-full space-y-6">
                <div className="grid w-full items-center gap-1.5 text-center">
                    <div className="flex justify-center items-center py-2">
                        <Badge variant="outline" className="gap-2">
                           <UserCircle className='size-4'/> {email}
                        </Badge>
                    </div>
                    <Label htmlFor="password">Enter your password</Label>
                    <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" onCheckedChange={(checked) => setIsVerified(checked as boolean)} />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I am not a robot
                    </label>
                </div>

                <div className="flex items-center justify-between pt-4">
                    <Button variant="ghost" onClick={() => setStep(1)}>
                        Back
                    </Button>
                    <Button type="submit" disabled={!isVerified}>
                        Sign In
                    </Button>
                </div>
            </form>
        )}
    </div>
  );
}
