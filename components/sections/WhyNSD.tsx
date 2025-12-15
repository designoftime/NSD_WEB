"use client";

import { motion } from "framer-motion";
import { Check, MapPin, Languages, ShieldCheck, Home } from "lucide-react";
import { ASSETS } from "@/data/assets";

const features = [
  {
    icon: Languages,
    title: "Care in Your Language",
    description: "Our nurses speak local languages (Hindi, Marathi, Kannada, etc.) to ensure clear communication with patients and elders.",
  },
  {
    icon: ShieldCheck,
    title: "Verified & Certified",
    description: "Every nurse undergoes rigorous background checks and creative skills verification. Safety is our #1 priority.",
  },
  {
    icon: MapPin,
    title: "City-Wide Coverage",
    description: "Launching soon in Mumbai, Bangalore, Delhi, and Hyderabad, covering even remote residential areas.",
  },
  {
    icon: Home,
    title: "Hospital Standards at Home",
    description: "We bring ICU-grade protocols and infection control standards right to your bedroom.",
  },
];

export function WhyNSD() {
  return (
    <section id="why-nsd" className="py-20 bg-teal-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why India Trusts NSD
            </h2>
            <p className="text-gray-600 text-lg mb-10">
              We understand that letting someone into your home requires immense trust. 
              That's why we built NSD with India's unique family needs in mind.
            </p>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white text-teal-600 flex items-center justify-center shadow-sm">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 w-full relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={ASSETS.features.india} 
                alt="Happy Indian family at home" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="font-bold text-lg mb-1">“Hospital-grade care, right at your doorstep!”</p>
                  <p className="text-sm opacity-90">— Serving Indore with compassion and trust</p>
                </div>
              </div>
            </div>
            
            {/* Pattern/Decor */}
            <div className="absolute -z-10 top-1/2 right-0 transform translate-x-1/2 -migrate-y-1/2 w-64 h-64 bg-teal-200 rounded-full blur-3xl opacity-30" />
          </div>

        </div>
      </div>
    </section>
  );
}
