import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { getLatestInterviews } from "@/lib/actions/interview.action";

export const dynamic = 'force-dynamic';


export default async function Page() {
  const interviews = await getLatestInterviews();

  return (
      <>
        {/* Hero Section */}
        <section className="card-cta">
          <div className="flex flex-col gap-6 max-w-lg">
            <h2>
              Get Interview Ready with AI-Powered practice & feedback
            </h2>

            <p className="text-lg text-gray-300">
              Practice on tailored interview questions & get instant Gemini AI evaluation scores
            </p>

            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/interview">🚀 Start Custom AI Interview</Link>
            </Button>
          </div>

          <Image
              src="/robot.png"
              alt="robo-dude"
              width={400}
              height={400}
              className="max-sm:hidden"
          />
        </section>

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
      </>
  );
}