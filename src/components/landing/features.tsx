import { 
  Scan, 
  Brain, 
  Wallet, 
  BarChart3, 
  Shield, 
  Zap,
  Clock,
  Tags
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: <Scan className="w-6 h-6 text-primary-foreground" />,
    title: 'Smart Receipt Scanning',
    description: 'Capture receipts instantly with your camera. Our AI extracts all important details automatically.',
    color: 'bg-primary'
  },
  {
    icon: <Brain className="w-6 h-6 text-primary-foreground" />,
    title: 'AI-Powered Categorization',
    description: 'Automatically categorize expenses with 99.9% accuracy. No manual sorting required.',
    color: 'bg-success'
  },
  {
    icon: <Wallet className="w-6 h-6 text-primary-foreground" />,
    title: 'Google Wallet Integration',
    description: 'Store digital receipts securely in Google Wallet for easy access anytime, anywhere.',
    color: 'bg-warning'
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-primary-foreground" />,
    title: 'Expense Analytics',
    description: 'Get detailed insights into your spending patterns with beautiful charts and reports.',
    color: 'bg-destructive'
  },
  {
    icon: <Shield className="w-6 h-6 text-primary-foreground" />,
    title: 'Bank-Level Security',
    description: 'Your data is protected with enterprise-grade encryption and security protocols.',
    color: 'bg-slate-600'
  },
  {
    icon: <Zap className="w-6 h-6 text-primary-foreground" />,
    title: 'Lightning Fast',
    description: 'Process receipts in under 3 seconds. No waiting, no delays - just instant results.',
    color: 'bg-purple-600'
  },
  {
    icon: <Clock className="w-6 h-6 text-primary-foreground" />,
    title: 'Smart Reminders',
    description: 'Never miss important receipts with intelligent reminders and expense tracking.',
    color: 'bg-blue-600'
  },
  {
    icon: <Tags className="w-6 h-6 text-primary-foreground" />,
    title: 'Custom Categories',
    description: 'Create custom expense categories that match your business or personal needs.',
    color: 'bg-green-600'
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need for
            <span className="text-primary"> Receipt Management</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From intelligent scanning to detailed analytics, we've built everything you need 
            to take control of your expenses and simplify your financial life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={feature.title} className="fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
              <Card className="receipt-card h-full group cursor-pointer border-0 shadow-md hover:shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className={`feature-icon w-12 h-12 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-20 fade-in-up">
          <Card className="receipt-card border-primary/20 bg-gradient-to-r from-primary-light/10 to-accent/10">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    <Brain className="w-4 h-4" />
                    AI Technology
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    Advanced AI Recognition
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our state-of-the-art AI can read receipts from any store, restaurant, or service provider. 
                    It automatically extracts merchant names, amounts, dates, and categories with incredible accuracy.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Supports 15+ languages</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Works with damaged or faded receipts</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Instant processing in under 3 seconds</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="receipt-card bg-card p-6 rounded-xl shadow-lg">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Grocery Store</span>
                        <span className="text-sm text-success">✓ Verified</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Amount</span>
                          <span className="text-sm font-medium">$45.67</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Date</span>
                          <span className="text-sm font-medium">Today</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Category</span>
                          <span className="text-sm font-medium text-primary">Food & Groceries</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}