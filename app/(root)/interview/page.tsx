"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Agent from "@/components/Agent";
import InterviewSetupForm from "@/components/InterviewSetupForm";
import { Button } from "@/components/ui/button";

const Page = () => {
    const router = useRouter();
    const [interviewData, setInterviewData] = useState<{
        interviewId?: string;
        role: string;
        level: string;
        techstack: string;
        type: string;
        resume: string;
        questions: string[];
    } | null>(null);

    const handleGenerateInterview = (data: {
        interviewId?: string;
        role: string;
        level: string;
        techstack: string;
        type: string;
        resume: string;
        questions: string[];
    }) => {
        if (data.interviewId) {
            router.push(`/interview/${data.interviewId}`);
        } else {
            setInterviewData(data);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-6">
            {!interviewData ? (
                <InterviewSetupForm onGenerateInterview={handleGenerateInterview} />
            ) : (
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-[#0d0e12] border border-white/10 rounded-xl px-6 py-4">
                        <div>
                            <h3 className="text-lg font-semibold text-white">
                                {interviewData.role} ({interviewData.level})
                            </h3>
                            <p className="text-xs text-gray-400">
                                Tech Stack: {interviewData.techstack} | Focus: {interviewData.type}
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => setInterviewData(null)}
                            className="border-white/10 text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer"
                        >
                            ✏️ Edit Setup / Upload New Resume
                        </Button>
                    </div>

                    <Agent
                        userName="Candidate"
                        userId="user1"
                        interviewId={interviewData.interviewId || "1"}
                        type={interviewData.type}
                        questions={interviewData.questions}
                    />
                </div>
            )}
        </div>
    );
};

export default Page;