import { UploadCloud, BarChart3, Wallet, Lightbulb } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const features = [
  {
    icon: <UploadCloud className="w-8 h-8 text-primary" />,
    title: 'Upload Receipts Easily',
    description: 'Snap a photo or upload your receipts — no more lost papers.',
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: 'View Spending Insights',
    description: 'Track your monthly expenses and see where your money goes.',
  },
  {
    icon: <Wallet className="w-8 h-8 text-primary" />,
    title: 'Save Receipts to Google Wallet',
    description: 'Keep receipts digitally in your Wallet for easy access.',
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: 'Smart Suggestions',
    description: 'Get AI-powered suggestions for receipt categorization.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="container py-12 md:py-24">
      <div className="text-center mb-12 animate-pop-in">
        <h2 className="text-3xl md:text-4xl font-bold">Powerful Features for Your Finances</h2>
        <p className="text-lg text-muted-foreground mt-2">
          Everything you need to manage your receipts and expenses.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <div key={feature.title} className="animate-pop-in" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
            <Card className="flex flex-col items-center text-center p-6 bg-card/50 h-full">
              <CardHeader>
                <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardDescription>{feature.description}</CardDescription>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
