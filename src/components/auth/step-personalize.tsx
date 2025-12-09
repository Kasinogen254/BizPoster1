'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { INDUSTRIES, USER_ROLES, REFERRAL_SOURCES } from '@/src/config/auth-data';
import { RegistrationData } from '@/src/types/auth'; // Import the type

interface StepPersonalizeProps {
  onFinish: (data: RegistrationData) => void;
  username?: string;
}

export function StepPersonalize({ onFinish, username = "there" }: StepPersonalizeProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [referral, setReferral] = useState<string | null>(null);

  const toggleRole = (id: string) => {
    if (selectedRoles.includes(id)) {
      setSelectedRoles(selectedRoles.filter(r => r !== id));
    } else {
      setSelectedRoles([...selectedRoles, id]);
    }
  };

  const isReady = selectedRoles.length > 0 && selectedIndustry;

  const handleSubmit = () => {
    onFinish({
        roles: selectedRoles,
        industry: selectedIndustry,
        referral: referral
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Welcome, {username}! 👋</h2>
        <p className="text-gray-500 mt-2">Help us customize your posters and deals.</p>
      </div>

      {/* Question 1: Role */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">Which describes you?</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {USER_ROLES.map((role) => {
            const isSelected = selectedRoles.includes(role.id);
            return (
              <button
                key={role.id}
                onClick={() => toggleRole(role.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200
                  ${isSelected 
                    ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 text-blue-700' 
                    : 'bg-white border-gray-100 hover:border-blue-200 hover:bg-gray-50 text-gray-600'}`}
              >
                <role.icon size={24} className={`mb-2 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="text-xs font-semibold">{role.label}</span>
                {isSelected && <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Question 2: Industry */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">Your Industry?</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {INDUSTRIES.map((ind) => {
            const isSelected = selectedIndustry === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200
                  ${isSelected 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md transform scale-[1.02]' 
                    : 'bg-white border-gray-100 hover:border-gray-300 text-gray-600'}`}
              >
                <ind.icon size={18} className={isSelected ? 'text-white' : 'text-gray-400'} />
                <span className="text-xs font-medium">{ind.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Question 3: Referral (Pills) */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-gray-900 uppercase tracking-wide">How did you hear about us?</label>
        <div className="flex flex-wrap gap-2">
          {REFERRAL_SOURCES.map((source) => (
            <button
              key={source}
              onClick={() => setReferral(source)}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all
                ${referral === source
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
            >
              {source}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 flex items-center justify-between">
        <button 
           onClick={() => onFinish({})} 
           className="text-gray-400 hover:text-gray-600 text-sm font-medium px-2"
        >
          Skip for now
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isReady}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none flex items-center gap-2"
        >
          Finish Setup <Check size={18} />
        </button>
      </div>
    </div>
  );
}