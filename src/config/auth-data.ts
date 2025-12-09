import { 
  Store, Smartphone, Megaphone, GraduationCap, 
  Laptop, ShoppingBag, Shirt, Zap, 
  Home, Trophy, Music, Sparkles // Added Sparkles here
} from 'lucide-react';

export const USER_ROLES = [
  { id: 'agent', label: 'Bingwa Agent', icon: Smartphone },
  { id: 'business', label: 'Business Owner', icon: Store },
  { id: 'marketer', label: 'Social Marketer', icon: Megaphone },
  { id: 'creator', label: 'Content Creator', icon: Music },
  { id: 'student', label: 'Student', icon: GraduationCap },
  { id: 'freelance', label: 'Freelancer', icon: Laptop },
];

export const INDUSTRIES = [
  { id: 'retail', label: 'Retail & Shop', icon: ShoppingBag },
  { id: 'fashion', label: 'Fashion', icon: Shirt },
  { id: 'tech', label: 'Electronics', icon: Zap },
  { id: 'beauty', label: 'Beauty', icon: Sparkles }, // Replaced custom function with Lucide icon
  { id: 'realestate', label: 'Real Estate', icon: Home },
  { id: 'sports', label: 'Sports', icon: Trophy },
];

export const REFERRAL_SOURCES = [
  "Friend / Colleague",
  "TikTok Ad",
  "Instagram Ad",
  "Google Search",
  "WhatsApp Status",
  "Other"
];