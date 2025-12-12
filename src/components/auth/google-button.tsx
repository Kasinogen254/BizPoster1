'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface GoogleButtonProps {
  onClick?: () => void; // Allow optional custom click handling
}

export function GoogleButton({ onClick }: GoogleButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/templates';

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      if (onClick) onClick(); // Run any external logic if provided

      // We ask NextAuth to send them to /templates.
      // Our Middleware will intercept this if they are new and send them to /onboarding.
      await signIn('google', { callbackUrl });
      
    } catch (error) {
      console.error("Google Login Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <button 
      type="button"
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-xs group disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 size={20} className="animate-spin text-blue-600" />
      ) : (
        <>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.52 12.29C23.52 11.43 23.47 10.51 23.3 9.61H12V14.25H18.47C18.17 15.68 17.36 16.92 16.09 17.75V20.66H19.95C22.21 18.57 23.52 15.48 23.52 12.29Z" fill="#4285F4"/>
            <path d="M12 24C15.24 24 17.96 22.92 19.96 21.07L16.09 17.75C15.01 18.47 13.63 18.9 12 18.9C8.87 18.9 6.22 16.79 5.27 13.96H1.29V17.05C3.33 21.1 7.42 24 12 24Z" fill="#34A853"/>
            <path d="M5.27 13.96C5.03 13.11 4.88 12.22 4.88 11.29C4.88 10.36 5.02 9.47 5.27 8.61V5.53H1.29C0.46 7.18 0 9.17 0 11.29C0 13.41 0.46 15.4 1.29 17.05L5.27 13.96Z" fill="#FBBC05"/>
            <path d="M12 3.69C13.76 3.69 15.34 4.3 16.59 5.48L19.99 2.08C17.96 0.19 15.24 0 12 0C7.42 0 3.33 2.9 1.29 6.95L5.27 10.04C6.22 7.21 8.87 3.69 12 3.69Z" fill="#EA4335"/>
          </svg>
          <span>Continue with Google</span>
        </>
      )}
    </button>
  );
}