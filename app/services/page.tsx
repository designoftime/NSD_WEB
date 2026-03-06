"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import { Navbar } from "@/components/layout/Navbar";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-16 px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"> Our Nursing Services </h1>
            <p className="text-gray-600 text-xl leading-relaxed">
              Professional, certified nursing care delivered directly to your doorstep. We provide a range of specialized services tailored to your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl transition-all duration-300"
              >
                <Link href={`/services/${service.slug}`} className="block h-full">
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

                    <div className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-all">
                      View <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
