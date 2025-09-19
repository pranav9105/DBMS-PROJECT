import { UserPlus, Upload, LayoutDashboard, Wallet } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus className="w-10 h-10 text-primary" />,
    title: 'Register or Login',
    description: 'Create your free account to get started in seconds.',
  },
  {
    icon: <Upload className="w-10 h-10 text-primary" />,
    title: 'Upload Receipts',
    description: 'Take a photo or drag & drop your receipt files.',
  },
  {
    icon: <LayoutDashboard className="w-10 h-10 text-primary" />,
    title: 'View Dashboard',
    description: 'See your spending stats, trends, and recent uploads.',
  },
  {
    icon: <Wallet className="w-10 h-10 text-primary" />,
    title: 'Add to Google Wallet',
    description: 'Keep all your important receipts in one secure place.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="container py-12 md:py-24 bg-secondary">
      <div className="text-center mb-12 animate-fall-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
        <p className="text-lg text-muted-foreground mt-2">
          Get control of your receipts in 4 simple steps.
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 top-10 bottom-10 w-px bg-border -translate-x-1/2 hidden md:block" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`flex gap-6 items-start animate-fall-in ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              style={{ animationDelay: `${0.1 * (index + 2)}s` }}
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center bg-background rounded-full w-20 h-20 border-4 border-secondary relative">
                  {step.icon}
                </div>
              </div>
              <div className={`pt-5 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
