
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { interviewCovers, mappings } from "@/constants";

// 1. Shadcn's style utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 2. Custom cover picker utility
export function getRandomInterviewCover(): string {
  const covers = interviewCovers && interviewCovers.length > 0
    ? interviewCovers
    : ["/covers/skype.png", "/covers/quora.png"];

  const randomIndex = Math.floor(Math.random() * covers.length);
  return covers[randomIndex];
}

// 3. Tech logos lookup utility
export function getTechLogos(techStack: string[] | string) {
  const stackArray = Array.isArray(techStack)
      ? techStack
      : typeof techStack === 'string'
          ? techStack.split(',').map(s => s.trim())
          : [];

  const availableIcons = ["react", "tailwind"];

  return stackArray.map((tech) => {
    const rawNormalized = tech.toLowerCase().trim();
    const mappedTech = mappings[rawNormalized as keyof typeof mappings] || rawNormalized;
    const url = availableIcons.includes(mappedTech) ? `/${mappedTech}.svg` : "/tech.svg";

    return {
      tech: tech,
      url: url,
    };
  });
}
