// import React from 'react';
// import Image from 'next/image';
//
//
// const Agent = ({userName}:AgentProps) => {
//     const isSpeaking = true;
//
//     return (
//         <>
//         <div className="call-view">
//             <div className="card-interview">
//                 <div className="avatar">
//                     <Image src="/user-avatar.png"  alt = "vapi" width = {540} height = {540} className = "object-cover"/>
//                     {isSpeaking && <span className="animate-speak"></span>}
//
//                 </div>
//                 <h3>AI Interview</h3>
//             </div>
//             <div className="card-border">
//                 <div className="card-content">
//                     <Image src = "/user-avatar.png"  alt = "user avatar" width={540} height = {540} className = "object-cover size-[120px]" />
//                     <h3>{userName}</h3>
//
//                 </div>
//
//             </div>
//         </div>
//             </>
//     );
// };
//
// export default Agent;

"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils";

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

interface SavedMessage {
    role: "user" | "system" | "assistant";
    content: string;
}

interface AgentProps {
    userName: string;
}

const Agent = ({ userName }: AgentProps) => {
    // MOCK STATES FOR UI VISUAL TESTING
    const callStatus = CallStatus.FINISHED;
    const isSpeaking = true;

    // INTEGRATED: Structured array matching the SavedMessage schema format
    const messages: SavedMessage[] = [
        {
            role: "assistant",
            content: "Whats your name?"
        },
        {
            role: "user",
            content: "My name is John Doe, nice to meet you!"
        }
    ];

    // Grab the last message text safely to display inside the highlighted visual container bubble
    const lastMessage = messages.length > 0 ? messages[messages.length - 1].content : "";

    return (
        <div className="w-full flex flex-col gap-8 max-w-6xl mx-auto p-4 md:p-8">

            <div className="w-full">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
                    Interview Generation
                </h2>

                {/* Grid Container layout to handle side-by-side positioning gracefully */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center">

                    {/* LEFT CARD: AI Interviewer */}
                    <div className="relative flex flex-col items-center justify-center bg-[#0d0e12] border border-white/5 rounded-2xl p-8 min-h-[340px] text-center transition-all hover:border-white/10">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center bg-white/5 mb-4 overflow-visible">
                            {/* The speaking radar animation effect ring */}
                            {isSpeaking && (
                                <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75 scale-110" />
                            )}
                            <Image
                                src="/logo.svg"
                                alt="AI Voice Agent"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        <h3 className="text-lg font-medium text-white">
                            {callStatus === CallStatus.CONNECTING ? "Connecting..." : "AI Interviewer"}
                        </h3>
                    </div>

                    {/* RIGHT CARD: Candidate (You) */}
                    <div className="relative flex flex-col items-center justify-center bg-[#0d0e12] border border-white/5 rounded-2xl p-8 min-h-[340px] text-center transition-all hover:border-white/10">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full mb-4 overflow-hidden border-2 border-white/10">
                            <Image
                                src="/user-avatar.png"
                                alt="Candidate Profile"
                                fill
                                sizes="(max-width: 768px) 128px, 160px"
                                className="object-cover"
                                priority
                            />
                        </div>
                        <h3 className="text-lg font-medium text-white capitalize">
                            {userName || "You"}
                        </h3>
                    </div>

                </div>
            </div>

            {/* INTEGRATED: Conditional render layout mapping out the conversation history log */}
            {messages.length > 0 && (
                <div className="w-full max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-4 min-h-[60px] text-center">
                    <p
                        key={lastMessage}
                        className={cn(
                            "text-sm md:text-base text-gray-300 transition-opacity duration-500 opacity-0",
                            "animate-fadeIn opacity-100"
                        )}
                    >
                        {lastMessage}
                    </p>
                </div>
            )}

            {/* Bottom Button Action Panel Control */}
            <div className="w-full flex justify-center mt-4">
                {callStatus !== CallStatus.ACTIVE ? (
                    <button
                        className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-xl transition-all"
                    >
                        <span>
                            {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
                                ? 'Start Interview'
                                : 'Connecting...'}
                        </span>
                    </button>
                ) : (
                    <button
                        className="btn-disconnect bg-destructive hover:bg-destructive/90 text-white font-medium px-6 py-3 rounded-xl transition-all"
                    >
                        End Interview
                    </button>
                )}
            </div>

        </div>
    );
};

export default Agent;