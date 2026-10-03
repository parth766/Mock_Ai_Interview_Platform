import React from "react";
import FeedbackView from "@/components/FeedbackView";
import { getFeedbackByInterviewId, getInterviewById } from "@/lib/actions/interview.action";
import { getCurrentUser } from "@/lib/actions/auth.action";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();

  const [feedback, interview] = await Promise.all([
    getFeedbackByInterviewId({ interviewId: id, userId: user?.id || "user1" }),
    getInterviewById(id)
  ]);

  return (
    <div className="w-full min-h-screen py-8">
      <FeedbackView
        feedback={feedback || undefined}
        role={interview?.role || "Software Engineer"}
      />
    </div>
  );
}

