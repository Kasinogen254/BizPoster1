'use client';

import { useState } from 'react';
import { requestPasswordReset } from '@/src/actions/auth-reset';
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const result = await requestPasswordReset({ email });

    if (result.success) {
      setStatus('success');
      setMessage("If an account exists, we've sent a reset link.");
    } else {
      setStatus('error');
      setMessage(result.error || "Something went wrong.");
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle size={24} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Check your inbox</h2>
        <p className="text-gray-500 text-sm">{message}</p>
        <Link href="/login" className="text-blue-600 font-bold hover:underline block mt-4">
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
        <p className="text-gray-500 mt-2 text-sm">Enter your email and we&apos;ll send you a recovery link.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input 
              type="email" 
              required
              placeholder="you@business.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
        </div>

        {status === 'error' && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{message}</div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {status === 'loading' ? <Loader2 className="animate-spin" /> : <>Send Link <ArrowRight size={20} /></>}
        </button>
      </form>
      
      <div className="text-center">
        <Link href="/login" className="text-gray-500 text-sm hover:text-gray-900">Back to Login</Link>
      </div>
    </div>
  );
}