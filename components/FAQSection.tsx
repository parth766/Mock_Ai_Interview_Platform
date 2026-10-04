"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is PrepWise?",
    answer:
      "PrepWise is an AI Practice Studio where you can practice important conversations like job interviews, technical interviews, behavioral scenarios, and communication skills while receiving real-time analytics and instant Gemini AI evaluations.",
  },
  {
    question: "Is PrepWise only for job interviews?",
    answer:
      "No. While PrepWise started as an AI mock interview platform, it supports multiple practice scenarios including tech stack assessments, behavioral communication, and resume-focused interview preparation.",
  },
  {
    question: "What can I practice on PrepWise?",
    answer:
      "You can practice custom job interviews, role-specific tech stacks (Frontend, Backend, Fullstack, System Design), behavioral & HR scenarios, and real-world conversation challenges.",
  },
  {
    question: "How does the AI evaluation & scoring work?",
    answer:
      "PrepWise evaluates your spoken responses using AI models. It analyzes answer relevance, technical accuracy, confidence, and structure to provide real-time scores and actionable feedback.",
  },
  {
    question: "Can I customize my interview role and difficulty?",
    answer:
      "Yes! You can select your target job role, experience level, interview type, and tech stack to generate tailor-made interview questions.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-5xl mx-auto my-16 px-4 space-y-8">
      {/* Section Title with Fade Up */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-5xl font-extrabold text-center tracking-tight text-white"
      >
        FAQs
      </motion.h2>

      {/* Cards List with Staggered Motion */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-[#0e1017] border border-white/10 rounded-2xl p-6 md:p-7 shadow-lg transition-all duration-200 hover:border-purple-500/30"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
              >
                <h3 className="text-base md:text-lg font-bold text-white group-hover:text-primary-100 transition-colors">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-primary-200" : ""
                  }`}
                />
              </button>

              {/* Card Body */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-white/10"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed font-normal">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
