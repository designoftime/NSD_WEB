"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ASSETS } from "@/data/assets";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-br from-teal-50 via-white to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* Content */}
          <div className="flex-1 text-center md:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/50 text-teal-800 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                Coming Soon to Major Indian Cities
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Certified Nursing Care <br className="hidden md:block" />
                <span className="text-primary">At Your Doorstep</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
                India's first app to book verified home nurses instantly. 
                Expert care for elders, post-op recovery, and newborns—just a tap away.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start mb-10">
                <Button asChild size="lg" variant="accent" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full">
                  <Link href="#waitlist">
                    Join the Waitlist <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full border-2">
                  <Link href="#waitlist">
                    Get Launch Updates
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-teal-500" />
                  <span>100% Certified Nurses</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-teal-500" />
                  <span>Background Verified</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Visual */}
          <div className="flex-1 relative w-full max-w-lg mx-auto md:max-w-none">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10"
            >
              {/* Main Image Masked */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] md:aspect-square lg:aspect-[4/3]">
                <img 
                  src={ASSETS.hero.main} 
                  alt="Nurse caring for patient" 
                  className="object-cover w-full h-full"
                />
                
                {/* Float Card 1 */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-teal-100 flex items-center gap-4"
                >
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Booking Confirmed</h4>
                    <p className="text-xs text-gray-500">Nurse Anjali is on her way</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Decorative Blobs */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red-200/20 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
