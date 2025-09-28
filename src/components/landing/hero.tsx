import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Play, CheckCircle, Zap, Shield } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-receipt-bg to-primary-light/20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      
      <div className="container relative py-15 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="space-y-8 fade-in-up">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-medium shadow-sm">
                <Zap className="w-4 h-4" />
                AI-Powered Receipt Management
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Your{' '}
                <span className="text-primary">AI-Powered Receipt{' '}</span>
                Manager for Google Wallet
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Effortlessly scan, organize, and secure your receipts with AI-driven categorization. 
                Stay on top of your expenses—hassle free.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>No credit card required</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                asChild
              >
                <Link href="/register">Start Scanning for Free</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold transition-all duration-300" 
                asChild
              >
                <Link href="#demo" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="pt-8 border-t border-border/50">
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Receipts Scanned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Users</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative lg:pl-8 fade-in-up stagger-2">
            <div className="relative">
              {/* Phone Mockup */}
              <div className="receipt-float">
                <div className="relative mx-auto w-80 h-[600px] bg-foreground rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden relative">
                    {/* Phone Screen Content */}
                    <div className="p-6 space-y-4">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-foreground">Receipt Scanner</h3>
                        <p className="text-sm text-muted-foreground">Scan to capture</p>
                      </div>
                      
                      {/* Scanner View */}
                      <div className="relative aspect-square bg-accent rounded-xl overflow-hidden">
                        <div className="scan-pulse absolute inset-4 border-2 border-primary rounded-lg"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
                            <div className="h-2 bg-muted rounded w-3/4"></div>
                            <div className="h-2 bg-muted rounded w-1/2"></div>
                            <div className="h-2 bg-primary rounded w-2/3"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="receipt-card p-3 rounded-xl">
                          <div className="w-8 h-8 bg-primary/20 rounded-lg mb-2"></div>
                          <div className="h-3 bg-muted rounded w-full mb-1"></div>
                          <div className="h-2 bg-muted rounded w-2/3"></div>
                        </div>
                        <div className="receipt-card p-3 rounded-xl">
                          <div className="w-8 h-8 bg-success/20 rounded-lg mb-2"></div>
                          <div className="h-3 bg-muted rounded w-full mb-1"></div>
                          <div className="h-2 bg-muted rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 right-14 receipt-card p-4 rounded-xl bg-card shadow-lg animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-xs font-medium">Receipt Saved!</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 left-12 receipt-card p-4 rounded-xl bg-card shadow-lg animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-xs font-medium">AI Processing</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
