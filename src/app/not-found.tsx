import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
        <div className="absolute top-4 left-4">
            <Logo />
        </div>
        <div className='max-w-md'>
            <h1 className="text-9xl font-bold text-primary animate-fade-in-down">404</h1>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl animate-fade-in-down" style={{animationDelay: '0.1s'}}>
                Page Not Found
            </h2>
            <p className="mt-4 text-lg text-muted-foreground animate-fade-in-down" style={{animationDelay: '0.2s'}}>
                Oops! The page you’re looking for doesn’t exist. You might have mistyped the address or the page may have moved.
            </p>
            <Button asChild className="mt-8 animate-fade-in-down" style={{animationDelay: '0.3s'}}>
                <Link href="/">Go to Homepage</Link>
            </Button>
        </div>
    </div>
  );
}
