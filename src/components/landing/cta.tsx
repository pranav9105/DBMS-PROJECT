import { Button } from '@/components/ui/button';
import { Sparkles, Zap } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      
      <div className="container relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-cyan-400" />
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-6">
            Ready to Revolutionize Your Receipt Management?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of smart users who are already saving time and money with our AI-powered platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
              <Zap className="w-4 h-4 mr-2" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="border-cyan-500 text-cyan-400">
              Schedule a Demo
            </Button>
          </div>
          
          <p className="text-slate-400 text-sm mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}