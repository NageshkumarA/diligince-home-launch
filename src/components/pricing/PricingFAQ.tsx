import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqData } from '@/data/pricingData';

export const PricingFAQ: React.FC = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <HelpCircle className="h-5 w-5 text-[hsl(210,64%,23%)]" />
          <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        </div>
        <p className="text-muted-foreground">
          Everything you need to know about our pricing
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium hover:text-[hsl(210,64%,23%)]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
