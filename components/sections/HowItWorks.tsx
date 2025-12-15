"use client";

import { motion } from "framer-motion";
import { Smartphone, UserPlus, FileSearch, HeartHandshake } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    title: "1. Install App",
    description: "Download NSD from App Store or Play Store.",
  },
  {
    icon: UserPlus,
    title: "2. Register",
    description: "Create a profile for yourself or a loved one.",
  },
  {
    icon: FileSearch,
    title: "3. Choose Service",
    description: "Select the care type and preferred time slot.",
  },
  {
    icon: HeartHandshake,
    title: "4. Care at Doorstep",
    description: "A certified nurse arrives at your home.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How NSD Works
          </h2>
          <p className="text-gray-600 text-lg">
            Getting professional home nursing care is now as easy as ordering food.
            Four simple steps to peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm px-4">
                {step.description}
              </p>

              {/* Connector Line (Desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-gray-200 -z-10" 
                     style={{ left: "calc(50% + 2rem)", width: "calc(100% - 4rem)" }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
