export type PosterFormat = 'square' | 'vertical';

export interface Poster {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  isDigital: boolean;
  format: PosterFormat;
}

export const CATEGORIES = [
  "All", "Motivation", "Business", "Quotes", 
  "Spiritual", "Luxury", "Minimalist", "Dark Theme"
];

export const MOCK_POSTERS: Poster[] = [
  { id: "1", title: "Hustle & Grind", category: "Motivation", price: 1500, rating: 4.8, isDigital: false, format: 'square', image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800" },
  { id: "2", title: "Minimalist Geometry", category: "Abstract", price: 1200, rating: 4.5, isDigital: true, format: 'vertical', image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800" },
  { id: "3", title: "Spiritual Calm", category: "Spiritual", price: 1800, rating: 4.6, isDigital: true, format: 'square', image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&q=80&w=800" },
  { id: "4", title: "Inspirational Quote", category: "Quotes", price: 800, rating: 4.2, isDigital: true, format: 'vertical', image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800" },
  { id: "5", title: "Luxury Living", category: "Luxury", price: 3000, rating: 4.9, isDigital: false, format: 'square', image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=800" },
  { id: "6", title: "Flash Sale Friday", category: "Sales", price: 0, rating: 4.8, isDigital: true, format: 'square', image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800" },
  { id: "7", title: "We Are Hiring", category: "Hiring", price: 1500, rating: 4.5, isDigital: false, format: 'vertical', image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800" },
  { id: "8", title: "Morning Motivation", category: "Motivation", price: 200, rating: 4.2, isDigital: true, format: 'vertical', image: "https://images.unsplash.com/photo-1497561813398-8fcc7a37b567?auto=format&fit=crop&q=80&w=800" },
  { id: "9", title: "New Stock Alert", category: "Business", price: 1000, rating: 4.9, isDigital: false, format: 'vertical', image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" },
 
  
];