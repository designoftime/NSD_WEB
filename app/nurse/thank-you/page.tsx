'use client';

import { useRouter } from 'next/navigation';

export default function NurseThankYouPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center space-y-4 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm max-w-md w-full">
        <h1 className="text-2xl font-extrabold text-emerald-600">
          Registration Submitted 🎉
        </h1>

        <p className="text-slate-600">
          Your application has been submitted successfully.
        </p>

        <p className="text-sm text-slate-500">
          Our team will review your details and contact you soon.
        </p>

        {/* Button */}
        <button
          type="button"
          onClick={() => router.push('/')}
          className="mt-4 w-full h-11 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
