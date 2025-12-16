"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { submitPublicEnquiry } from "@/lib/enquiry.api";


export function Waitlist() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [form, setForm] = useState({
  fullName: "",
  mobileNumber: "",
  city: "",
  serviceNeeded: " ",
});

const [error, setError] = useState<string | null>(null);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setStatus("loading");

  try {
    const cleanedMobile = form.mobileNumber.replace(/\D/g, "").slice(-10);

    await submitPublicEnquiry({
      fullName: form.fullName.trim(),
      mobileNumber: cleanedMobile,
      city: form.city.trim(),
      serviceNeeded: form.serviceNeeded,
    });

    setStatus("success");
    setForm({
  fullName: "",
  mobileNumber: "",
  city: "",
  serviceNeeded: " ",
})
  } catch (err: any) {
    setStatus("idle");
    setError(
      err?.response?.data?.message ||
      err?.message ||
      "Something went wrong"
    );
  }
};
  return (
    <section id="waitlist" className="py-24 bg-teal-600 text-white overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-teal-500/50 text-teal-50 text-sm font-medium border border-teal-400/30">
              Limited Slots Available
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Be the First to Experience NSD
            </h2>
            <p className="text-teal-100 text-lg leading-relaxed">
              Join thousands of families waiting for safer, verified home nursing. 
              Get priority access and <span className="text-white font-bold decoration-wavy underline decoration-accent/50">20% off</span> your first booking.
            </p>
            <div className="flex flex-col gap-4 text-sm text-teal-100/80">
              <p>✓ Launching Soon in Top Metros</p>
              <p>✓ Early Access to Premium Features</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl text-gray-900">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <Check size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
                  <p className="text-gray-500">
                    We've sent a confirmation to your phone/email. We'll notify you as soon as we launch in your area.
                  </p>
                  <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
                    Register Another
                  </Button>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                  onSubmit={handleSubmit}
                >
                  <h3 className="text-xl font-bold mb-6">Join the Waitlist</h3>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                      {error}
                    </p>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <Input
                      placeholder="E.g. Rajesh Kumar"
                      required
                      value={form.fullName}
                      onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="9876543210"
                      required
                      value={form.mobileNumber}
                      maxLength={10}
                      inputMode="numeric"
                      onChange={(e) =>
                        setForm({ ...form, mobileNumber: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        City
                      </label>
                      <Input
                        placeholder="Indore"
                        required
                        value={form.city}
                        onChange={(e) =>
                          setForm({ ...form, city: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Service Needed
                      </label>
                      <select
                        value={form.serviceNeeded}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            serviceNeeded: e.target.value,
                          })
                        }
                        className="flex h-12 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <option>Other</option>
                        <option>Elderly Care</option>
                        <option>Post-Operative Care</option>
                        <option>Newborn Care</option>
                        <option>Chronic Care</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full text-lg h-12 mt-4 bg-accent hover:bg-accent/90 text-white" 
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Joining...
                      </>
                    ) : (
                      "Get Early Access"
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-gray-400 mt-4">
                    By joining, you agree to receive launch updates. No spam, ever.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-500/10 transform skew-x-12 translate-x-32" />
    </section>
  );
}
