"use client";

import { motion } from "framer-motion";
import { ASSETS } from "@/data/assets";

const personas = [
  {
    image: ASSETS.personas.professional,
    role: "Working Professionals",
    scenario: "Parents living in another city? Ensure they get medical attention and companionship without you having to travel instantly.",
  },
  {
    image: ASSETS.personas.mother,
    role: "New Mothers",
    scenario: "Recovering from C-section or need help with a newborn? Get a certified neonatal nurse to guide you through the first weeks.",
  },
  {
    image: ASSETS.personas.patient,
    role: "Post-Surgery Patients",
    scenario: "Discharged from hospital but still need dressing changes and IV meds? Heal comfortably in your own bed.",
  },
];

export function WhoItsFor() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          Who Needs NSD?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-default"
            >
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6 shadow-lg">
                <img 
                  src={persona.image} 
                  alt={persona.role} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold text-white">{persona.role}</h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed px-2">
                {persona.scenario}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
