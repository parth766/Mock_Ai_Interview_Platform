"use client";

import React from "react";

export default function CookieFooterLink() {
  const handleClick = () => {
    window.dispatchEvent(new Event("open-cookie-banner"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-xs text-gray-400 hover:text-white underline transition-colors cursor-pointer"
    >
      Cookie Preferences
    </button>
  );
}
