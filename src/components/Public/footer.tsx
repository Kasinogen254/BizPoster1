import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <Link href="/" className="text-2xl font-bold text-white block mb-6">
            Biz<span className="text-blue-600">Poster</span>.
          </Link>
          <p className="mb-6 leading-relaxed">Empowering small businesses with instant, professional marketing tools. Made with ❤️ in Nairobi.</p>
          <div className="flex gap-4">
            {/* Social Placeholders */}
            {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 bg-gray-800 rounded-full hover:bg-blue-600 transition cursor-pointer flex items-center justify-center">
                    <span className="sr-only">Social Link</span>
                </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Product</h4>
          <ul className="space-y-3">
            <li><Link href="#" className="hover:text-white transition">Templates</Link></li>
            <li><Link href="#" className="hover:text-white transition">Pricing</Link></li>
            <li><Link href="#" className="hover:text-white transition">Features</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Support</h4>
          <ul className="space-y-3">
            <li><Link href="#" className="hover:text-white transition">FAQs</Link></li>
            <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-white transition">Help Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Legal</h4>
          <ul className="space-y-3">
            <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
          </ul>
        </div>

      </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 text-center text-xs">
          &copy; {new Date().getFullYear()} BizPoster Kenya. All rights reserved.
        </div>
    </footer>
  );
}