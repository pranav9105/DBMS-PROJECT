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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

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
    if (email.toLowerCase() === 'random@123gmail.com' && password === '12345678') {
      router.push('/dashboard/loading');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email or password. Please try again.',
      });
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center text-center">
        <Logo />
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>to continue to Receipt Manager</CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email or phone</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="text-sm">
              <Link href="#" className="font-semibold text-primary hover:underline">
                Forgot email?
              </Link>
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Not your computer? Use a private browsing window to sign in.
                <Link href="#" className="font-semibold text-primary hover:underline ml-1">
                  Learn more
                </Link>
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 w-full">
              <Button variant="link" asChild className="px-0">
                <Link href="/register">Create account</Link>
              </Button>
              <Button type="submit">
                Next
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex justify-center items-center">
                <Badge variant="outline" className="gap-2">
                    <UserCircle className='size-4'/> {email}
                </Badge>
            </div>
            <div className="grid w-full items-center gap-1.5">
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

            <div className="flex items-center justify-between pt-4 w-full">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="submit" disabled={!isVerified}>
                Sign In
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
