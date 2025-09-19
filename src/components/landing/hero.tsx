import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white">
      <Image
        src="https://images.wondershare.com/pdfelement/article-trans-image/1601/ocr-receipt-scanner-1.png"
        alt="Phone scanning a receipt"
        fill
        className="object-cover -z-10 brightness-50"
        data-ai-hint="receipt scan"
      />
      <div className="container flex flex-col gap-4 animate-fade-in-down">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Your AI-Powered Receipt Manager for Google Wallet.
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
          Effortlessly scan, categorize, and store your receipts in Google Wallet. Let our AI handle the details while you track your spending with powerful insights.
        </p>
        <div className="flex gap-4 mt-4 justify-center">
          <Button asChild size="lg">
            <Link href="/register">Get Started for Free</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
