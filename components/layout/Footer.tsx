import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react";
import { ASSETS } from "@/data/assets";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src={ASSETS.logo.main} alt="NSD Logo" className="h-15 w-auto" />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              India's trusted home nursing platform. Certified care at your doorstep, booked from your phone.
            </p>
            <div className="flex gap-4">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer">
                <Facebook size={16} />
              </div>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer">
                <Twitter size={16} />
              </div>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer">
                <Instagram size={16} />
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#services" className="hover:text-primary">Services</Link></li>
              <li><Link href="#" className="hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary">Safety Guidelines</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>support@nsd-india.com</li>
              <li>+91 98765 43210 (Mon-Sat)</li>
              <li className="pt-2">
                <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                  Pre-launch Mode
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Nursing Service at Doorstep. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Made with <Heart size={12} className="text-red-500 fill-red-500" /> in India
          </div>
        </div>
      </div>
    </footer>
  );
}
