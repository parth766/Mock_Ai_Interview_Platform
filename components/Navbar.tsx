"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Sparkles, User, LogOut } from "lucide-react";

interface NavbarProps {
  userName: string;
  onSignOut?: () => void;
}

export default function Navbar({ userName, onSignOut }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <nav className="relative z-50 flex items-center justify-between w-full px-4 md:px-5 py-3 bg-[#0d0e14]/90 border border-white/10 rounded-2xl mb-2 md:mb-4 backdrop-blur-xl shadow-xl">
      {/* Brand Logo & Name */}
      <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
        <Image
          src="/logo.svg"
          alt="PrepWise Logo"
          width={34}
          height={28}
          style={{ width: "auto", height: "auto" }}
          className="object-contain group-hover:scale-105 transition-transform"
        />
        <h2 className="text-xl font-extrabold text-white tracking-wide group-hover:text-primary-100 transition-colors">
          PrepWise
        </h2>
      </Link>

      {/* Navigation Links with Dropdowns */}
      <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
        {/* Interviews Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("interviews")}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer py-1"
          >
            <span>Interviews</span>
            <ChevronDown className="w-4 h-4 opacity-70" />
          </button>
          {activeDropdown === "interviews" && (
            <div className="absolute top-full left-0 mt-2 w-52 bg-[#121420] border border-white/15 rounded-xl shadow-2xl p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
              <Link
                href="/interview"
                onClick={() => setActiveDropdown(null)}
                className="block px-3 py-2 rounded-lg text-xs hover:bg-white/10 hover:text-white transition-colors"
              >
                🚀 AI Mock Interviews
              </Link>
              <Link
                href="/interview"
                onClick={() => setActiveDropdown(null)}
                className="block px-3 py-2 rounded-lg text-xs hover:bg-white/10 hover:text-white transition-colors"
              >
                💻 Tech Stack Practice
              </Link>
              <Link
                href="/interview"
                onClick={() => setActiveDropdown(null)}
                className="block px-3 py-2 rounded-lg text-xs hover:bg-white/10 hover:text-white transition-colors"
              >
                🗣️ Communication & HR
              </Link>
            </div>
          )}
        </div>

        {/* Resume Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("resume")}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer py-1"
          >
            <span>Resume</span>
            <ChevronDown className="w-4 h-4 opacity-70" />
          </button>
          {activeDropdown === "resume" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#121420] border border-white/15 rounded-xl shadow-2xl p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
              <Link
                href="/"
                onClick={() => setActiveDropdown(null)}
                className="block px-3 py-2 rounded-lg text-xs hover:bg-white/10 hover:text-white transition-colors"
              >
                📄 AI Resume Review
              </Link>
              <Link
                href="/"
                onClick={() => setActiveDropdown(null)}
                className="block px-3 py-2 rounded-lg text-xs hover:bg-white/10 hover:text-white transition-colors"
              >
                ✨ Bullet Point Improver
              </Link>
            </div>
          )}
        </div>

        {/* Interview Coach */}
        <Link href="/" className="hover:text-white transition-colors py-1">
          Interview Coach
        </Link>

        {/* Pricing */}
        <Link href="/" className="hover:text-white transition-colors py-1">
          Pricing
        </Link>

        {/* Solutions Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("solutions")}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer py-1"
          >
            <span className="text-purple-300">Business Solutions</span>
            <ChevronDown className="w-4 h-4 text-purple-400" />
          </button>
          {activeDropdown === "solutions" && (
            <div className="absolute top-full left-0 mt-2 w-52 bg-[#121420] border border-white/15 rounded-xl shadow-2xl p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
              <Link
                href="/"
                onClick={() => setActiveDropdown(null)}
                className="block px-3 py-2 rounded-lg text-xs hover:bg-white/10 hover:text-white transition-colors"
              >
                🏢 Campus Hiring Solutions
              </Link>
              <Link
                href="/"
                onClick={() => setActiveDropdown(null)}
                className="block px-3 py-2 rounded-lg text-xs hover:bg-white/10 hover:text-white transition-colors"
              >
                ⚡ Enterprise AI Assessment
              </Link>
            </div>
          )}
        </div>

        {/* Contact Us */}
        <Link href="/" className="hover:text-white transition-colors py-1">
          Contact Us
        </Link>
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-3 shrink-0">
        {/* User Badge */}
        <div className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-colors">
          <Image
            src="/user-avatar.png"
            alt="User Avatar"
            width={22}
            height={22}
            className="rounded-full object-cover"
          />
          <span className="text-xs text-gray-200 font-semibold">{userName}</span>
        </div>

        {/* Sign Out Action */}
        {onSignOut && (
          <button
            type="button"
            onClick={onSignOut}
            className="text-xs bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 transition-all cursor-pointer flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        )}
      </div>
    </nav>
  );
}
