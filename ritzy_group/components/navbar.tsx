"use client";

import { useState, useEffect, useRef } from "react";

import { ChevronDown } from "lucide-react";
import Link from "next/link";


export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // Scrolling down & past 50px (reduced from 100px)
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => window.removeEventListener("scroll", controlNavbar);
    }
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setInfoOpen(false);
      }
    }
    if (infoOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [infoOpen]);

  return (
    <nav
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ease-in-out backdrop-blur-xl ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="bg-white/10 border border-white/20 rounded-2xl shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <img
                  src="/placeholder.svg?height=32&width=120&text=LOGO"
                  alt="Logo"
                  className="h-8 w-auto cursor-pointer"
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {/* ...other nav items... */}
                <div className="group relative">
                  <Link href="/operations">
                    <button className="text-black hover:text-black/80 px-3 py-2 text-lg font-semibold flex items-center gap-1 transition-colors relative">
                      Operations
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-full"></span>
                    </button>
                  </Link>
                </div>
                <div className="group relative">
                  <Link href="/exports">
                    <button className="text-black hover:text-black/80 px-3 py-2 text-lg font-semibold flex items-center gap-1 transition-colors">
                      Exports
                    </button>
                  </Link>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-full"></span>
                </div>
                <div className="group relative">
                  <Link href="/hrcompliance">
                    <button className="text-black hover:text-black/80 px-3 py-2 text-lg font-semibold flex items-center gap-1 transition-colors">
                      HR Compliance
                    </button>
                  </Link>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-full"></span>
                </div>
                {/* Information Dropdown */}
                <div className="group relative" ref={infoRef}>
                  <button
                    className="text-black hover:text-black/80 px-3 py-2 text-lg font-semibold flex items-center gap-1 transition-colors"
                    onClick={() => setInfoOpen((open) => !open)}
                  >
                    Information
                    <span
                      className={`transition-transform duration-300 ${
                        infoOpen ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-full"></span>
                  {infoOpen && (
                    <div
                      className="absolute left-0 mt-2 w-56 rounded-2xl shadow-xl bg-white/60 backdrop-blur-xl border border-white/40 p-2 flex flex-col z-50"
                      style={{
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
                        border: "1.5px solid rgba(255,255,255,0.25)",
                        background: "linear-gradient(135deg, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.55) 100%)",
                        backdropFilter: "blur(18px)",
                      }}
                    >
                      <a
                        href="#"
                        className="px-5 py-3 rounded-xl text-black text-lg font-semibold transition"
                      >
                        About Us
                      </a>
                      <a
                        href="#"
                        className="px-5 py-3 rounded-xl text-black text-lg font-semibold transition"
                      >
                        Products
                      </a>
                      <a
                        href="#"
                        className="px-5 py-3 rounded-xl text-black text-lg font-semibold transition"
                      >
                        Facilities
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Store Link */}
            <div className="group relative">
              <Link href="/contact">
                <button className="text-black hover:text-black/80 px-3 py-2 text-lg font-semibold flex items-center gap-1 transition-colors">
                  Contact
                </button>
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-full"></span>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-white hover:text-white/80 p-2">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
