"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CategoryScore {
  name: string;
  score: number;
  comment: string;
}

interface FeedbackViewProps {
  feedback?: {
    totalScore?: number;
    categoryScores?: CategoryScore[];
    strengths?: string[];
    areasForImprovement?: string[];
    finalAssessment?: string;
    createdAt?: string;
  };
  role?: string;
}

const defaultCategoryScores: CategoryScore[] = [
  {
    name: "Communication Skills",
    score: 88,
    comment: "Articulated thoughts clearly with good structure and tone throughout the interview.",
  },
  {
    name: "Technical Knowledge",
    score: 82,
    comment: "Demonstrated solid understanding of core framework concepts and architectural principles.",
  },
  {
    name: "Problem Solving",
    score: 85,
    comment: "Structured problem-solving approach; explained trade-offs and edge-case considerations well.",
  },
  {
    name: "Cultural Fit",
    score: 90,
    comment: "Exhibited great enthusiasm, collaborative mindset, and strong professional drive.",
  },
  {
    name: "Confidence and Clarity",
    score: 86,
    comment: "Maintained steady confidence during technical explanations with minimal hesitation.",
  },
];

const defaultStrengths = [
  "Clear explanation of technical design choices and trade-offs",
  "Strong grasp of modern frontend performance optimization",
  "Effective communication and professional delivery under pressure",
];

const defaultImprovements = [
  "Elaborate more on specific automated testing methodologies (unit vs e2e)",
  "Include quantitative metrics (e.g. % performance boost) when discussing project achievements",
];

export default function FeedbackView({ feedback, role = "Frontend Developer" }: FeedbackViewProps) {
  const categoryScores = (feedback?.categoryScores && feedback.categoryScores.length > 0)
    ? feedback.categoryScores
    : defaultCategoryScores;

  const calculatedAvg = Math.round(
    categoryScores.reduce((sum, item) => sum + (Number(item.score) || 0), 0) / categoryScores.length
  );

  const totalScore = feedback?.totalScore ?? calculatedAvg;
  const strengths = feedback?.strengths ?? defaultStrengths;
  const improvements = feedback?.areasForImprovement ?? defaultImprovements;
  const finalAssessment =
    feedback?.finalAssessment ??
    `Candidate completed the interview evaluation for ${role}. Overall performance score is ${totalScore}%.`;


  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-4 md:p-8">
      {/* Header Banner */}
      <div className="bg-[#0d0e12] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs text-primary font-medium mb-2">
            AI Interview Evaluation Report
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Feedback for {role}
          </h1>
          <p className="text-sm text-gray-400">
            Completed on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Overall Score Badge */}
        <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-6 min-w-[160px]">
          <div className="flex items-center gap-1 text-yellow-400 mb-1">
            <Image src="/star.svg" alt="star" width={20} height={20} />
            <span className="text-xs text-gray-400">Overall Score</span>
          </div>
          <span className="text-4xl font-extrabold text-white">{totalScore}</span>
          <span className="text-xs text-gray-400 mt-1">out of 100</span>
        </div>
      </div>

      {/* Final Assessment Summary */}
      <div className="bg-[#0d0e12] border border-white/10 rounded-2xl p-6 md:p-8 space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span>📋</span> AI Final Assessment
        </h3>
        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
          {finalAssessment}
        </p>
      </div>

      {/* Category Scores Breakdown Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Category Performance Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryScores.map((cat) => (
            <div
              key={cat.name}
              className="bg-[#0d0e12] border border-white/5 hover:border-white/10 rounded-xl p-5 space-y-3 transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-white text-sm md:text-base">{cat.name}</span>
                <span className="text-sm font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                  {cat.score} / 100
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-700"
                  style={{ width: `${cat.score}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 leading-normal">{cat.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Areas for Improvement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-[#0d0e12] border border-green-500/20 bg-green-500/5 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
            <span>✅</span> Key Strengths
          </h3>
          <ul className="space-y-2.5">
            {strengths.map((str, idx) => (
              <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-[#0d0e12] border border-yellow-500/20 bg-yellow-500/5 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
            <span>💡</span> Areas for Improvement
          </h3>
          <ul className="space-y-2.5">
            {improvements.map((imp, idx) => (
              <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button asChild className="btn-primary py-3 px-8 text-white font-medium rounded-xl">
          <Link href="/interview">Practice Another Interview</Link>
        </Button>

        <Button asChild variant="outline" className="border-white/10 text-gray-300 hover:text-white hover:bg-white/10 py-3 px-8 rounded-xl">
          <Link href="/">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
