import { Check, Download, Layers } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Templates', href: '#templates' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Login', href: '/login' }, // Pointed to the actual auth route
];

export const STEPS_DATA = [
  { 
    icon: Layers, 
    title: "1. Choose a Template",
    desc: "Pick from hundreds of professionally designed layouts tailored for Kenyan businesses."
  },
  { 
    icon: Check, 
    title: "2. Enter Your Info",
    desc: "Type your product name, price, and upload your logo. The design updates instantly."
  },
  { 
    icon: Download, 
    title: "3. Download & Post",
    desc: "Get a high-quality image ready for your WhatsApp Status, Instagram, or TikTok."
  },
];
// Note: We can't export React components (icons) easily in pure JSON/Config 
// without making this file .tsx, so we will keep the text data here 
// and handle icons in the component for simplicity, or make this a .tsx file.
// For this example, we will keep the text separate.

export const BENEFITS_LIST = [
  "Super Fast Generation", 
  "No Design Skills Needed", 
  "Auto-Customized Posters", 
  "WhatsApp & TikTok Ready",
  "High Quality Downloads", 
  "Perfect for Agents"
];

export const PRICING_PLANS = [
  {
    name: "Free Plan",
    price: "Ksh 0",
    desc: "Limited templates with watermark.",
    action: "Get Started",
    highlight: false,
  },
  {
    name: "Weekly",
    price: "Ksh 99",
    desc: "Full access for 7 days. No watermarks.",
    action: "Select Plan",
    highlight: true,
  },
  {
    name: "Monthly",
    price: "Ksh 299",
    desc: "Best value for regular sellers.",
    action: "Select Plan",
    highlight: false,
  },
];