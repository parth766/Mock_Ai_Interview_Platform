import React from 'react';
import { getTechLogos } from "@/lib/utils";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Added a quick fallback definition just in case your types folder is out of sync
interface TechIconProps {
    techStack: string[] | string;
}

const DisplayTechIcons = ({ techStack }: TechIconProps) => {
    // getTechLogos maps data to objects with 'tech' and 'url' keys
    const techIcons = getTechLogos(techStack);

    return (
        <div className="flex flex-row">
            {techIcons.slice(0, 3).map(({ tech, url }, index) => (
                /* Fixes:
                   1. key is no longer undefined -> distinct element tracking works perfectly.
                   2. index formatting uses a strict condition for staggered layout margins (-ml-3).
                */
                <div
                    key={tech}
                    className={cn(
                        "relative group bg-dark-300 rounded-full p-2 flex-center",
                        index >= 1 && '-ml-3'
                    )}
                >
                    <span className="tech-tooltip">{tech}</span>

                    {/* Fixes: alt property now points to a valid text string for screen readers */}
                    <Image
                        src={url}
                        alt={`${tech} icon`}
                        width={100}
                        height={100}
                        className="size-5"
                    />
                </div>
            ))}
        </div>
    );
};

export default DisplayTechIcons;