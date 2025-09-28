import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const faqs = [
  {
    question: "How accurate is the AI receipt recognition?",
    answer: "Our AI achieves 99.9% accuracy in reading receipts. It can handle various formats, languages, and even damaged or faded receipts. The system continuously learns and improves with each scan."
  },
  {
    question: "Is my financial data secure?",
    answer: "Absolutely. We use bank-level encryption (256-bit SSL) and follow industry-standard security protocols. Your data is stored securely and never shared with third parties. We're also GDPR and CCPA compliant."
  },
  {
    question: "How does Google Wallet integration work?",
    answer: "Once a receipt is processed, you can save it directly to your Google Wallet with one tap. This creates a digital copy that's accessible on all your devices and backed up automatically."
  },
  {
    question: "Can I scan receipts in different languages?",
    answer: "Yes! Our AI supports over 15 languages including English, Spanish, French, German, Italian, Portuguese, and more. It automatically detects the language and processes the receipt accordingly."
  },
  {
    question: "What file formats are supported for receipt uploads?",
    answer: "We support all common image formats including JPEG, PNG, HEIC, WebP, and PDF files. You can upload photos taken with your phone camera or scanned documents."
  },
  {
    question: "Is there a limit to how many receipts I can scan?",
    answer: "Free accounts can scan up to 50 receipts per month. Our premium plans offer unlimited scanning, advanced analytics, and additional features starting at $9.99/month."
  },
  {
    question: "Can I export my receipt data?",
    answer: "Yes, you can export your data in various formats including CSV, PDF, and Excel. This is perfect for tax preparation, expense reports, or accounting software integration."
  },
  {
    question: "How quickly are receipts processed?",
    answer: "Most receipts are processed in under 3 seconds. Complex or damaged receipts might take up to 10 seconds. You'll receive a notification once processing is complete."
  }
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Got Questions?
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked
            <span className="text-primary"> Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about ReceiptAI. 
            Can't find the answer you're looking for? Feel free to contact our support team.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* FAQ Accordion */}
          <div className="lg:col-span-2 fade-in-up">
            <Card className="receipt-card border-0 shadow-lg">
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`} 
                      className="border border-border/50 rounded-lg px-4 data-[state=open]:border-primary/50 transition-colors"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4 text-foreground font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Contact Support Card */}
          <div className="fade-in-up stagger-2">
            <Card className="receipt-card bg-gradient-to-br from-primary to-primary-hover text-primary-foreground border-0 shadow-lg sticky top-8">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Still Have Questions?</h3>
                  <p className="text-primary-foreground/80 text-sm leading-relaxed">
                    Our support team is here to help you get the most out of ReceiptAI.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="secondary"
                    className="w-full bg-white text-primary hover:bg-white/90 font-semibold"
                  >
                    <a href="mailto:support@receiptai.com" className="block w-full">
                      Contact Support
                    </a>
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10 font-semibold"
                  >
                    <a href="tel:1-800-RECEIPT" className="block w-full">
                      Call: 1-800-RECEIPT
                    </a>
                  </Button>
                </div>

                <div className="pt-4 border-t border-white/20 text-center">
                  <p className="text-xs text-primary-foreground/60">
                    Average response time: Under 2 hours
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="receipt-card mt-6 border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-4">Quick Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                    <span className="font-semibold text-success">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Response Time</span>
                    <span className="font-semibold text-primary">&lt; 2 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Support Channels</span>
                    <span className="font-semibold text-foreground">24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}