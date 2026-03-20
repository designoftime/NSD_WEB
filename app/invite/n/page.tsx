'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { NURSE_ANDROID_APP_URL, NURSE_IOS_APP_URL } from '@/utils/contants';

function InviteNurseContent() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') || '';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 p-6 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-100">
        <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Join as an NSD Nurse!</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {refCode ? `You've been referred with code: ${refCode}. ` : ''}
          Download the NSD Nurse App to start your journey providing premium nursing services.
        </p>
        <a 
          href={NURSE_ANDROID_APP_URL} 
          target='_blank'
          className="block w-full bg-teal-600 text-white font-semibold py-3 px-4 rounded-xl mb-4 hover:bg-teal-700 transition"
        >
          Download for Android
        </a>
        <a 
          href={NURSE_IOS_APP_URL}
          target='_blank'
          className="block w-full bg-black text-white font-semibold py-3 px-4 rounded-xl hover:bg-gray-800 transition"
        >
          Download for iOS
        </a>
      </div>
    </div>
  );
}

export default function InviteNursePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <InviteNurseContent />
    </Suspense>
  );
}
