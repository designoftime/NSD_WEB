"use client";

import { motion } from "framer-motion";
import { Shield, UserCheck, Stethoscope, Building2 } from "lucide-react";

export function Safety() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-4">
            <Shield size={16} /> Safety First
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Safety is Non-Negotiable
          </h2>
          <p className="text-gray-600 text-lg">
            We don't just aggregate nurses; we vet, train, and certify them. 
            Only the top 5% of applicants make it to the NSD platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <UserCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Background Verified</h3>
            <p className="text-gray-600">
              Complete criminal record clearance, address verification, and reference checks for every single nurse.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
            <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <Stethoscope size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Skill Certified</h3>
            <p className="text-gray-600">
              Practical exams and skill assessments to ensure clinical competence for critical tasks like ICU care.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
            <div className="w-16 h-16 mx-auto bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
              <Building2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Coming Soon: Tie-ups</h3>
            <p className="text-gray-600">
              We are partnering with top NABH hospitals to bring hospital-approved care protocols to your home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
