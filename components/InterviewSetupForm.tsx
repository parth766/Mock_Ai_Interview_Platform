"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadResumeToStorage } from "@/lib/actions/interview.action";

interface InterviewSetupFormProps {
  onGenerateInterview: (data: {
    interviewId?: string;
    role: string;
    level: string;
    techstack: string;
    type: string;
    resume: string;
    resumeStorageUrl?: string;
    questions: string[];
  }) => void;
}

export default function InterviewSetupForm({ onGenerateInterview }: InterviewSetupFormProps) {
  const [role, setRole] = useState("Frontend Developer");
  const [level, setLevel] = useState("Senior");
  const [techstack, setTechstack] = useState("React, TypeScript, Next.js");
  const [type, setType] = useState("Technical");
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [resumeStorageUrl, setResumeStorageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);

    try {
      // 1. Read as Data URL (base64 encoded) for safe storage upload
      const base64Data = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result as string);
        r.onerror = reject;
        r.readAsDataURL(file);
      });

      // 2. Upload safe base64 string to Firebase Storage
      const uploadRes = await uploadResumeToStorage(base64Data, file.name);
      if (uploadRes.success && uploadRes.storageUrl) {
        setResumeStorageUrl(uploadRes.storageUrl);
      }

      // 3. Populate text summary if text file, or clean placeholder if PDF
      if (file.type.includes("text") || file.name.endsWith(".txt") || file.name.endsWith(".md")) {
        const textContent = await new Promise<string>((resolve) => {
          const tr = new FileReader();
          tr.onload = () => resolve(tr.result as string);
          tr.readAsText(file);
        });
        setResumeText(textContent);
      } else {
        setResumeText(`[Uploaded Resume File: ${file.name}]\nCandidate resume targeting ${role} role with experience in ${techstack}.`);
      }
    } catch (err) {
      console.warn("Resume upload notice:", err);
    } finally {
      setIsUploading(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let activeStorageUrl = resumeStorageUrl;

      // Auto-ensure Firebase Storage upload if text/resume is provided without explicit file click
      if (!activeStorageUrl && resumeText.trim()) {
        try {
          const autoFileName = fileName ? fileName : `resume_${Date.now()}.txt`;
          const base64Data = `data:text/plain;base64,${Buffer.from(resumeText).toString('base64')}`;
          const uploadRes = await uploadResumeToStorage(base64Data, autoFileName);
          if (uploadRes.success && uploadRes.storageUrl) {
            activeStorageUrl = uploadRes.storageUrl;
            setResumeStorageUrl(activeStorageUrl);
          }
        } catch (autoErr) {
          console.warn("Auto resume upload notice:", autoErr);
        }
      }

      const res = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          level,
          techstack,
          type,
          amount: 5,
          resume: resumeText,
          resumeStorageUrl: activeStorageUrl,
        }),
      });

      const data = await res.json();
      const generatedQuestions = data?.questions || [
        `Tell me about your technical background and experience as a ${role}.`,
        `What major projects have you delivered using ${techstack}?`,
        `How do you solve complex bugs and optimize performance?`,
      ];

      onGenerateInterview({
        interviewId: data?.interviewId,
        role,
        level,
        techstack,
        type,
        resume: resumeText,
        resumeStorageUrl: activeStorageUrl,
        questions: generatedQuestions,
      });
    } catch (err) {
      console.error("Failed to generate interview:", err);
      onGenerateInterview({
        role,
        level,
        techstack,
        type,
        resume: resumeText,
        resumeStorageUrl,
        questions: [
          `Tell me about your technical background and experience as a ${role}.`,
          `What complex projects have you built using ${techstack}?`,
          `How do you handle state management and performance optimization?`,
        ],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#0d0e12] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="space-y-2 text-center md:text-left">
        <h2 className="text-2xl font-bold text-white">Create Custom AI Interview</h2>
        <p className="text-sm text-gray-400">
          Upload your resume to Firebase Storage and choose your target role to generate tailored interview questions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role & Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Target Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Frontend Developer"
              className="bg-dark-200 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary-200"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Experience Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="bg-dark-200 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-200"
            >
              <option value="Junior">Junior (0-2 yrs)</option>
              <option value="Mid">Mid-Level (2-5 yrs)</option>
              <option value="Senior">Senior (5+ yrs)</option>
              <option value="Lead">Lead / Architect</option>
            </select>
          </div>
        </div>

        {/* Tech Stack & Interview Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Tech Stack (comma separated)</label>
            <input
              type="text"
              value={techstack}
              onChange={(e) => setTechstack(e.target.value)}
              placeholder="e.g. React, Node.js, TypeScript"
              className="bg-dark-200 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary-200"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Interview Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-dark-200 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-200"
            >
              <option value="Technical">Technical</option>
              <option value="Behavioural">Behavioural</option>
              <option value="Mixed">Mixed (Technical + Behavioural)</option>
            </select>
          </div>
        </div>

        {/* Resume Input & Upload */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-300">
              Resume / Background Details {fileName && <span className="text-xs text-green-400">({fileName})</span>}
            </label>
            <label className="text-xs text-primary hover:underline cursor-pointer">
              {isUploading ? "⏳ Uploading to Firebase Storage..." : "📁 Upload Resume File"}
              <input type="file" accept=".txt,.md,.pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
          <textarea
            rows={4}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume summary, project highlights, or key skills here..."
            className="bg-dark-200 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary-200 resize-none text-sm"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading || isUploading}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all cursor-pointer"
        >
          {isLoading ? "Generating Personalized Interview..." : "🚀 Launch Custom AI Interview"}
        </Button>
      </form>
    </div>
  );
}

