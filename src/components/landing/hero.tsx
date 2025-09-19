import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="container grid lg:grid-cols-2 gap-12 items-center py-12 md:py-24">
      <div className="flex flex-col gap-4 animate-fade-in-down">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
          Digitize Receipts, Visualize Spending.
        </h1>
        <p className="text-lg text-muted-foreground">
          Receipt Wallet helps you effortlessly track your expenses. Upload receipts, see where your money goes, and keep everything organized in one place.
        </p>
        <div className="flex gap-4 mt-4">
          <Button asChild size="lg">
            <Link href="/register">Get Started for Free</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-8 animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://www.hellobright.com/wp-content/uploads/2024/05/iStock-1322917455-1-1024x633.jpg"
            alt="A beautiful shot of snowy mountains."
            fill
            className="object-cover"
            data-ai-hint="snowy mountains"
          />
        </div>
      </div>
    </section>
  );
}
