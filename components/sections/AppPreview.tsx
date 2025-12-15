"use client";

import { motion } from "framer-motion";
import { ASSETS } from "@/data/assets";

export function AppPreview() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-teal-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Book a Nurse in 3 Taps
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our app is designed for everyone—from tech-savvy youngsters to seniors. 
            Simple, clear, and easy to use.
          </p>
        </div>

        <div className="relative flex justify-center items-center gap-8 md:gap-16">
          
          {/* Mockup 1: Service List (Left, Tilted) */}
          <motion.div 
            initial={{ opacity: 0, y: 100, rotate: -15 }}
            whileInView={{ opacity: 1, y: 0, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden md:block w-72 h-[580px] bg-gray-900 rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden relative transform -translate-y-8"
          >
            {/* Screen Content Placeholder */}
            <div className="w-full h-full bg-white flex flex-col pt-8 px-4">
               <div className="w-full h-4 bg-gray-100 rounded mb-4" />
               <div className="flex gap-2 overflow-hidden mb-6">
                 {[1,2,3].map(i => <div key={i} className="w-20 h-20 rounded-xl bg-teal-100 flex-shrink-0" />)}
               </div>
               <div className="space-y-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="h-24 rounded-xl border border-gray-100 p-2 flex gap-3">
                     <div className="w-16 h-16 rounded-lg bg-gray-100" />
                     <div className="flex-1 space-y-2 pt-1">
                        <div className="h-3 w-24 bg-gray-200 rounded" />
                        <div className="h-2 w-16 bg-gray-100 rounded" />
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </motion.div>

          {/* Mockup 2: Booking Flow (Center, Straight) */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-80 h-[640px] bg-gray-900 rounded-[3.5rem] border-8 border-gray-900 shadow-2xl overflow-hidden relative z-10"
          >
            {/* Screen Content: Nurse Profile */}
            <div className="w-full h-full bg-white flex flex-col relative">
               <div className="h-64 bg-teal-50 relative">
                 <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                    <img src={ASSETS.hero.main} className="w-full h-full object-cover" alt="Nurse" />
                 </div>
               </div>
               <div className="pt-16 px-6 text-center">
                 <div className="h-6 w-48 bg-gray-800 rounded mx-auto mb-2" />
                 <div className="h-4 w-32 bg-gray-300 rounded mx-auto mb-6" />
                 
                 <div className="flex justify-center gap-4 mb-8">
                   <div className="h-16 w-20 bg-gray-50 rounded-xl" />
                   <div className="h-16 w-20 bg-gray-50 rounded-xl" />
                   <div className="h-16 w-20 bg-gray-50 rounded-xl" />
                 </div>

                 <div className="w-full h-12 bg-primary rounded-xl" />
               </div>
            </div>
          </motion.div>

          {/* Mockup 3: Confirmation (Right, Tilted) */}
          <motion.div 
            initial={{ opacity: 0, y: 100, rotate: 15 }}
            whileInView={{ opacity: 1, y: 0, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block w-72 h-[580px] bg-gray-900 rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden relative transform -translate-y-8"
          >
            {/* Screen Content: Success */}
            <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div className="h-6 w-32 bg-gray-800 rounded mb-2" />
                <div className="h-4 w-48 bg-gray-300 rounded text-center" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
