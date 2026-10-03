"use client";

import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import DisplayTechIcons from "@/components/DisplayTechIcons";

interface CardProps extends InterviewCardProps {
    feedbackData?: Feedback | null;
}

const InterviewCard = ({ interviewId, userId, role, techstack, type, createdAt, feedbackData }: CardProps) => {
    const [feedback, setFeedback] = useState<Feedback | null>(feedbackData || null);
    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || new Date()).format('YYYY-MM-DD');

    const [coverImage, setCoverImage] = useState<string>("/covers/placeholder.png");

    useEffect(() => {
        setCoverImage(getRandomInterviewCover());

        if (!feedbackData && interviewId) {
            // Attempt client side fetch for feedback score
            fetch(`/api/interview/feedback?interviewId=${interviewId}`)
                .then(res => res.json())
                .then(data => {
                    if (data?.feedback) setFeedback(data.feedback);
                })
                .catch(() => {});
        }
    }, [interviewId, feedbackData]);

    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-96">
            <div className="card-interview">
                <div className="interview-card">
                    <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                        <p className="badge-text">{normalizedType}</p>
                    </div>

                    <Image
                        src={coverImage}
                        alt="cover image"
                        width={90}
                        height={90}
                        className="rounded-full object-fit size-[90px]"
                    />

                    <h3 className="mt-5 capitalize">
                        {role} Interview
                    </h3>

                    <div className="flex flex-row gap-5 mt-3">
                        <div className="flex flex-row gap-2">
                            <Image src="/calendar.svg" alt="calendar" width={22} height={22} />
                            <p>{formattedDate}</p>
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                            <Image src="/star.svg" alt="star" width={22} height={22} />
                            <p>{feedback?.totalScore ? `${feedback.totalScore}/100` : '---/100'}</p>
                        </div>
                    </div>

                    <p className="line-clamp-2 mt-5">
                        {feedback?.finalAssessment || "Custom AI interview session ready to launch."}
                    </p>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <DisplayTechIcons techStack={techstack} />

                    <Button className="btn-primary">
                        <Link href={`/interview/${interviewId || "1"}`}>
                            Start Interview
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InterviewCard;