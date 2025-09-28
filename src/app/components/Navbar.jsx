"use client";

import Link from "next/link";
import { User, Heart, Search, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const { wishlistCount, isHydrated } = useWishlist();

  const isActive = (path) => pathname === path;

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  if (!show) return null;

  const navItems = [
    {
      label: "Furniture",
      href: "/furniture",
      subLinks: [
        { href: "/furniture/sofas", label: "Sofas & Seating" },
        { href: "/furniture/tables", label: "Tables & Desks" },
        { href: "/furniture/beds", label: "Beds & Wardrobes" },
      ],
    },
    {
      label: "Kitchen & Dining",
      href: "/kitchen-dining",
      subLinks: [
        { href: "/kitchen-dining/cookware", label: "Cookware" },
        { href: "/kitchen-dining/dining-sets", label: "Dining Sets" },
      ],
    },
    {
      label: "Home Decor",
      href: "/home-decor",
      subLinks: [
        { href: "/home-decor/lighting", label: "Lighting" },
        { href: "/home-decor/wall-art", label: "Wall Art" },
      ],
    },
    {
      label: "Home Furnishing",
      href: "/home-furnishing",
      subLinks: [
        { href: "/home-furnishing/carpets", label: "Carpets & Rugs" },
        { href: "/home-furnishing/cushions", label: "Cushions & Throws" },
      ],
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#A0937D] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-bold text-[#A0937D]">Furniq</span>
            </div>
          </Link>

          {/* Desktop Navbar */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Nav Links with Dropdowns */}
            {navItems.map(({ label, href, subLinks }) => (
              <div key={label} className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === label ? null : label)
                  }
                  className={`flex items-center gap-1 text-gray-700 hover:text-[#A0937D] transition-colors duration-200 font-medium ${
                    isActive(href) ? "text-[#A0937D]" : ""
                  }`}
                >
                  {label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      openDropdown === label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {openDropdown === label && subLinks && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {subLinks.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#A0937D] transition-colors"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Search + Icons */}
            <div className="flex items-center gap-4 ml-6">
              <div className="relative">
                <Search
                  className="cursor-pointer text-gray-600 hover:text-[#A0937D] transition-colors"
                  size={20}
                  onClick={() => setSearchOpen(!searchOpen)}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className={`absolute right-0 top-8 transition-all duration-300 bg-white text-gray-700 rounded-md px-3 py-2 shadow-lg border border-gray-200 ${
                    searchOpen
                      ? "w-40 sm:w-48 opacity-100"
                      : "w-0 opacity-0 overflow-hidden"
                  }`}
                  suppressHydrationWarning
                />
              </div>
              <Link href="/signIn">
                <User
                  className="cursor-pointer text-gray-600 hover:text-[#A0937D] transition-colors"
                  size={20}
                />
              </Link>
              <Link href="/liked-products" className="relative">
                <Heart
                  className="cursor-pointer text-gray-600 hover:text-[#A0937D] transition-colors"
                  size={20}
                />
                {isHydrated && wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 min-w-[18px] h-[18px] flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>
          </nav>

          {/* Mobile Navbar */}
          <div className="md:hidden flex items-center gap-4">
            <Search
              className="cursor-pointer text-gray-600 hover:text-[#A0937D] transition-colors"
              size={20}
              onClick={() => setSearchOpen(!searchOpen)}
            />
            <button
              className="focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <X className="text-gray-600" size={24} />
              ) : (
                <Menu className="text-gray-600" size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {navItems.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#A0937D] transition-colors rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}