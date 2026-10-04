"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  FileText,
  MessageSquare,
  Building2,
  Video,
  CheckSquare,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export default function ScrollFeatureShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring physics smoothing for 60fps/120fps butter-smooth scroll motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  // Headline Opacity & Transformations
  const headline1Opacity = useTransform(smoothProgress, [0, 0.35, 0.48], [1, 1, 0]);
  const headline1Y = useTransform(smoothProgress, [0, 0.35, 0.48], [0, 0, -20]);

  const headline2Opacity = useTransform(smoothProgress, [0.42, 0.55, 1], [0, 1, 1]);
  const headline2Y = useTransform(smoothProgress, [0.42, 0.55, 1], [20, 0, 0]);

  // Character Color to Wireframe Transition
  const colorCharacterOpacity = useTransform(smoothProgress, [0.3, 0.55], [1, 0.2]);

  // Cards Expansion Transformations (GPU Accelerated)
  // Top Left: Resume
  const cardTL_X = useTransform(smoothProgress, [0.25, 0.65], [-30, -280]);
  const cardTL_Y = useTransform(smoothProgress, [0.25, 0.65], [40, -140]);
  const cardTL_Opacity = useTransform(smoothProgress, [0.25, 0.55], [0, 1]);
  const cardTL_Scale = useTransform(smoothProgress, [0.25, 0.65], [0.6, 1]);

  // Middle Left: Communication
  const cardML_X = useTransform(smoothProgress, [0.3, 0.7], [-20, -320]);
  const cardML_Y = useTransform(smoothProgress, [0.3, 0.7], [20, 40]);
  const cardML_Opacity = useTransform(smoothProgress, [0.3, 0.6], [0, 1]);
  const cardML_Scale = useTransform(smoothProgress, [0.3, 0.7], [0.6, 1]);

  // Bottom Left: Target Companies
  const cardBL_X = useTransform(smoothProgress, [0.35, 0.75], [-10, -240]);
  const cardBL_Y = useTransform(smoothProgress, [0.35, 0.75], [10, 200]);
  const cardBL_Opacity = useTransform(smoothProgress, [0.35, 0.65], [0, 1]);
  const cardBL_Scale = useTransform(smoothProgress, [0.35, 0.75], [0.6, 1]);

  // Top Right: Interview Practice
  const cardTR_X = useTransform(smoothProgress, [0.25, 0.65], [30, 280]);
  const cardTR_Y = useTransform(smoothProgress, [0.25, 0.65], [40, -130]);
  const cardTR_Opacity = useTransform(smoothProgress, [0.25, 0.55], [0, 1]);
  const cardTR_Scale = useTransform(smoothProgress, [0.25, 0.65], [0.6, 1]);

  // Middle Right: Skill Assessments
  const cardMR_X = useTransform(smoothProgress, [0.3, 0.7], [20, 310]);
  const cardMR_Y = useTransform(smoothProgress, [0.3, 0.7], [20, 50]);
  const cardMR_Opacity = useTransform(smoothProgress, [0.3, 0.6], [0, 1]);
  const cardMR_Scale = useTransform(smoothProgress, [0.3, 0.7], [0.6, 1]);

  // Bottom Right: Clear Feedback
  const cardBR_X = useTransform(smoothProgress, [0.35, 0.75], [10, 250]);
  const cardBR_Y = useTransform(smoothProgress, [0.35, 0.75], [10, 210]);
  const cardBR_Opacity = useTransform(smoothProgress, [0.35, 0.65], [0, 1]);
  const cardBR_Scale = useTransform(smoothProgress, [0.35, 0.75], [0.6, 1]);

  return (
    <div ref={containerRef} className="relative w-full h-[240vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#07080c] flex flex-col justify-between py-8 px-4">
        {/* Animated Headers Container */}
        <div className="relative w-full max-w-3xl mx-auto text-center pt-4 z-20 min-h-[90px]">
          {/* Stage 1 Header */}
          <motion.div
            style={{ opacity: headline1Opacity, y: headline1Y }}
            className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Walk in with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                confidence.
              </span>
            </h2>
            <p className="text-gray-400 text-sm md:text-lg mt-2">
              Turn every practice into a better next attempt.
            </p>
          </motion.div>

          {/* Stage 2 Header */}
          <motion.div
            style={{ opacity: headline2Opacity, y: headline2Y }}
            className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Your prep.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                All in one place.
              </span>
            </h2>
            <p className="text-gray-400 text-sm md:text-lg mt-2">
              Practise, get feedback and feel ready for your next step.
            </p>
          </motion.div>
        </div>

        {/* Center Stage & Floating Motion Cards Area */}
        <div className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center">
          {/* Central Character Avatar Container */}
          <div className="relative z-10 w-64 h-80 md:w-80 md:h-96 flex items-center justify-center">
            {/* Outline Character Illustration */}
            <div className="absolute inset-0 flex items-center justify-center opacity-90">
              <svg viewBox="0 0 200 240" className="w-full h-full stroke-gray-300 fill-none" strokeWidth="1.5">
                <circle cx="100" cy="55" r="28" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="90" cy="53" r="8" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="110" cy="53" r="8" stroke="currentColor" strokeWidth="1.5" />
                <line x1="98" y1="53" x2="102" y2="53" stroke="currentColor" strokeWidth="1.5" />
                <path d="M 94 65 Q 100 70 106 65" stroke="currentColor" strokeWidth="1.5" />
                <path d="M 72 50 Q 80 25 100 25 Q 120 25 128 50" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M 70 95 L 60 160 L 140 160 L 130 95 Q 100 85 70 95 Z" stroke="currentColor" strokeWidth="1.8" />
                <rect x="75" y="115" width="50" height="35" rx="3" stroke="currentColor" strokeWidth="1.5" />
                <line x1="70" y1="150" x2="130" y2="150" stroke="currentColor" strokeWidth="2" />
                <path d="M 68 95 C 55 105 50 140 60 160" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M 132 95 C 145 105 150 140 140 160" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Colored Character Overlay */}
            <motion.div
              style={{ opacity: colorCharacterOpacity }}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-purple-500/10 via-indigo-500/10 to-transparent rounded-full p-2 will-change-transform"
            >
              <div className="w-full h-full relative flex items-center justify-center">
                <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-xl">
                  <circle cx="100" cy="110" r="85" fill="#6366f1" fillOpacity="0.15" />
                  <circle cx="100" cy="55" r="28" fill="#fcd34d" />
                  <path d="M 70 52 C 70 24 130 24 130 52 Z" fill="#374151" />
                  <circle cx="90" cy="53" r="8" stroke="#1f2937" strokeWidth="2" fill="none" />
                  <circle cx="110" cy="53" r="8" stroke="#1f2937" strokeWidth="2" fill="none" />
                  <line x1="98" y1="53" x2="102" y2="53" stroke="#1f2937" strokeWidth="2" />
                  <path d="M 94 65 Q 100 70 106 65" stroke="#1f2937" strokeWidth="2" fill="none" />
                  <path d="M 68 90 L 55 170 L 145 170 L 132 90 Z" fill="#7c3aed" />
                  <path d="M 90 90 L 100 130 L 110 90 Z" fill="#ffffff" />
                  <rect x="75" y="115" width="50" height="35" rx="3" fill="#9ca3af" stroke="#4b5563" strokeWidth="1.5" />
                  <rect x="80" y="120" width="40" height="25" rx="1" fill="#1f2937" />
                  <path d="M 52 100 Q 40 130 52 165" stroke="#374151" strokeWidth="8" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Floating Cards (GPU Accelerated & Spring Physics Smooth) */}

          {/* Card 1: Top Left - Your Resume */}
          <motion.div
            style={{
              x: cardTL_X,
              y: cardTL_Y,
              opacity: cardTL_Opacity,
              scale: cardTL_Scale,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 p-4 rounded-2xl bg-[#0f111a] border border-purple-500/30 shadow-2xl z-20 pointer-events-none transform-gpu will-change-transform"
          >
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs mb-1">
              <FileText className="w-4 h-4" />
              <span>Your resume</span>
            </div>
            <p className="text-white text-xs font-bold mb-2">Make your experience count</p>
            <div className="space-y-1">
              <div className="h-1.5 w-full bg-white/10 rounded-full"></div>
              <div className="h-1.5 w-3/4 bg-white/10 rounded-full"></div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-purple-300/70 border-t border-white/5 pt-2">
              <span>Skills</span> • <span>Projects</span> • <span>Experience</span>
            </div>
          </motion.div>

          {/* Card 2: Middle Left - Communication */}
          <motion.div
            style={{
              x: cardML_X,
              y: cardML_Y,
              opacity: cardML_Opacity,
              scale: cardML_Scale,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 p-4 rounded-2xl bg-[#0f111a] border border-teal-500/30 shadow-2xl z-20 pointer-events-none transform-gpu will-change-transform"
          >
            <div className="flex items-center gap-2 text-teal-400 font-semibold text-xs mb-1">
              <MessageSquare className="w-4 h-4" />
              <span>Communication</span>
            </div>
            <p className="text-white text-xs font-bold mb-2">Speak. Listen. Improve.</p>
            <div className="flex items-center justify-center gap-1 my-3 h-8">
              {[40, 70, 30, 90, 60, 100, 45, 80, 50].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-teal-400/80 rounded-full"
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400">Build confidence, one answer at a time</p>
          </motion.div>

          {/* Card 3: Bottom Left - Target Companies */}
          <motion.div
            style={{
              x: cardBL_X,
              y: cardBL_Y,
              opacity: cardBL_Opacity,
              scale: cardBL_Scale,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 p-3.5 rounded-2xl bg-[#0f111a] border border-indigo-500/30 shadow-2xl z-20 pointer-events-none transform-gpu will-change-transform"
          >
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-2">
              <Building2 className="w-4 h-4" />
              <span>Your target companies</span>
            </div>
            <div className="flex items-center justify-around gap-2 pt-1">
              <span className="text-xs font-bold text-red-400">Google</span>
              <span className="text-xs font-bold text-blue-400">Microsoft</span>
              <span className="text-xs font-bold text-cyan-400">TCS</span>
            </div>
          </motion.div>

          {/* Card 4: Top Right - Interview Practice */}
          <motion.div
            style={{
              x: cardTR_X,
              y: cardTR_Y,
              opacity: cardTR_Opacity,
              scale: cardTR_Scale,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 p-3.5 rounded-2xl bg-[#0f111a] border border-purple-500/30 shadow-2xl z-20 pointer-events-none transform-gpu will-change-transform"
          >
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs mb-2">
              <Video className="w-4 h-4" />
              <span>Interview practice</span>
            </div>
            <div className="relative rounded-xl overflow-hidden bg-white/5 border border-white/10 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-purple-600/60 px-2 py-0.5 rounded-full text-white font-medium">
                  AI interviewer
                </span>
                <span className="text-[10px] text-purple-300">Live</span>
              </div>
              <p className="text-xs text-gray-200 italic font-medium">&ldquo;Tell me about yourself.&rdquo;</p>
            </div>
          </motion.div>

          {/* Card 5: Middle Right - Skill Assessments */}
          <motion.div
            style={{
              x: cardMR_X,
              y: cardMR_Y,
              opacity: cardMR_Opacity,
              scale: cardMR_Scale,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 p-4 rounded-2xl bg-[#0f111a] border border-blue-500/30 shadow-2xl z-20 pointer-events-none transform-gpu will-change-transform"
          >
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs mb-1">
              <CheckSquare className="w-4 h-4" />
              <span>Skill assessments</span>
            </div>
            <p className="text-white text-xs font-bold mb-2">Put your skills to the test</p>
            <div className="space-y-1.5 text-[11px]">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                A. Try an approach
              </div>
              <div className="p-2 rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-200 flex items-center justify-between">
                <span>B. Choose the right answer</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              </div>
            </div>
          </motion.div>

          {/* Card 6: Bottom Right - Clear Feedback */}
          <motion.div
            style={{
              x: cardBR_X,
              y: cardBR_Y,
              opacity: cardBR_Opacity,
              scale: cardBR_Scale,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 p-3.5 rounded-2xl bg-[#0f111a] border border-amber-500/30 shadow-2xl z-20 pointer-events-none transform-gpu will-change-transform"
          >
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Clear feedback</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center gap-1.5 text-green-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Good structure</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Add a real example</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
