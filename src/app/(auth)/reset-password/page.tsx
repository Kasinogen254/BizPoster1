'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from '@/src/actions/auth-reset';
import { Lock, Loader2 } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !email) {
      setMessage("Invalid link");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setStatus('loading');
    const result = await resetPassword(token, email, formData);

    if (result.success) {
      router.push('/login?reset=success');
    } else {
      setStatus('error');
      setMessage(result.error || "Failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Set New Password</h1>
        <p className="text-gray-500 mt-2 text-sm">Create a strong password for your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-gray-700">New Password</label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input 
              type="password" required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500"
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input 
              type="password" required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500"
              onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>
        </div>

        {message && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{message}</div>}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {status === 'loading' ? <Loader2 className="animate-spin" /> : "Reset Password"}
        </button>
      </form>
    </div>
  );
}