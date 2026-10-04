"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import CookieFooterLink from "@/components/CookieFooterLink";

export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto mt-20 mb-12 px-4 md:px-6 text-white space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left Brand Column */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt="PrepWise Logo"
              width={36}
              height={30}
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
            />
            <span className="text-xl font-extrabold text-white tracking-wide">
              PrepWise
            </span>
          </div>

          <p className="text-sm font-semibold text-gray-300">
            AI Practice Studio.
          </p>

          {/* System Status */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-gray-300">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="tracking-wider uppercase text-[10px] text-gray-400">
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all text-xs font-bold"
              aria-label="X"
            >
              ✕
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all text-xs font-bold"
              aria-label="YouTube"
            >
              ▶
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all text-xs font-bold"
              aria-label="Instagram"
            >
              📷
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all text-xs font-bold"
              aria-label="LinkedIn"
            >
              in
            </a>
          </div>
        </div>

        {/* Right Columns Navigation Grid */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
          {/* Column 1: USE CASES */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-400 tracking-wider uppercase text-[11px]">
              USE CASES
            </h4>
            <ul className="space-y-2.5 text-gray-300 font-medium">
              <li>
                <Link href="/interview" className="hover:text-white transition-colors">
                  Job Interviews
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Visa Interviews
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Resume Toolkit
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Communication
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  MBA Interviews
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Assessments
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: BUSINESS SOLUTIONS */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-400 tracking-wider uppercase text-[11px]">
              BUSINESS SOLUTIONS
            </h4>
            <ul className="space-y-2.5 text-gray-300 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  College Placement
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Outplacement
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Recruitment
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Visa Agencies
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Sales Training
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  AI Proctoring
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: RESOURCES */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-400 tracking-wider uppercase text-[11px]">
              RESOURCES
            </h4>
            <ul className="space-y-2.5 text-gray-300 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Trust Center
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Cookie Preference Line */}
      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <p>© {new Date().getFullYear()} PrepWise. All rights reserved.</p>
        <CookieFooterLink />
      </div>
    </footer>
  );
}
