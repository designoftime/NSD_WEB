"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is NSD available in my city?",
    answer: "We are currently pre-launching in Mumbai, Bangalore, Delhi NCR, and Hyderabad. We plan to expand to other major cities within 6 months of launch.",
  },
  {
    question: "Who are the nurses on the platform?",
    answer: "All nurses on NSD are verified professionals with valid ANM/GNM/B.Sc Nursing degrees. They undergo background checks and our internal skill assessment before being listed.",
  },
  {
    question: "What will the services cost?",
    answer: "Our pricing is transparent and varies by service type (hourly vs. daily). You will see the exact cost upfront in the app before booking. No hidden charges.",
  },
  {
    question: "Is it safe to bring a stranger home?",
    answer: "Safety is our core promise. Apart from background verification, our app tracks check-in/check-out times, and we have a 24/7 support team to address any concerns immediately.",
  },
  {
    question: "Can I book a nurse for just one day?",
    answer: "Yes! You can book for as little as a 4-hour slot or for long-term monthly care depending on your needs.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(opne => opne === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="text-primary flex-shrink-0" />
                ) : (
                  <Plus className="text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed text-sm md:text-base border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
