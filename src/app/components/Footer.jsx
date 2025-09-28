"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#ac9875] text-[#1F1B16] pt-6 pb-4 mt-10 relative overflow-hidden text-base">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E7D4B5]/40 via-[#F6E6CB] to-[#F6E6CB]" />

      <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
        
        {/* Logo & Social */}
        <div>
          <div className="flex justify-center sm:justify-start mb-3">
            <Image src="/images/logo5.png" alt="furniq" width={100} height={35} />
          </div>
          <p className="text-sm text-[#6B5E4F] italic mb-3">
            The Art of Better Living
          </p>
          <div className="flex justify-center sm:justify-start gap-4 text-[#A0937D]">
            <a href="#" className="hover:text-[#8B7F6C] transition transform hover:scale-110"><FaFacebookF size={18} /></a>
            <a href="#" className="hover:text-[#8B7F6C] transition transform hover:scale-110"><FaInstagram size={18} /></a>
            <a href="#" className="hover:text-[#8B7F6C] transition transform hover:scale-110"><FaPinterestP size={18} /></a>
            <a href="#" className="hover:text-[#8B7F6C] transition transform hover:scale-110"><FaYoutube size={18} /></a>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-base mb-2 text-[#1F1B16] border-b border-[#A0937D]/50 pb-1">
            Customer Service
          </h3>
          <ul className="space-y-1 text-base text-[#6B5E4F]">
            <li><a href="#" className="hover:text-[#8B7F6C] transition">Cancellation Policy</a></li>
            <li><a href="#" className="hover:text-[#8B7F6C] transition">Service Assurance / Warranty</a></li>
            <li><a href="#" className="hover:text-[#8B7F6C] transition">FAQ</a></li>
            <li><a href="#" className="hover:text-[#8B7F6C] transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="font-semibold text-base mb-2 text-[#1F1B16] border-b border-[#A0937D]/50 pb-1">
            About HomeTown
          </h3>
          <ul className="space-y-1 text-base text-[#6B5E4F]">
            <li><a href="#" className="hover:text-[#8B7F6C] transition">About Us</a></li>
            <li><a href="#" className="hover:text-[#8B7F6C] transition">Partner with Us</a></li>
            <li><a href="#" className="hover:text-[#8B7F6C] transition">Corporate Website</a></li>
            <li><a href="#" className="hover:text-[#8B7F6C] transition">Store Locator</a></li>
            <li><a href="#" className="hover:text-[#8B7F6C] transition">Sitemap</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-base mb-2 text-[#1F1B16] border-b border-[#A0937D]/50 pb-1">
            Contact Us
          </h3>
          <ul className="space-y-1 text-base text-[#6B5E4F]">
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Mail className="text-[#A0937D]" size={16} />
              <span>care@furniq.in</span>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Phone className="text-[#8B7F6C]" size={16} />
              <span>08069252525 (10AM - 7PM)</span>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <MapPin className="text-[#A0937D]" size={16} />
              <span>Store Locator</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="relative max-w-sm mx-auto mt-6 bg-[#A0937D] rounded-lg shadow-sm p-4 text-center">
        <h3 className="text-white text-base font-semibold mb-2">Subscribe Now!</h3>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="w-full sm:flex-1 px-3 py-2 rounded-md text-gray-900 focus:outline-none shadow-sm text-base"
          />
          <button
            type="submit"
            className="bg-[#1F1B16] text-white px-4 py-2 rounded-md hover:bg-[#6B5E4F] transition w-full sm:w-auto text-base shadow"
          >
            Subscribe →
          </button>
        </form>
        <p className="text-sm text-[#F6E6CB] mt-1">
          Join our VIP list for inspiration & updates.
        </p>
      </div>

      {/* Locations */}
      <div className="relative max-w-4xl mx-auto text-center mt-6 text-base text-[#6B5E4F] px-2">
        <p className="font-semibold text-[#1F1B16] mb-1 text-base tracking-wide">Locations</p>
        <p className="leading-relaxed">
          Aurangabad | Ahmedabad | Bhubaneswar | Guwahati | Hyderabad | Kolkata | Lucknow | Nagpur | Nashik | Patna | Pune | Raipur | Siliguri | Visakhapatnam
        </p>
      </div>

      {/* Bottom Links */}
      <div className="relative border-t border-[#A0937D]/40 mt-6 pt-3 flex flex-col sm:flex-row items-center justify-between gap-1 text-base text-[#6B5E4F] max-w-7xl mx-auto px-4 text-center sm:text-left">
        <p>© 2025 HT Interiors</p>
        <div className="flex flex-wrap justify-center sm:justify-end gap-3">
          <a href="#" className="hover:text-[#8B7F6C] transition">Terms</a>
          <a href="#" className="hover:text-[#8B7F6C] transition">Privacy</a>
          <a href="#" className="hover:text-[#8B7F6C] transition">Refund</a>
          <a href="#" className="hover:text-[#8B7F6C] transition">Shipping</a>
          <a href="#" className="hover:text-[#8B7F6C] transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}