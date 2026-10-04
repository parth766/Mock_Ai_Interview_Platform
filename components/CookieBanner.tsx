"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Settings, ShieldCheck, X } from "lucide-react";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "prepwise_cookie_consent_v2";

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    setMounted(true);
    const checkConsent = () => {
      try {
        if (typeof window !== "undefined" && window.location.search.includes("reset_cookies=true")) {
          localStorage.removeItem(STORAGE_KEY);
          setIsVisible(true);
          return;
        }
        const savedConsent = localStorage.getItem(STORAGE_KEY);
        if (!savedConsent) {
          setIsVisible(true);
        }
      } catch (e) {
        setIsVisible(true);
      }
    };

    checkConsent();

    const handleOpenEvent = () => {
      setIsVisible(true);
      setShowPreferences(true);
    };

    const handleResetEvent = () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      setIsVisible(true);
      setShowPreferences(false);
    };

    window.addEventListener("open-cookie-banner", handleOpenEvent);
    window.addEventListener("reset-cookie-banner", handleResetEvent);
    return () => {
      window.removeEventListener("open-cookie-banner", handleOpenEvent);
      window.removeEventListener("reset-cookie-banner", handleResetEvent);
    };
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      accepted: true,
      preferences: {
        essential: true,
        analytics: true,
        marketing: true,
      },
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
    } catch (e) {}
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    const consentData = {
      accepted: true,
      preferences,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
    } catch (e) {}
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!mounted || (!isVisible && !showPreferences)) return null;

  return (
    <>
      {/* Compact Cookie Banner Bar */}
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#07080a] text-white border-t border-white/20 px-4 py-3 md:px-6 md:py-3.5 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs md:text-sm">
            {/* Logo & Brief Description */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 shrink-0">
                <Image
                  src="/logo.svg"
                  alt="PrepWise Logo"
                  width={24}
                  height={20}
                  style={{ width: "auto", height: "auto" }}
                  className="object-contain"
                />
                <span className="font-bold text-xs text-primary-100 tracking-wider">
                  PREPWISE
                </span>
              </div>

              <div className="text-gray-300 leading-tight">
                <span className="font-semibold text-white">We use cookies</span> to give you the best experience. View our{" "}
                <button
                  type="button"
                  onClick={() => setShowPreferences(true)}
                  className="underline font-medium text-white hover:text-blue-400 cursor-pointer transition-colors"
                >
                  Cookie policy
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="text-xs font-semibold underline text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Customize cookies
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-5 py-2 bg-[#2563eb] hover:bg-blue-600 text-white font-medium text-xs rounded-full transition-all duration-200 shadow-md hover:shadow-blue-500/25 cursor-pointer whitespace-nowrap"
              >
                Accept all cookies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f1117] border border-white/20 rounded-2xl max-w-md w-full p-5 text-white shadow-2xl space-y-4 relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-400" />
                <h3 className="text-base font-bold">Cookie Preferences</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Manage your cookie settings. Essential cookies are required to maintain basic site functionality.
            </p>

            {/* Options List */}
            <div className="space-y-3">
              {/* Essential Cookies */}
              <div className="flex items-start justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                    <span className="font-semibold text-xs">Strictly Necessary Cookies</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Required for authentication and basic security.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mt-0.5 h-3.5 w-3.5 rounded accent-blue-500 cursor-not-allowed opacity-75"
                />
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="space-y-0.5">
                  <span className="font-semibold text-xs">Analytics Cookies</span>
                  <p className="text-[11px] text-gray-400">
                    Help us analyze website traffic & usage patterns.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                  }
                  className="mt-0.5 h-3.5 w-3.5 rounded accent-blue-500 cursor-pointer"
                />
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="space-y-0.5">
                  <span className="font-semibold text-xs">Marketing & Targeting</span>
                  <p className="text-[11px] text-gray-400">
                    Used to deliver personalized recommendations.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences((prev) => ({ ...prev, marketing: e.target.checked }))
                  }
                  className="mt-0.5 h-3.5 w-3.5 rounded accent-blue-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 border-t border-white/10 pt-3">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="w-full sm:w-auto px-4 py-2 rounded-full border border-white/20 text-gray-200 hover:text-white hover:bg-white/10 text-xs font-medium transition-all cursor-pointer"
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-5 py-2 bg-[#2563eb] hover:bg-blue-600 text-white text-xs font-medium rounded-full transition-all shadow-md cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
