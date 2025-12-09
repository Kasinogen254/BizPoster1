'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { StepAccount } from '@/src/components/auth/step-account';
import { RegistrationData } from '@/src/types/auth';
import { registerUser } from '@/src/actions/auth';
import { signIn } from 'next-auth/react'; // <--- IMPORT THIS
import { Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAccountCreation = async (data: RegistrationData) => {
    setIsSubmitting(true);
    setError('');

    // 1. Create User in DB
    const result = await registerUser(data);

    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      // 2. Auto-Login (The Magic Trick)
      const loginResult = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (loginResult?.ok) {
        router.push('/onboarding');
      } else {
        // Fallback if auto-login fails for some reason
        router.push('/login');
      }
    }
  };

  return (
    <div className="space-y-6">
       <Link href="/" className="text-2xl font-bold text-gray-900 hidden lg:block mb-8">
            Biz<span className="text-blue-600">Poster</span>.
       </Link>

       {error && (
         <div className="bg-red-50 text-red-600 text-sm p-4 rounded-lg flex items-center gap-2 border border-red-100">
           ⚠️ {error}
         </div>
       )}

       {isSubmitting && (
         <div className="absolute inset-0 bg-white/50 z-50 flex items-center justify-center backdrop-blur-[2px] rounded-xl">
            <div className="flex flex-col items-center">
               <Loader2 className="animate-spin text-blue-600 mb-2" size={32} />
               <p className="text-sm font-bold text-gray-600">Securing your account...</p>
            </div>
         </div>
       )}

       <StepAccount onNext={handleAccountCreation} />
    </div>
  );
}