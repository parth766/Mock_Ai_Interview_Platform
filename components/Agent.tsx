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

"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { vapi, isVapiConfigured } from "@/lib/vapi.sdk";

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
    userId?: string;
    interviewId?: string;
    feedbackId?: string;
    type?: string;
    questions?: string[];
}

const defaultQuestionsList = [
    "Welcome to your AI interview! Let's begin. Tell me about your technical background and recent projects.",
    "What is the most complex technical challenge you've faced recently, and how did you solve it?",
    "How do you handle state management, caching, and performance optimization in production?",
    "What strategies do you use for testing, debugging, and code reviews?",
    "Where do you see your technical role evolving in the near future?"
];

const isExitPhrase = (text: string) => {
    const lower = text.toLowerCase().trim();
    return /^\s*(end|exit|quit|finish|stop|done|i am done|i'm done|end interview|stop interview|exit interview|finish interview)\s*$/i.test(lower);
};


const Agent = ({ userName, userId = "user1", interviewId = "1", questions: initialQuestions }: AgentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const [isListening, setIsListening] = useState<boolean>(false);
    const [userInputText, setUserInputText] = useState<string>("");
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [questionPool, setQuestionPool] = useState<string[]>([]);
    const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
    const [messages, setMessages] = useState<SavedMessage[]>([
        {
            role: "assistant",
            content: "Click 'Start Interview' below to begin your AI interview session."
        }
    ]);

    const recognitionRef = useRef<any>(null);
    const isSpeakingRef = useRef<boolean>(false);
    const callStatusRef = useRef<CallStatus>(CallStatus.INACTIVE);
    const questionIndexRef = useRef<number>(0);
    const questionPoolRef = useRef<string[]>([]);
    const messagesRef = useRef<SavedMessage[]>(messages);

    // Sync refs
    useEffect(() => {
        isSpeakingRef.current = isSpeaking;
        callStatusRef.current = callStatus;
        messagesRef.current = messages;
        questionPoolRef.current = questionPool;
    }, [isSpeaking, callStatus, messages, questionPool]);

    // Update question pool when props change
    useEffect(() => {
        const pool = (initialQuestions && initialQuestions.length > 0) ? initialQuestions : defaultQuestionsList;
        setQuestionPool(pool);
        questionPoolRef.current = pool;
    }, [initialQuestions]);

    // Speak helper function using Web Speech Synthesis API with feedback prevention
    const speakText = (text: string, onEndCallback?: () => void) => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            isSpeakingRef.current = true;
            setIsSpeaking(true);

            // Stop mic listening immediately while AI speaks to prevent feedback loop
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch (e) {}
            }

            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onstart = () => {
                isSpeakingRef.current = true;
                setIsSpeaking(true);
            };
            utterance.onend = () => {
                isSpeakingRef.current = false;
                setIsSpeaking(false);
                if (onEndCallback) {
                    onEndCallback();
                } else if (callStatusRef.current === CallStatus.ACTIVE) {
                    // Resume mic listening after AI finishes speaking + 600ms buffer
                    setTimeout(() => {
                        if (callStatusRef.current === CallStatus.ACTIVE && !isSpeakingRef.current) {
                            startBrowserSpeechRecognition();
                        }
                    }, 600);
                }
            };
            utterance.onerror = () => {
                isSpeakingRef.current = false;
                setIsSpeaking(false);
                if (onEndCallback) {
                    onEndCallback();
                } else if (callStatusRef.current === CallStatus.ACTIVE) {
                    setTimeout(() => {
                        if (callStatusRef.current === CallStatus.ACTIVE && !isSpeakingRef.current) {
                            startBrowserSpeechRecognition();
                        }
                    }, 600);
                }
            };
            window.speechSynthesis.speak(utterance);
        } else {
            if (onEndCallback) onEndCallback();
        }
    };

    // Vapi events listener setup
    useEffect(() => {
        if (!vapi) return;

        const onCallStart = () => {
            setCallStatus(CallStatus.ACTIVE);
        };
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            setIsSpeaking(false);
        };
        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);
        const onMessage = (message: any) => {
            if (message.type === 'transcript' && message.transcript) {
                setMessages((prev) => {
                    const nextMsgs = [
                        ...prev,
                        { role: (message.role || 'assistant') as "assistant" | "user" | "system", content: message.transcript }
                    ];
                    messagesRef.current = nextMsgs;
                    return nextMsgs;
                });
            }
        };

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);
        vapi.on('message', onMessage);

        return () => {
            if (vapi) {
                vapi.off('call-start', onCallStart);
                vapi.off('call-end', onCallEnd);
                vapi.off('speech-start', onSpeechStart);
                vapi.off('speech-end', onSpeechEnd);
                vapi.off('message', onMessage);
            }
        };
    }, []);

    // Continuous Speech Recognition setup
    const startBrowserSpeechRecognition = () => {
        if (typeof window === 'undefined') return;
        if (isSpeakingRef.current || callStatusRef.current !== CallStatus.ACTIVE) return;

        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.warn("Browser Speech Recognition API not supported in this browser.");
            return;
        }

        try {
            if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch (e) {}
            }

            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onresult = (event: any) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript.trim() && !isSpeakingRef.current) {
                    processUserResponse(finalTranscript.trim());
                }
            };

            recognition.onerror = (event: any) => {
                console.warn("Speech recognition notice:", event.error);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
                // Auto-restart continuous listening if call remains active and AI is not speaking
                if (callStatusRef.current === CallStatus.ACTIVE && !isSpeakingRef.current) {
                    setTimeout(() => {
                        if (callStatusRef.current === CallStatus.ACTIVE && !isSpeakingRef.current) {
                            try { recognition.start(); } catch (e) {}
                        }
                    }, 500);
                }
            };

            recognition.start();
            recognitionRef.current = recognition;
        } catch (e) {
            console.warn("Could not start Speech Recognition:", e);
        }
    };

    const stopBrowserSpeechRecognition = () => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) {}
            recognitionRef.current = null;
        }
        setIsListening(false);
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    };

    const processUserResponse = (userAnswer: string) => {
        if (!userAnswer.trim()) return;

        // Check if candidate wants to stop/end interview ("end", "exit", "quit", "done", etc.)
        if (isExitPhrase(userAnswer)) {
            const exitMsg = "Thank you for taking the time to interview with PrepWise today! Your session has been completed.";
            const updated: SavedMessage[] = [
                ...messagesRef.current,
                { role: "user", content: userAnswer },
                { role: "assistant", content: exitMsg }
            ];
            setMessages(updated);
            messagesRef.current = updated;
            speakText(exitMsg, () => handleEndCall(updated));
            return;
        }

        const nextIndex = questionIndexRef.current + 1;
        questionIndexRef.current = nextIndex;
        setQuestionIndex(nextIndex);

        const currentPool = questionPoolRef.current.length > 0 ? questionPoolRef.current : questionPool;

        if (nextIndex < currentPool.length) {
            const nextQuestion = currentPool[nextIndex];
            const updated: SavedMessage[] = [
                ...messagesRef.current,
                { role: "user", content: userAnswer },
                { role: "assistant", content: nextQuestion }
            ];
            setMessages(updated);
            messagesRef.current = updated;
            speakText(nextQuestion);
        } else {
            // UNLIMITED QUESTIONS MODE: Dynamically extend question pool continuously with resume & technical follow-ups
            const dynamicFollowUps = [
                `Based on your response, how did you profile latency bottlenecks and optimize memory allocation for that implementation?`,
                `That's great insight! Probing deeper into your resume background, what security vulnerabilities or data isolation challenges did you mitigate?`,
                `How did you design automated testing, CI/CD quality gates, and observability dashboards for that production service?`,
                `If you were to re-architect that solution today from scratch, what key framework or database design trade-offs would you choose differently?`,
                `How do you handle zero-downtime deployment, distributed state consistency, and graceful fallback mechanisms under high traffic load?`,
                `Can you walk me through another major technical milestone or architecture trade-off from your resume experience?`
            ];

            const extraIndex = nextIndex - currentPool.length;
            const nextFollowUp = dynamicFollowUps[extraIndex % dynamicFollowUps.length];

            const updatedPool = [...currentPool, nextFollowUp];
            setQuestionPool(updatedPool);
            questionPoolRef.current = updatedPool;

            const updated: SavedMessage[] = [
                ...messagesRef.current,
                { role: "user", content: userAnswer },
                { role: "assistant", content: nextFollowUp }
            ];
            setMessages(updated);
            messagesRef.current = updated;
            speakText(nextFollowUp);
        }
    };

    const handleStartCall = async () => {
        setCallStatus(CallStatus.CONNECTING);

        if (isVapiConfigured && vapi) {
            try {
                await vapi.start();
            } catch (err) {
                console.error("Vapi start error, using browser speech recognition:", err);
                startLocalInterviewSession();
            }
        } else {
            startLocalInterviewSession();
        }
    };

    const startLocalInterviewSession = () => {
        setTimeout(() => {
            setCallStatus(CallStatus.ACTIVE);
            questionIndexRef.current = 0;
            setQuestionIndex(0);
            const activePool = (initialQuestions && initialQuestions.length > 0) ? initialQuestions : defaultQuestionsList;
            setQuestionPool(activePool);
            questionPoolRef.current = activePool;

            const firstQuestion = activePool[0];
            const initialMsgs: SavedMessage[] = [
                {
                    role: "assistant",
                    content: firstQuestion
                }
            ];
            setMessages(initialMsgs);
            messagesRef.current = initialMsgs;

            speakText(firstQuestion);
        }, 800);
    };

    const handleSendTextMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInputText.trim()) return;

        const textToSend = userInputText.trim();
        setUserInputText("");
        processUserResponse(textToSend);
    };

    const handleEndCall = async (explicitTranscript?: SavedMessage[] | React.MouseEvent) => {
        if (vapi && isVapiConfigured) {
            try {
                vapi.stop();
            } catch (e) {
                console.error(e);
            }
        }
        stopBrowserSpeechRecognition();
        setCallStatus(CallStatus.FINISHED);
        setIsSpeaking(false);
        setIsEvaluating(true);

        const targetTranscript = Array.isArray(explicitTranscript) ? explicitTranscript : messagesRef.current;

        try {
            await fetch('/api/interview/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    interviewId,
                    userId,
                    transcript: targetTranscript
                })
            });
        } catch (err) {
            console.warn("Feedback evaluation API trigger notice:", err);
        } finally {
            setIsEvaluating(false);
        }
    };



    const lastMessage = messages.length > 0 ? messages[messages.length - 1].content : "";

    return (
        <div className="w-full flex flex-col gap-8 max-w-6xl mx-auto p-4 md:p-8">

            <div className="w-full">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
                    Interview Session
                </h2>

                {/* Grid Container layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center">

                    {/* LEFT CARD: AI Interviewer */}
                    <div className="relative flex flex-col items-center justify-center bg-[#0d0e12] border border-white/5 rounded-2xl p-8 min-h-[340px] text-center transition-all hover:border-white/10">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center bg-white/5 mb-4 overflow-visible">
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
                            {callStatus === CallStatus.CONNECTING
                                ? "Connecting..."
                                : callStatus === CallStatus.ACTIVE
                                ? "AI Interviewer (Speaking)"
                                : "AI Interviewer"}
                        </h3>
                    </div>

                    {/* RIGHT CARD: Candidate (You) */}
                    <div className="relative flex flex-col items-center justify-center bg-[#0d0e12] border border-white/5 rounded-2xl p-8 min-h-[340px] text-center transition-all hover:border-white/10">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full mb-4 overflow-hidden border-2 border-white/10">
                            {isListening && (
                                <span className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse scale-105 z-10" />
                            )}
                            <Image
                                src="/user-avatar.png"
                                alt="Candidate Profile"
                                fill
                                sizes="(max-width: 768px) 128px, 160px"
                                className="object-cover"
                                priority
                            />
                        </div>
                        <h3 className="text-lg font-medium text-white capitalize flex items-center gap-2">
                            <span>{userName || "You"}</span>
                            {isListening && <span className="text-xs text-green-400 font-normal">🎙️ Listening...</span>}
                        </h3>
                    </div>

                </div>
            </div>

            {/* Conversation History Log Bubble */}
            {messages.length > 0 && (
                <div className="w-full max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-4 min-h-[60px] text-center">
                    <p
                        key={lastMessage}
                        className={cn(
                            "text-sm md:text-base text-gray-300 transition-opacity duration-500",
                            "animate-fadeIn opacity-100"
                        )}
                    >
                        {lastMessage}
                    </p>
                </div>
            )}

            {/* Text / Voice Answer Controls */}
            {callStatus === CallStatus.ACTIVE && (
                <div className="w-full max-w-2xl mx-auto flex flex-col gap-3 items-center">
                    <form onSubmit={handleSendTextMessage} className="w-full flex gap-3">
                        <input
                            type="text"
                            value={userInputText}
                            onChange={(e) => setUserInputText(e.target.value)}
                            placeholder="Type your response here (or say 'no' / 'stop' to finish)..."
                            className="flex-1 bg-dark-200 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary-200"
                        />
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary/90 text-white font-medium px-5 py-3 rounded-xl transition-all cursor-pointer"
                        >
                            Send Answer
                        </button>
                    </form>

                    <button
                        type="button"
                        onClick={startBrowserSpeechRecognition}
                        disabled={isListening || isSpeaking}
                        className={cn(
                            "text-xs px-4 py-2 rounded-lg border transition-all cursor-pointer",
                            isListening
                                ? "border-green-500 text-green-400 bg-green-500/10"
                                : "border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                        )}
                    >
                        {isListening ? "🎙️ Microphone Active (Listening)" : "🎙️ Click to Activate Microphone"}
                    </button>
                </div>
            )}

            {/* Bottom Button Action Control */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                {isEvaluating ? (
                    <div className="bg-white/10 text-yellow-400 font-medium px-6 py-3 rounded-xl animate-pulse">
                        ⏳ AI is evaluating your interview performance...
                    </div>
                ) : callStatus === CallStatus.FINISHED ? (
                    <Link
                        href={`/interview/${interviewId}/feedback`}
                        className="bg-green-600 hover:bg-green-500 text-white font-medium px-6 py-3 rounded-xl transition-all text-center"
                    >
                        📊 View Detailed AI Score Evaluation Report
                    </Link>
                ) : null}

                {callStatus !== CallStatus.ACTIVE ? (
                    <button
                        onClick={handleStartCall}
                        disabled={callStatus === CallStatus.CONNECTING}
                        className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                    >
                        <span>
                            {callStatus === CallStatus.INACTIVE
                                ? 'Start Interview'
                                : callStatus === CallStatus.FINISHED
                                ? 'Restart Interview'
                                : 'Connecting...'}
                        </span>
                    </button>
                ) : (
                    <button
                        onClick={handleEndCall}
                        className="btn-disconnect bg-destructive hover:bg-destructive/90 text-white font-medium px-6 py-3 rounded-xl transition-all cursor-pointer"
                    >
                        End Interview
                    </button>
                )}
            </div>

        </div>
    );
};

export default Agent;