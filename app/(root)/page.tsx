import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { getLatestInterviews } from "@/lib/actions/interview.action";

import HeroSection from "@/components/HeroSection";
import ScrollFeatureShowcase from "@/components/ScrollFeatureShowcase";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export const dynamic = 'force-dynamic';


export default async function Page() {
  const interviews = await getLatestInterviews();

  return (
      <>
        {/* AI Practice Studio Typewriter Hero */}
        <HeroSection />

        {/* Scroll Motion Feature Showcase */}
        <ScrollFeatureShowcase />

        {/* Your Interviews */}
        <section className="flex flex-col gap-6 mt-8">
          <h2>Your Recent Interviews</h2>

          <div className="interviews-section">
            {interviews && interviews.length > 0 ? (
              interviews.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={Array.isArray(interview.techstack) ? interview.techstack : [interview.techstack]}
                  createdAt={interview.createdAt}
                />
              ))
            ) : (
              <p className="text-gray-400 text-sm">You haven&apos;t taken any mock interviews yet. Click &apos;Start Custom AI Interview&apos; above!</p>
            )}
          </div>
        </section>

        {/* FAQs Section */}
        <FAQSection />

        {/* Footer Section */}
        <Footer />
      </>
  );
}