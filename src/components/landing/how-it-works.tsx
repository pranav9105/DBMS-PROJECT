import { 
  UserPlus, 
  Scan, 
  Brain, 
  Wallet,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const steps = [
  {
    icon: <UserPlus className="w-8 h-8" />,
    title: 'Sign Up for Free',
    description: 'Create your account in seconds. No credit card required, no hidden fees.',
    details: ['Email verification', 'Secure account setup', 'Instant access'],
    color: 'bg-blue-500'
  },
  {
    icon: <Scan className="w-8 h-8" />,
    title: 'Scan Your Receipt',
    description: 'Simply take a photo or upload an image of any receipt from your device.',
    details: ['Camera integration', 'Drag & drop upload', 'Batch processing'],
    color: 'bg-primary'
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'AI Processes Data',
    description: 'Our advanced AI extracts and categorizes all information automatically.',
    details: ['Instant recognition', 'Smart categorization', '99.9% accuracy'],
    color: 'bg-purple-600'
  },
  {
    icon: <Wallet className="w-8 h-8" />,
    title: 'Save to Google Wallet',
    description: 'Your digitized receipt is securely stored in Google Wallet for easy access.',
    details: ['Google integration', 'Cloud storage', 'Mobile access'],
    color: 'bg-success'
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-background">
      <div className="container">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It Works in
            <span className="text-primary"> 4 Easy Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From signup to saved receipt in under 2 minutes. 
            No complex setup, no learning curve - just simple, powerful receipt management.
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-primary via-purple-600 to-success"></div>
            
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={step.title} className="fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                  <Card className="receipt-card group relative">
                    <CardContent className="p-6 text-center space-y-4">
                      {/* Step Number */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className={`${step.color} w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                          {index + 1}
                        </div>
                      </div>
                      
                      {/* Icon */}
                      <div className={`feature-icon w-16 h-16 ${step.color} mx-auto group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {step.icon}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Details */}
                      <div className="space-y-1">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-success" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={step.title} className="fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
              <Card className="receipt-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`feature-icon w-12 h-12 ${step.color} flex-shrink-0`}>
                      <div className="text-white">
                        {step.icon}
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`${step.color} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                          Step {index + 1}
                        </span>
                        <h3 className="text-lg font-semibold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-success" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="flex justify-center">
                  <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center fade-in-up">
          <Card className="receipt-card border-primary/20 bg-gradient-to-r from-primary-light/10 to-accent/10 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of users who have simplified their receipt management with ReceiptAI.
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                asChild
              >
                <Link href="/register">Start Your Free Account</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}