'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; // <--- IMPORT THIS
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { GoogleButton } from '@/src/components/auth/google-button';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 1. Call NextAuth SignIn
    const result = await signIn('credentials', {
      redirect: false, // We handle redirect manually to check for errors
      email: formData.email,
      password: formData.password,
    });

    setIsLoading(false);

    if (result?.error) {
      setError('Invalid email or password.');
    } else {
      // 2. Success! Redirect to dashboard (or Onboarding logic)
      router.push('/templates'); 
      router.refresh(); // Ensure the navbar updates
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <Link href="/" className="text-2xl font-bold text-gray-900 hidden lg:block mb-8">
            Biz<span className="text-blue-600">Poster</span>.
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back</h1>
        <p className="text-gray-500">Please enter your details to sign in.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        
        {/* Error Alert */}
        {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
                <AlertCircle size={16} /> {error}
            </div>
        )}

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="email" 
              required
              placeholder="you@business.com" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-gray-900"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
                  Forgot?
              </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type={showPassword ? "text" : "password"} 
              required
              placeholder="••••••••" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 bg-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-gray-900"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-base shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 size={20} className="animate-spin" /> : "Sign in"}
        </button>
      </form>

      <div className="space-y-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="bg-white px-3 text-gray-500">Or continue with</span></div>
        </div>

        <GoogleButton />

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account? <Link href="/register" className="text-blue-600 font-bold hover:underline">Create account</Link>
        </p>
      </div>
    </motion.div>
  );
}