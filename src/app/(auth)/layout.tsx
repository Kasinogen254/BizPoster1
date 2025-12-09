import { AuthBanner } from '@/src/components/auth/auth-banner';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      
      {/* LEFT SIDE: Form Area */}
      <div className="flex flex-col justify-center items-center p-6 md:p-12 lg:p-16 bg-white relative">
        
        {/* Mobile Logo (Visible only on small screens) */}
        <div className="lg:hidden absolute top-6 left-6">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Biz<span className="text-blue-600">Poster</span>.
          </Link>
        </div>

        <div className="w-full max-w-[440px]">
           {children}
        </div>
        
        {/* Footer Links */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <Link href="#" className="hover:text-gray-900 mx-2">Privacy Policy</Link> 
          &bull; 
          <Link href="#" className="hover:text-gray-900 mx-2">Terms</Link>
        </div>
      </div>

      {/* RIGHT SIDE: Marketing Banner (Hidden on Mobile) */}
      <div className="hidden lg:block h-screen sticky top-0">
        <AuthBanner />
      </div>

    </div>
  );
}