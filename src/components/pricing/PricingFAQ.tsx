import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqData } from '@/data/pricingData';

export const PricingFAQ: React.FC = () => {
  return (
    <section className="relative py-12">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(210,64%,23%,0.01)] to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-[hsl(210,64%,23%,0.05)] border border-[hsl(210,64%,23%,0.1)]">
            <HelpCircle className="h-5 w-5 text-[hsl(210,64%,23%)]" />
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            <Sparkles className="h-4 w-4 text-[hsl(210,64%,23%)] opacity-60" />
          </div>
          <p className="text-muted-foreground">
            Everything you need to know about our AI-powered pricing
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl border border-[hsl(210,64%,23%,0.1)] p-4 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b-[hsl(210,64%,23%,0.1)] last:border-b-0"
              >
                <AccordionTrigger className="text-left font-medium hover:text-[hsl(210,64%,23%)] transition-colors duration-300 py-4 hover:no-underline group">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[hsl(210,64%,23%,0.1)] flex items-center justify-center text-xs font-semibold text-[hsl(210,64%,23%)] group-hover:bg-[hsl(210,64%,23%)] group-hover:text-white transition-colors duration-300">
                      {index + 1}
                    </span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pl-8 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
