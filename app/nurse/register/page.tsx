'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import categoryService from '@/services/categoryService';
import NurseService from '@/services/nurse';
import { notifyError, notifySuccess } from '@/utils/toast';

const COLORS = {
  teal: '#0EA5A6',
  tealDark: '#0D8D8E',
  text: '#111827',
  sub: '#6B7280',
  border: '#BFE7E7',
  bg: '#FFFFFF',
  canvas: '#F8FAFC',
  link: '#0EA5A6',
  danger: '#EF4444',
  soft: '#F1FAFA',
  divider: '#E6F0F0',
};

const STEPS = [1, 2, 3, 4] as const;
type Step = (typeof STEPS)[number];

const REQUIRED_DOCS = ['aadhar', 'nursingRegistration', 'signature', 'passportPhoto'] as const;
type DocKey = (typeof REQUIRED_DOCS)[number];

const IMAGE_BASE = process.env.NEXT_PUBLIC_BASE_S3_URL || '';

const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const WORKING_STATUS_OPTIONS = [
  { label: 'Employed', value: 'Employed' },
  { label: 'Self-Employed', value: 'Self-Employed' },
  { label: 'Training', value: 'Training' },
  { label: 'Unemployed', value: 'Unemployed' },
];

const SECTOR_OPTIONS = [
  { label: 'Private Sector', value: 'Private Sector' },
  { label: 'Government Sector', value: 'Government Sector' },
];

const isBitmap = (p = '') =>
  ['png', 'jpg', 'jpeg', 'webp'].includes((p.split('.').pop() || '').toLowerCase());

function prettyLabel(key: DocKey) {
  switch (key) {
    case 'aadhar':
      return 'Aadhaar';
    case 'nursingRegistration':
      return 'Nursing Registration';
    case 'signature':
      return 'Signature';
    case 'passportPhoto':
      return 'Passport Photo';
    default:
      return key;
  }
}

export default function NurseRegisterPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>(1);

  // step 1
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  // const [phoneOtp, setPhoneOtp] = useState('');
  const [email, setEmail] = useState('');
  const [referredByCode, setReferredByCode] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(''); // yyyy-mm-dd

  // step 2
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [nursingRegistrationNumber, setNursingRegistrationNumber] = useState('');
  const [qualification, setQualification] = useState('');
  const [workingStatus, setWorkingStatus] = useState('');
  const [currentWorkingSector, setCurrentWorkingSector] = useState('');
  const [workingExperience, setWorkingExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [pincode, setPincode] = useState('');

  // step 3 files (web File)
  const [files, setFiles] = useState<Record<DocKey, File | null>>({
    aadhar: null,
    nursingRegistration: null,
    signature: null,
    passportPhoto: null,
  });

  // step 4 categories/services
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('');
  const [categoryServices, setCategoryServices] = useState<Record<string, any[]>>({});
  const [loadingServicesFor, setLoadingServicesFor] = useState<string>('');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [phoneVerified, setPhoneVerified] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const clearError = (key: string) => {
    if (!errors[key]) return;
    setErrors((p) => ({ ...p, [key]: '' }));
  };

  /* -------------------- STEP 4 DATA -------------------- */
  useEffect(() => {
    if (step !== 4) return;

    (async () => {
      setLoadingCats(true);
      try {
        const res = await categoryService.getCategoriesDropdown();
        const list = Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
          ? res.data
          : [];
        setCategories(list || []);
        if (list?.length) setActiveCategoryId(list[0]._id);
      } catch {
        notifyError('Unable to load categories');
      } finally {
        setLoadingCats(false);
      }
    })();
  }, [step]);

  const fetchServicesForCategory = useCallback(
    async (catId: string) => {
      if (!catId || categoryServices[catId]) return;
      setLoadingServicesFor(catId);
      try {
        const res = await categoryService.getNurseServicesDropdown(catId);
        const list = res?.data?.services || res?.data?.data?.services || [];
        setCategoryServices((prev) => ({ ...prev, [catId]: list }));
      } catch {
        notifyError('Unable to load services for this category');
      } finally {
        setLoadingServicesFor('');
      }
    },
    [categoryServices]
  );

  useEffect(() => {
    if (step === 4 && activeCategoryId) fetchServicesForCategory(activeCategoryId);
  }, [step, activeCategoryId, fetchServicesForCategory]);

  const currentServices = useMemo(() => {
    return activeCategoryId ? categoryServices[activeCategoryId] || [] : [];
  }, [activeCategoryId, categoryServices]);

  const selectedCountForCat = useCallback(
    (catId: string) => {
      const list = categoryServices[catId] || [];
      if (!list.length || !selectedServiceIds.length) return 0;
      const set = new Set(selectedServiceIds);
      return list.reduce((acc, srv) => (set.has(srv._id) ? acc + 1 : acc), 0);
    },
    [categoryServices, selectedServiceIds]
  );

  /* -------------------- OTP -------------------- */
// const handleSendOtp = async () => {
//   if (!/^\d{10}$/.test(phone.trim())) {
//     setErrors((p) => ({ ...p, phone: 'Enter 10 digit phone number first' }));
//     return;
//   }

//   try {
//     const res: any = await NurseService.sendOtpPhoneNumber({
//       phoneNumber: phone,
//       countryCode: '+91',
//     });

//     const otp = (res as any)?.otpSent; // backend must return it
//     if (otp != null) setPhoneOtp(String(otp));

//     notifySuccess(res?.data?.message || 'OTP sent successfully');
//   } catch (err: any) {
//     notifyError(err?.response?.data?.message || 'Failed to send OTP');
//   }
// };

  // const handleVerifyOtp = async () => {
  //   if (!phoneOtp.trim()) {
  //     setErrors((p) => ({ ...p, phoneOtp: 'Enter OTP' }));
  //     return;
  //   }
  //   try {
  //     const res: any = await NurseService.verifyOtpPhoneNumber({
  //       phoneNumber: phone,
  //       countryCode: '+91',
  //       otp: Number(phoneOtp),
  //     });
  //     setPhoneVerified(true);
  //     notifySuccess(res?.data?.message || res?.message || 'Phone verified');
  //   } catch (err: any) {
  //     setPhoneVerified(false);
  //     notifyError(err?.response?.data?.message || 'Failed to verify OTP');
  //   }
  // };

  /* -------------------- FILES -------------------- */
  const onPickFile = (key: DocKey, file: File | null) => {
    console.log(file , key)
    if (!file) return;
    setFiles((p) => ({ ...p, [key]: file }));
    setErrors((p) => ({ ...p, [key]: '' }));
  };

  const onRemoveFile = (key: DocKey) => {
    setFiles((p) => ({ ...p, [key]: null }));
  };

  /* -------------------- VALIDATIONS -------------------- */
  const validateStep1 = () => {
    const newErr: Record<string, string> = {};
    if (!fullName.trim()) newErr.fullName = 'Full name is required';

    if (!phone.trim()) newErr.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(phone.trim())) newErr.phone = 'Phone must be 10 digits';

    // if (!phoneVerified) newErr.phoneOtp = 'Please verify phone OTP';

    if (!email.trim()) newErr.email = 'Email is required';
    if (!gender) newErr.gender = 'Gender is required';
    if (!dob) newErr.dob = 'Date of birth is required';

    setErrors((p) => ({ ...p, ...newErr }));
    return Object.keys(newErr).length === 0;
  };

  const validateStep2 = () => {
    const newErr: Record<string, string> = {};
    // if (!/^\d{10}$/.test(alternatePhoneNumber.trim())) newErr.alternatePhoneNumber = 'Number must be 10 digits';
    if (!aadhaarNumber.trim()) newErr.aadhaarNumber = 'Aadhaar number is required';
    else if (!/^\d{12}$/.test(aadhaarNumber.trim())) newErr.aadhaarNumber = 'Aadhaar must be 12 digits';
    if (!nursingRegistrationNumber.trim())
      newErr.nursingRegistrationNumber = 'Nursing registration number is required';
    if (!qualification.trim()) newErr.qualification = 'Qualification is required';
    if (!workingStatus) newErr.workingStatus = 'Working status is required';
    if (!currentWorkingSector) newErr.currentWorkingSector = 'Current working sector is required';
    if (!workingExperience.trim()) newErr.workingExperience = 'Working experience is required';

    if (!street.trim()) newErr.street = 'Street is required';
    if (!city.trim()) newErr.city = 'City is required';
    if (!stateName.trim()) newErr.stateName = 'State is required';

    if (!pincode.trim()) newErr.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(pincode.trim())) newErr.pincode = 'Pincode must be 6 digits';

    setErrors((p) => ({ ...p, ...newErr }));
    return Object.keys(newErr).length === 0;
  };

  const validateStep3 = () => {
    const newErr: Record<string, string> = {};
    REQUIRED_DOCS.forEach((k) => {
      if (!files[k]) newErr[k] = `${prettyLabel(k)} is required`;
    });
    setErrors((p) => ({ ...p, ...newErr }));
    return Object.keys(newErr).length === 0;
  };

  const validateStep4 = () => {
    if (!selectedServiceIds.length) {
      setErrors((p) => ({ ...p, services: 'Please select at least 1 service' }));
      return false;
    }
    return true;
  };

  const goToStep = (target: Step) => {
    if (target === step) return;

    if (target < step) {
      setStep(target);
      return;
    }

    if (step === 1 && target === 2 && validateStep1()) setStep(2);
    if (step === 2 && target === 3 && validateStep2()) setStep(3);
    if (step === 3 && target === 4 && validateStep3()) setStep(4);
  };

  const handleNext = () => {
    if (step === 1) return validateStep1() && setStep(2);
    if (step === 2) return validateStep2() && setStep(3);
    if (step === 3) return validateStep3() && setStep(4);
  };

  const toggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) => {
      const next = prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId];
      if (next.length) setErrors((p) => ({ ...p, services: '' }));
      return next;
    });
  };


  const resetAll = () => {
    setStep(1);
    setFullName('');
    setPhone('');
    // setPhoneOtp('');
    setEmail('');
    setReferredByCode('');
    setGender('');
    setDob('');
    // setPhoneVerified(false);

    setAlternatePhoneNumber('');
    setAadhaarNumber('');
    setNursingRegistrationNumber('');
    setQualification('');
    setWorkingStatus('');
    setCurrentWorkingSector('');
    setWorkingExperience('');
    setSkills('');
    setStreet('');
    setCity('');
    setStateName('');
    setPincode('');

    setFiles({
      aadhar: null,
      nursingRegistration: null,
      signature: null,
      passportPhoto: null,
    });

    setCategories([]);
    setActiveCategoryId('');
    setCategoryServices({});
    setSelectedServiceIds([]);
    setErrors({});
  };

const handleSubmit = async () => {
  if (!validateStep4()) return;
  if (!validateStep3()) {
    setStep(3);
    return;
  }

  setIsSubmitting(true);

  try {
    const form = new FormData();

    /* ---------- STEP 1 ---------- */
    form.append('fullName', fullName);
    form.append('gender', gender);
    form.append('dateOfBirth', dob);
    form.append('phoneNumber', phone);
    form.append('email', email);
    form.append('countryCode', '+91');

    if (referredByCode) {
      form.append('referredByCode', referredByCode);
    }

    /* ---------- STEP 2 ---------- */
    if (alternatePhoneNumber) {
      form.append('alternatePhoneNumber', alternatePhoneNumber);
    }

    form.append('adharNumber', aadhaarNumber);
    form.append('nursingRegistrationNumber', nursingRegistrationNumber);
    form.append('qualification', qualification);
    form.append('workingStatus', workingStatus);
    form.append('currentWorkingSector', currentWorkingSector);
    form.append('workingExperience', workingExperience);

    if (skills) {
      form.append(
        'skills',
        JSON.stringify(
          skills.split(',').map(s => s.trim()).filter(Boolean)
        )
      );
    }

    form.append(
      'address',
      JSON.stringify({ street, city, state: stateName, pincode })
    );

    form.append(
      'currentLocation',
      JSON.stringify({
        address: street,
        city,
        state: stateName,
        pincode,
        location: { type: 'Point', coordinates: [75.8577, 22.7196] },
      })
    );

    /* ---------- STEP 3 FILES ---------- */
    if (!files.aadhar || !files.nursingRegistration || !files.signature || !files.passportPhoto) {
      notifyError('All documents are required');
      setIsSubmitting(false);
      return;
    }
     console.log(files, '<<--------------')
    form.append('aadhar', files.aadhar);
    form.append('nursingRegistration', files.nursingRegistration);
    form.append('signature', files.signature);
    form.append('passportPhoto', files.passportPhoto);

    /* ---------- STEP 4 SERVICES ---------- */
    form.append('selectedServiceIds', JSON.stringify(selectedServiceIds)); // ✅ safer key

    const res = await NurseService.registerAsNurse(form);

    notifySuccess(res?.data?.message || 'Application submitted');
    resetAll();
    router.replace('/nurse/thank-you');

  } catch (err: any) {
    notifyError(err?.response?.data?.message || 'Failed to register as nurse');
  } finally {
    setIsSubmitting(false);
  }
};



  /* -------------------- UI -------------------- */
  const inputBase =
    'w-full h-12 rounded-xl border-2 px-4 outline-none bg-white text-slate-900 placeholder:text-slate-400';
  const borderOk = 'border-teal-600';
  const borderErr = 'border-red-500';
  const clsInput = (k: string) => `${inputBase} ${errors[k] ? borderErr : borderOk}`;
  const ErrorText = ({ k }: { k: string }) =>
    errors[k] ? <div className="text-[11px] text-red-500 -mt-1 mb-3">{errors[k]}</div> : null;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Register as Nurse</h1>
      </div>

      {/* Stepper */}
      <div className="w-full mt-4">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            {STEPS.map((s) => {
              const active = step === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => goToStep(s)}
                  className={[
                    'w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm border-2 transition',
                    active
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white text-teal-600 border-teal-600 hover:bg-teal-50',
                  ].join(' ')}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 pb-28">
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-2">
              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Full name</div>
              <input className={clsInput('fullName')} value={fullName} onChange={(e) => { setFullName(e.target.value); clearError('fullName'); }} />
              <ErrorText k="fullName" />

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Phone Number</div>
              <div className="flex items-center gap-3">
                <div className="h-12 px-4 rounded-xl border-2 border-teal-600 bg-white flex items-center font-extrabold text-slate-900">+91 ▾</div>
                <input
                  className={`${inputBase} flex-1 ${errors.phone ? borderErr : borderOk}`}
                  value={phone}
                  maxLength={10}
                  inputMode="numeric"
                  onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); clearError('phone'); }}
                />
                {/* <button type="button" onClick={handleSendOtp} className="font-extrabold text-teal-700 hover:text-teal-800 whitespace-nowrap">
                  Send OTP
                </button> */}
              </div>
              <ErrorText k="phone" />

              {/* <div className="text-[13px] font-extrabold text-slate-900 mb-1">Verify Phone Number</div>
              <div className="flex items-center gap-3">
                <input
                  className={`${inputBase} flex-1 ${errors.phoneOtp ? borderErr : borderOk}`}
                  value={phoneOtp}
                  inputMode="numeric"
                  onChange={(e) => { setPhoneOtp(e.target.value.replace(/\D/g, '')); clearError('phoneOtp'); }}
                />
                <button type="button" onClick={handleVerifyOtp} className="font-extrabold text-teal-700 hover:text-teal-800 whitespace-nowrap">
                  Verify
                </button>
              </div>
              <ErrorText k="phoneOtp" /> */}

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Email</div>
              <input className={clsInput('email')} value={email} onChange={(e) => { setEmail(e.target.value); clearError('email'); }} />
              <ErrorText k="email" />

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Referral Code (optional)</div>
              <input className={`${inputBase} ${borderOk}`} value={referredByCode} onChange={(e) => setReferredByCode(e.target.value.toUpperCase())} />

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Gender</div>
              <select className={`${inputBase} ${errors.gender ? borderErr : borderOk}`} value={gender} onChange={(e) => { setGender(e.target.value); clearError('gender'); }}>
                <option value="">Select Gender</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
              <ErrorText k="gender" />

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Date of Birth</div>
              <input type="date" className={`${inputBase} ${errors.dob ? borderErr : borderOk}`} value={dob} onChange={(e) => { setDob(e.target.value); clearError('dob'); }} />
              <ErrorText k="dob" />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-2">
              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Alternate Phone Number</div>
              <input className={`${inputBase} ${borderOk}`} value={alternatePhoneNumber} onChange={(e) => setAlternatePhoneNumber(e.target.value.replace(/\D/g, ''))} />

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Aadhaar Number</div>
              <input className={clsInput('aadhaarNumber')} value={aadhaarNumber} maxLength={12} inputMode="numeric" onChange={(e) => { setAadhaarNumber(e.target.value.replace(/\D/g, '')); clearError('aadhaarNumber'); }} />
              <ErrorText k="aadhaarNumber" />

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Nursing Registration Number</div>
              <input className={clsInput('nursingRegistrationNumber')} value={nursingRegistrationNumber} onChange={(e) => { setNursingRegistrationNumber(e.target.value); clearError('nursingRegistrationNumber'); }} />
              <ErrorText k="nursingRegistrationNumber" />

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Qualification</div>
              <input className={clsInput('qualification')} value={qualification} onChange={(e) => { setQualification(e.target.value); clearError('qualification'); }} />
              <ErrorText k="qualification" />

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Working Status</div>
              <select className={`${inputBase} ${errors.workingStatus ? borderErr : borderOk}`} value={workingStatus} onChange={(e) => { setWorkingStatus(e.target.value); clearError('workingStatus'); }}>
                <option value="">Select Working Status</option>
                {WORKING_STATUS_OPTIONS.map((w) => (
                  <option key={w.value} value={w.value}>{w.label}</option>
                ))}
              </select>
              <ErrorText k="workingStatus" />

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Current Working Sector</div>
              <select className={`${inputBase} ${errors.currentWorkingSector ? borderErr : borderOk}`} value={currentWorkingSector} onChange={(e) => { setCurrentWorkingSector(e.target.value); clearError('currentWorkingSector'); }}>
                <option value="">Select Current Working Sector</option>
                {SECTOR_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <ErrorText k="currentWorkingSector" />

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Working Experience (years)</div>
              <input className={clsInput('workingExperience')} value={workingExperience} inputMode="numeric" onChange={(e) => { setWorkingExperience(e.target.value.replace(/\D/g, '')); clearError('workingExperience'); }} />
              <ErrorText k="workingExperience" />

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Skills (comma separated)</div>
              <input className={`${inputBase} ${borderOk}`} value={skills} onChange={(e) => setSkills(e.target.value)} />

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Street</div>
              <input className={clsInput('street')} value={street} onChange={(e) => { setStreet(e.target.value); clearError('street'); }} />
              <ErrorText k="street" />

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">City</div>
              <input className={clsInput('city')} value={city} onChange={(e) => { setCity(e.target.value); clearError('city'); }} />
              <ErrorText k="city" />

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">State</div>
              <input className={clsInput('stateName')} value={stateName} onChange={(e) => { setStateName(e.target.value); clearError('stateName'); }} />
              <ErrorText k="stateName" />

              <div className="text-[13px] font-extrabold text-slate-900 mb-1">Pincode</div>
              <input className={clsInput('pincode')} value={pincode} maxLength={6} inputMode="numeric" onChange={(e) => { setPincode(e.target.value.replace(/\D/g, '')); clearError('pincode'); }} />
              <ErrorText k="pincode" />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-3">
              <div className="text-[14px] font-extrabold text-slate-900">Upload Documents (Required)</div>

              {REQUIRED_DOCS.map((k) => (
                <div key={k} className="rounded-2xl border border-teal-200 bg-white p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[13px] font-extrabold text-slate-900">{prettyLabel(k)}</div>
                      {files[k] ? (
                        <div className="text-[12px] text-slate-600 truncate mt-1">📎 {files[k]!.name}</div>
                      ) : (
                        <div className="text-[12px] text-slate-500 mt-1">No file selected</div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="h-9 px-6 rounded-xl bg-teal-600 text-white font-extrabold cursor-pointer flex items-center justify-center">
                        {files[k] ? 'Change' : 'Pick'}
                        <input
                          type="file"
                          className="hidden"
                          accept={k === 'passportPhoto' ? 'image/*' : 'image/*,application/pdf'}
                          onChange={(e) => onPickFile(k, e.target.files?.[0] || null)}
                        />
                      </label>

                      {files[k] ? (
                        <button
                          type="button"
                          onClick={() => onRemoveFile(k)}
                          className="h-9 px-4 rounded-xl border border-red-500 text-red-600 font-extrabold"
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {errors[k] ? <div className="text-[11px] text-red-500 mt-2">{errors[k]}</div> : null}
                </div>
              ))}
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div>
              <div className="text-[16px] font-extrabold text-slate-900">
                What kind of nursing work do you want to take?
              </div>
              <div className="text-[12px] text-slate-500 mt-1">Pick from multiple categories and services.</div>

              <div className="mt-4">
                {loadingCats ? (
                  <div className="text-slate-500">Loading categories...</div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categories.map((cat) => {
                      const isActive = cat._id === activeCategoryId;
                      const count = selectedCountForCat(cat._id);
                      const iconUri = `${IMAGE_BASE}${cat.icon || ''}`;

                      return (
                        <button
                          key={cat._id}
                          type="button"
                          onClick={() => {
                            setActiveCategoryId(cat._id);
                            fetchServicesForCategory(cat._id);
                          }}
                          className={[
                            'rounded-2xl border p-3 text-center transition shadow-sm',
                            isActive ? 'border-teal-600 bg-teal-50' : 'border-slate-200 bg-white hover:bg-slate-50',
                          ].join(' ')}
                        >
                          <div className="mx-auto w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-2">
                            {cat?.icon && isBitmap(cat.icon) ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={iconUri} alt={cat.name} className="w-7 h-7 object-contain" />
                            ) : (
                              <div className="text-teal-700 font-extrabold">+</div>
                            )}
                          </div>

                          <div className={['text-[12px] font-extrabold leading-4', isActive ? 'text-teal-800' : 'text-slate-900'].join(' ')}>
                            {cat.name}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1">{count} selected</div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mt-5 rounded-2xl border border-teal-200 bg-white p-4">
                <div className="text-[13px] font-extrabold text-slate-900 mb-3">Select services</div>

                {loadingServicesFor === activeCategoryId ? (
                  <div className="text-slate-500">Loading services...</div>
                ) : currentServices.length === 0 ? (
                  <div className="text-slate-500 text-sm">No services found in this category.</div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {currentServices.map((srv) => {
                      const checked = selectedServiceIds.includes(srv._id);
                      return (
                        <button
                          type="button"
                          key={srv._id}
                          onClick={() => toggleService(srv._id)}
                          className="w-full text-left py-3 flex items-start gap-3"
                        >
                          <div
                            className={[
                              'mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center',
                              checked ? 'bg-teal-600 border-teal-600' : 'bg-white border-teal-600',
                            ].join(' ')}
                          >
                            {checked ? <span className="text-white text-xs font-black">✓</span> : null}
                          </div>

                          <div className="flex-1">
                            <div className={['text-[14px] font-extrabold', checked ? 'text-teal-800' : 'text-slate-900'].join(' ')}>
                              {srv.title}
                            </div>
                            {srv.description ? (
                              <div className="text-[12px] text-slate-500 line-clamp-1">{srv.description}</div>
                            ) : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {errors.services ? <div className="text-[11px] text-red-500 mt-2">{errors.services}</div> : null}
            </div>
          )}
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex gap-3 justify-end items-center">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="h-12 px-6 rounded-xl bg-slate-100 text-slate-900 font-extrabold"
            >
              Prev
            </button>
          ) : (
            <div className="w-[92px]" />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-10 h-12 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-[16px]"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className={[
                'w-60 h-12 rounded-xl text-white font-extrabold text-[16px]',
                isSubmitting ? 'bg-teal-300 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700',
              ].join(' ')}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
