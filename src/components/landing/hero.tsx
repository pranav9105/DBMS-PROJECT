import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

  return (
    <section className="container grid lg:grid-cols-2 gap-8 items-center py-12 md:py-24">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
          Digitize Receipts, Visualize Spending.
        </h1>
        <p className="text-lg text-muted-foreground">
          Receipt Wallet helps you effortlessly track your expenses. Upload receipts, see where your money goes, and keep everything organized in one place.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/register">Get Started for Free</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </div>
      <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
      </div>
    </section>
  );
}
