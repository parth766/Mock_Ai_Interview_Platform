"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, Shield, Video, Mic, CheckCircle } from "lucide-react";

const WORDS = [
  "Communication_",
  "Mock Interviews_",
  "Sales Training_",
  "Technical Skills_",
  "System Design_",
  "Behavioral Prep_",
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullWord = WORDS[wordIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullWord.substring(0, displayText.length + 1));
        if (displayText.length === currentFullWord.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentFullWord.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % WORDS.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <section className="relative w-full pt-2 md:pt-4 pb-12 flex flex-col items-center text-center space-y-5 overflow-hidden">
      {/* Glow Background Gradient */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-purple-500/30 text-purple-300 text-xs font-semibold backdrop-blur-md shadow-lg">
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        <span>Next-Gen AI Practice Studio</span>
      </div>

      {/* Animated Headline */}
      <div className="max-w-4xl space-y-3 px-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          AI Practice Studio for <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500 min-h-[1.2em] inline-block font-mono">
            {displayText || " "}
          </span>
        </h1>

        <p className="text-gray-300 text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
          Practice real scenarios, improve confidence, get instant feedback
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-4 z-10 pt-2">
        <Button asChild className="btn-primary !px-8 !py-6 text-base font-bold shadow-xl shadow-purple-500/20 hover:scale-105 transition-transform">
          <Link href="/interview">🚀 Start Custom AI Interview</Link>
        </Button>
      </div>

      {/* Hero UI Showcase Frame */}
      <div className="relative w-full max-w-5xl mx-auto mt-6 px-4 z-10">
        <div className="relative rounded-3xl border border-white/15 bg-[#0b0d14]/90 shadow-2xl p-4 md:p-6 backdrop-blur-xl overflow-hidden">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-mono bg-white/5 px-4 py-1 rounded-full border border-white/10">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>prepwise.ai/practice-room</span>
            </div>
            <div className="text-xs text-purple-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
              Live Session
            </div>
          </div>

          {/* Practice Room Layout Mockup */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left AI Interviewer Screen */}
            <div className="md:col-span-2 relative bg-[#121420] rounded-2xl border border-white/10 overflow-hidden p-4 min-h-[300px] flex flex-col justify-between">
              {/* Interviewer Video Mockup */}
              <div className="relative w-full h-56 rounded-xl bg-gradient-to-br from-gray-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-center border border-white/5">
                <div className="w-20 h-20 rounded-full bg-purple-600/30 border-2 border-purple-400 flex items-center justify-center mb-3 shadow-lg">
                  <Video className="w-9 h-9 text-purple-300" />
                </div>
                <p className="text-xs font-bold text-white tracking-wide">AI Interviewer — Senior Tech Lead</p>
                <p className="text-[11px] text-purple-300 mt-1 italic">&ldquo;Tell me about a challenging project you built recently.&rdquo;</p>

                <div className="absolute bottom-3 right-3 bg-red-600/90 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  END ANSWER
                </div>
              </div>

              {/* Bottom Control Bar */}
              <div className="flex items-center justify-between pt-3 text-xs text-gray-400 border-t border-white/10 mt-3">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-green-400" />
                  <span>Microphone Active</span>
                </div>
                <span className="text-purple-300 font-mono font-medium">Question 1 of 5</span>
              </div>
            </div>

            {/* Right Candidate & Feedback Panel */}
            <div className="bg-[#121420] rounded-2xl border border-white/10 p-4 flex flex-col justify-between space-y-4">
              {/* Candidate Preview */}
              <div className="relative bg-white/5 rounded-xl border border-white/10 p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-indigo-600/40 border border-indigo-400/30 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  YOU
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Candidate Practice</p>
                  <p className="text-[10px] text-purple-300">Evaluating Response...</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-2 text-xs">
                <p className="font-semibold text-gray-300">Live Feedback Criteria</p>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-green-400 font-medium text-[11px]">
                  <span>Technical Accuracy</span>
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-purple-300 font-medium text-[11px]">
                  <span>Structure & Delivery</span>
                  <span>92%</span>
                </div>
              </div>

              {/* Action */}
              <Button asChild className="w-full btn-secondary text-xs !py-2">
                <Link href="/interview">Try Interactive Interview</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
