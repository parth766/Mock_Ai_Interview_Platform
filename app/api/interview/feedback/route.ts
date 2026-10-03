import { generateAndSaveFeedback } from "@/lib/actions/interview.action";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { interviewId, userId = "user1", transcript = [] } = body;

        if (!interviewId) {
            return Response.json({ success: false, error: "Missing interviewId" }, { status: 400 });
        }

        const result = await generateAndSaveFeedback({
            interviewId,
            userId,
            transcript
        });

        return Response.json(result, { status: 200 });
    } catch (error: any) {
        console.error("Feedback generation API error:", error);
        return Response.json({
            success: false,
            error: error?.message || "Internal server error"
        }, { status: 500 });
    }
}
