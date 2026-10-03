import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { createOllama } from "ollama-ai-provider";
import { createInterview } from "@/lib/actions/interview.action";

const ollama = createOllama();

export async function GET(){
    return Response.json({success: true, data: 'THANK YOU'}, {status: 200});
}

function getExperienceCalibratedFallbacks(role: string, level: string, techstack: string): string[] {
    const lvl = (level || "").toLowerCase();
    const isSenior = lvl.includes("senior") || lvl.includes("lead") || lvl.includes("architect") || lvl.includes("5+");
    
    if (isSenior) {
        return [
            `As a Senior ${role}, how do you architect complex ${techstack} systems to prevent performance degradation, memory leaks, and concurrency race conditions under high production traffic?`,
            `Walk me through a severe production bottleneck or system failure you diagnosed in ${techstack}. What profiling tools, root cause analysis, and architectural changes did you implement to fix it?`,
            `How do you evaluate architectural trade-offs between monolithic, microservices, and serverless state management when designing large-scale ${techstack} applications?`,
            `What advanced caching, database indexing, or state synchronization strategies do you use to ensure zero-downtime scaling and data consistency?`,
            `How do you establish engineering standards, mentor mid/junior engineers, and lead technical debt refactoring across cross-functional product teams?`
        ];
    } else if (lvl.includes("mid")) {
        return [
            `How do you handle state management, asynchronous data fetching, and side effect lifecycle management in modern ${techstack}?`,
            `Describe a challenging technical problem you solved using ${techstack} and how you ensured code quality through automated unit/integration tests.`,
            `How do you optimize application render performance, reduce bundle sizes, and debug memory usage in ${techstack}?`,
            `What patterns do you use for API error handling, retry logic, and resilient data serialization?`,
            `How do you collaborate during technical architecture discussions and code reviews for ${role} tasks?`
        ];
    } else {
        return [
            `Tell me about your background and core projects built using ${techstack} for the ${role} position.`,
            `How do you approach debugging runtime errors and state changes in ${techstack}?`,
            `What best practices do you follow for clean code, component structure, and basic testing?`,
            `How do you handle asynchronous operations and API integration in your applications?`
        ];
    }
}

export async function POST(request:Request){
    const { type = "Technical", role = "Developer", level = "Senior", techstack = "React, TypeScript", amount = 5, userid = "user1", resume = "", resumeStorageUrl = "" } = await request.json();
    try {
        const useOllama = process.env.USE_OLLAMA_AI === "true" || !process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        const ollamaModelName = process.env.OLLAMA_MODEL || "llama3.2";
        const model: any = useOllama ? ollama(ollamaModelName) : google("gemini-2.0-flash-001");

        const resumeContext = resume
            ? `CANDIDATE RESUME & BACKGROUND DETAILS:
---------------------------------------------
${resume}
---------------------------------------------
RESUME QUESTION MANDATE:
You MUST read the candidate's resume carefully. Generate questions that directly quote, probe, and reference specific projects, tools, accomplishments, and past roles listed in their resume text.`
            : "";

        let difficultyPrompt = "";
        const lvlLower = (level || "").toLowerCase();
        if (lvlLower.includes("senior") || lvlLower.includes("lead") || lvlLower.includes("architect") || lvlLower.includes("5+")) {
            difficultyPrompt = `DIFFICULTY LEVEL: HARD & RIGOROUS (SENIOR / 5+ YRS EXPERIENCE).
- Generate deep-dive, challenging technical questions focusing on production scale, system architecture, performance optimization, concurrency edge cases, memory leaks, security, and complex technical trade-offs.
- Do NOT ask simple or introductory questions like "Tell me about your background" or "What is React". Ask tough, scenario-driven senior engineering questions.`;
        } else if (lvlLower.includes("mid")) {
            difficultyPrompt = `DIFFICULTY LEVEL: MODERATE TO HARD (MID-LEVEL).
- Focus on state management, asynchronous data patterns, testing strategies, performance optimization, and architectural patterns in ${techstack}.`;
        } else {
            difficultyPrompt = `DIFFICULTY LEVEL: FOUNDATIONAL TO MODERATE (JUNIOR).
- Focus on practical concepts, syntax, problem-solving approach, debugging, and framework fundamentals in ${techstack}.`;
        }

        const { text: rawResponse } = await generateText({
            model,
            prompt: `You are an elite principal technical interviewer conducting an interview.

Candidate Details:
- Target Role: ${role}
- Experience Level: ${level}
- Tech Stack: ${techstack}
- Interview Type: ${type}
- Number of Questions Required: ${amount}

${resumeContext}

${difficultyPrompt}

Return ONLY a raw JSON array of strings containing the questions, without markdown code block formatting or introductory text.
Example format:
["In your resume, you mentioned building [System/Project] with ${techstack} — how did you resolve memory leaks and handle high production scale?", "Walk me through an architectural trade-off decision you made for a critical production service listed in your background."]
`,
        });

        let parsedQuestions: string[] = [];
        try {
            const cleanText = rawResponse.replace(/```json/g, "").replace(/```/g, "").trim();
            parsedQuestions = JSON.parse(cleanText);
        } catch (parseErr) {
            console.warn("Failed to parse JSON questions, using raw split fallback:", parseErr);
            parsedQuestions = rawResponse
                .split("\n")
                .map((q) => q.replace(/^\d+[\.\)]\s*/, "").replace(/^"|"$/g, "").trim())
                .filter((q) => q.length > 5);
        }

        if (!parsedQuestions || parsedQuestions.length === 0) {
            parsedQuestions = getExperienceCalibratedFallbacks(role, level, techstack);
        }

        const stackArray = typeof techstack === 'string' ? techstack.split(',') : techstack;

        const result = await createInterview({
            role,
            type,
            level,
            techstack: stackArray,
            questions: parsedQuestions,
            resumeStorageUrl,
            resumeText: resume,
        });

        return Response.json({
            success: true,
            questions: parsedQuestions,
            interviewId: result.interviewId,
            interview: result.interview
        }, { status: 200 });

    } catch (error) {
        console.error("Interview generation error:", error);
        
        const fallbackStack = typeof techstack === 'string' ? techstack.split(',') : techstack;
        const fallbackQuestions = getExperienceCalibratedFallbacks(role, level, techstack);

        const result = await createInterview({
            role,
            type,
            level,
            techstack: fallbackStack,
            questions: fallbackQuestions,
            resumeStorageUrl,
            resumeText: resume,
        });

        return Response.json({
            success: true,
            questions: fallbackQuestions,
            interviewId: result.interviewId,
            interview: result.interview
        }, { status: 200 });
    }
}