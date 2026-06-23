// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"
//
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }


import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// 1. Shadcn's style utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 2. Your custom cover picker utility
export function getRandomInterviewCover(): string {
  const covers = [
    "/covers/skype.png",
    "/covers/quora.png",
  ];

  const randomIndex = Math.floor(Math.random() * covers.length);
  return covers[randomIndex];
}

// 3. Add your tech logos lookup utility back here:
export function getTechLogos(techStack: string[] | string) {
  // Assuming techStack might come in as an array or a comma-separated string,
  // we normalize it to map icons. Adjust this logic to match your layout structure:
  const stackArray = Array.isArray(techStack)
      ? techStack
      : typeof techStack === 'string'
          ? techStack.split(',').map(s => s.trim())
          : [];

  return stackArray.map((tech) => {
    const normalizedTech = tech.toLowerCase();

    // Fallback dictionary mapping tech strings to your public SVGs/PNGs
    return {
      tech: tech,
      url: `/${normalizedTech}.svg` // Assuming your public directory has react.svg, node.svg, etc.
    };
  });
}