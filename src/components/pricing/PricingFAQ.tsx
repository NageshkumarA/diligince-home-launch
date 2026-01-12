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
    <section className="relative h-full">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(210,64%,23%,0.01)] to-transparent pointer-events-none" />
      
      <div className="relative z-10 h-full">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-[hsl(210,64%,23%,0.05)] border border-[hsl(210,64%,23%,0.1)]">
            <HelpCircle className="h-5 w-5 text-[hsl(210,64%,23%)]" />
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            <Sparkles className="h-4 w-4 text-[hsl(210,64%,23%)] opacity-60" />
          </div>
          <p className="text-muted-foreground">
            Everything you need to know about our AI-powered pricing
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[hsl(210,64%,23%,0.1)] p-4 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b-[hsl(210,64%,23%,0.1)] last:border-b-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-[hsl(210,64%,23%)] transition-colors duration-300 py-4 hover:no-underline group">
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[hsl(210,64%,23%,0.1)] flex items-center justify-center text-sm font-bold text-[hsl(210,64%,23%)] group-hover:bg-[hsl(210,64%,23%)] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      {index + 1}
                    </span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pl-10 pb-4 text-base leading-relaxed">
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
