"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, HeartPulse, Stethoscope, Baby, Activity, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ASSETS } from "@/data/assets";

const services = [
  {
    id: "elderly",
    title: "Elderly Care",
    description: "Compassionate companionship and medical support for seniors living alone.",
    icon: HeartPulse,
    image: ASSETS.services.elderly,
    duration: "Daily / Monthly",
  },
  {
    id: "post-op",
    title: "Post-Operative Care",
    description: "Professional wound dressing, medication management, and recovery support.",
    icon: Stethoscope,
    image: ASSETS.services.postOp,
    duration: "Hourly / Daily",
  },
  {
    id: "mother-baby",
    title: "Mother & Baby",
    description: "Expert care for new mothers and neonates during the critical postpartum period.",
    icon: Baby,
    image: ASSETS.services.newborn,
    duration: "Monthly",
  },
  {
    id: "chronic",
    title: "Chronic Care",
    description: "Ongoing monitoring and management for diabetes, hypertension, and other conditions.",
    icon: Activity,
    image: ASSETS.services.chronic,
    duration: "Custom Plans",
  },
  {
    id: "short-term",
    title: "Short-term Support",
    description: "Injection services, catheterization, and other specific nursing procedures.",
    icon: Clock,
    // Using a fallback if image not defined specifically for short-term, or reuse one
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop", 
    duration: "Per Visit",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Care at Home
            </h2>
            <p className="text-gray-600 text-lg">
              From critical medical support to daily assistance, our certified nurses cover a wide range of needs.
            </p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex" asChild>
            <Link href="#waitlist">View All Services</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                </div>
                <div className="text-xs font-semibold text-teal-600 bg-teal-50 inline-block px-2 py-1 rounded-md mb-3">
                  {service.duration}
                </div>
                <p className="text-gray-600 mb-6 line-clamp-2">
                  {service.description}
                </p>
                
                <Button variant="ghost" className="p-0 h-auto hover:bg-transparent hover:text-accent group-hover:translate-x-1 transition-all" asChild>
                  <Link href="#waitlist" className="flex items-center">
                    Coming Soon <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Button variant="outline" className="w-full" asChild>
            <Link href="#waitlist">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
