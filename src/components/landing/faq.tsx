import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "How do I upload a receipt?",
        answer: "You can upload a receipt by navigating to your dashboard and clicking the 'Upload Receipt' button. You can either drag and drop a file or take a picture with your device's camera."
    },
    {
        question: "Is my data secure?",
        answer: "Yes, your data is secure. We use industry-standard encryption and security practices to protect your information."
    },
    {
        question: "Can I use this on my mobile device?",
        answer: "Absolutely! Our application is fully responsive and works great on all mobile devices and tablets."
    },
    {
        question: "What is Google Wallet integration?",
        answer: "Google Wallet integration allows you to save your digital receipts directly to your Google Wallet, making them easily accessible whenever you need them."
    },
    {
        question: "Is there a free trial?",
        answer: "Yes, you can get started with a free account to explore the basic features. We offer premium plans for more advanced functionality."
    }
]

export function FaqSection() {
  return (
    <section id="faq" className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
        <p className="text-lg text-muted-foreground mt-2">
          Have questions? We've got answers.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                    {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </section>
  )
}
