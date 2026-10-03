import React from "react";
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/interview.action";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();

  let interview: Interview | null = await getInterviewById(id);

  // Default fallback interview if not found
  if (!interview) {
    interview = {
      id: id || "1",
      userId: user?.id || "user1",
      role: "Frontend Developer",
      type: "Technical",
      techstack: ["React", "TypeScript", "Next.js"],
      level: "Senior",
      questions: [
        "Welcome to your AI interview! Let's begin. Tell me about your background and recent technical experience.",
        "What is the most complex technical project you have built, and how did you approach its architecture?",
        "How do you handle state management, caching, and performance optimization in modern web applications?",
      ],
      finalized: true,
      createdAt: new Date().toISOString(),
    };
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center bg-[#0d0e12] border border-white/10 rounded-xl px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold text-white capitalize">
            {interview.role} ({interview.level})
          </h3>
          <p className="text-xs text-gray-400">
            Tech Stack: {Array.isArray(interview.techstack) ? interview.techstack.join(", ") : interview.techstack} | Focus: {interview.type}
          </p>
        </div>
      </div>

      <Agent
        userName={user?.name || "Candidate"}
        userId={user?.id || "user1"}
        interviewId={interview.id}
        type={interview.type}
        questions={interview.questions}
      />
    </div>
  );
}

