'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, Lock, Eye, EyeOff, CheckCircle2, ArrowRight, Loader2, AlertCircle, XCircle } from 'lucide-react';
import { GoogleButton } from './google-button';
import { RegistrationData } from '@/src/types/auth';
import { sendOtp, verifyOtpAction } from '@/src/actions/otp';

interface StepAccountProps {
  onNext: (data: RegistrationData) => void;
}

export function StepAccount({ onNext }: StepAccountProps) {
  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  
  // --- UI STATE ---
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // NEW: Status state to replace alerts
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  // --- VERIFICATION STATE ---
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // --- HELPERS ---
  const isUsernameValid = formData.username.trim().length >= 3;
  const isEmailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  
  const hasMinLength = formData.password.length >= 8;
  const hasNumber = /\d/.test(formData.password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
  const isPasswordStrong = hasMinLength && hasNumber && hasSpecial;

  // --- HANDLERS ---

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setStatus(null); // Clear errors on typing
    
    if (field === 'email' && emailVerified) {
      setEmailVerified(false);
      setEmailSent(false);
      setOtp(['', '', '', '', '', '']);
    }
  };

  const showStatus = (type: 'success' | 'error', message: string) => {
    setStatus({ type, message });
    // Auto-hide after 5 seconds
    setTimeout(() => setStatus(null), 5000);
  };

  // 1. Send OTP
  const handleSendCode = async () => {
    if (!isEmailFormatValid) return;
    setIsLoading(true);
    setStatus(null);
    
    const result = await sendOtp(formData.email);
    
    setIsLoading(false);
    
    if (result.success) {
        setEmailSent(true);
        showStatus('success', `Code sent to ${formData.email}`);
    } else {
        showStatus('error', "Failed to send email. If testing, ensure you use your verified Resend email.");
    }
  };

  // 2. Verify OTP
  const handleVerifyOtp = async () => {
    setIsLoading(true);
    setStatus(null);
    const code = otp.join('');
    
    const result = await verifyOtpAction(formData.email, code);

    setIsLoading(false);

    if (result.success) {
        setEmailVerified(true);
        showStatus('success', "Email verified successfully!");
    } else {
        showStatus('error', result.error || "Invalid Code. Please try again.");
        setOtp(['','','','','','']); // Reset inputs
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = () => {
    if (isUsernameValid && isPasswordStrong && emailVerified) {
      onNext(formData);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create an account</h1>
        <p className="text-gray-500 mt-2">Start creating professional posters today.</p>
      </div>

      {/* --- NOTIFICATION AREA (Replaces Alert) --- */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className={`p-4 rounded-xl flex items-start gap-3 text-sm font-medium border ${
              status.type === 'success' 
                ? 'bg-green-50 text-green-700 border-green-200' 
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
            ) : (
              <XCircle className="shrink-0 mt-0.5" size={18} />
            )}
            <div>{status.message}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-5">
        
        {/* --- USERNAME --- */}
        <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Username</label>
            <div className="relative group">
                <User className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Choose a username" 
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border outline-none transition-all
                    ${formData.username.length > 0 && !isUsernameValid 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                />
            </div>
        </div>

        {/* --- PASSWORD --- */}
        <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <div className="relative group">
                <Lock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a strong password" 
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 bg-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-gray-900"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
            
            {formData.password.length > 0 && !isPasswordStrong && (
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 mt-2 text-xs text-orange-800 space-y-1">
                    <p className="font-bold flex items-center gap-1">
                        <AlertCircle size={12} /> Password must contain:
                    </p>
                    <div className="flex gap-4">
                        <span className={hasMinLength ? "text-green-600" : "opacity-70"}>• 8+ Chars</span>
                        <span className={hasNumber ? "text-green-600" : "opacity-70"}>• Number</span>
                        <span className={hasSpecial ? "text-green-600" : "opacity-70"}>• Symbol</span>
                    </div>
                </div>
            )}
        </div>

        {/* --- EMAIL --- */}
        <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <div className="relative group">
                <Mail className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={emailSent} 
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border outline-none transition-all
                    ${emailVerified 
                        ? 'border-green-500 bg-green-50 text-green-900' 
                        : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}`}
                />
                
                {emailVerified ? (
                    <div className="absolute right-3 top-3.5 flex items-center gap-1 text-green-600 text-sm font-bold">
                        <CheckCircle2 size={18} /> Verified
                    </div>
                ) : (
                    !emailSent && isEmailFormatValid && (
                        <button 
                            onClick={handleSendCode}
                            disabled={isLoading}
                            className="absolute right-2 top-2 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-black transition disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 size={14} className="animate-spin" /> : "Verify Email"}
                        </button>
                    )
                )}
            </div>
        </div>

        {/* --- OTP SECTION --- */}
        {emailSent && !emailVerified && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             className="bg-blue-50 rounded-xl p-4 border border-blue-100"
           >
             <p className="text-xs text-blue-700 font-medium mb-3">
               Security Code sent to <span className="font-bold">{formData.email}</span>
             </p>
             <div className="flex justify-between gap-2 mb-4">
               {otp.map((digit, idx) => (
                 <input
                   key={idx}
                   id={`otp-${idx}`}
                   type="text"
                   maxLength={1}
                   value={digit}
                   onChange={(e) => handleOtpChange(idx, e.target.value)}
                   className="w-full h-12 text-center rounded-lg border border-blue-200 bg-white text-blue-900 font-bold text-lg focus:border-blue-500 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                 />
               ))}
             </div>
             
             <div className="flex gap-3">
                <button 
                    onClick={() => { setEmailSent(false); setOtp(['','','','','','']); setStatus(null); }}
                    className="flex-1 py-2 rounded-lg text-xs font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
                >
                    CHANGE EMAIL
                </button>
                <button 
                    onClick={handleVerifyOtp}
                    disabled={isLoading || otp.join('').length < 6}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Confirm Code"}
                </button>
             </div>
           </motion.div>
        )}
      </div>

      <div className="pt-2">
          <button
            onClick={handleSubmit}
            disabled={!isUsernameValid || !isPasswordStrong || !emailVerified}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
          >
            Create Account <ArrowRight size={20} />
          </button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div></div>
        <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">Or continue with</span></div>
      </div>

      <GoogleButton />

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account? <a href="/login" className="text-blue-600 font-bold hover:underline">Log in</a>
      </p>
    </motion.div>
  );
}