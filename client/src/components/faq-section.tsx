"use client";

import { ChevronsDownIcon } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is TaskFlow and who is it for?",
    answer:
      "TaskFlow is a simple and efficient task management platform designed for individuals and teams. It's perfect for freelancers, small teams, and organizations that need a clean way to plan tasks, manage workflows, and collaborate in real time.",
  },
  {
    question: "How does TaskFlow help teams work better?",
    answer:
      "With TaskFlow, teams can create projects, assign tasks, track progress, and communicate through real-time task-based chat. Everything stays organized inside your workspace, so your team always stays aligned.",
  },
  {
    question: "Does TaskFlow support real-time features?",
    answer:
      "Yes! TaskFlow includes real-time chat inside each task, instant updates, and live notifications for comments, assignments, and task changes — ensuring you never miss anything important.",
  },
  {
    question: "Can I use TaskFlow alone without a team?",
    answer:
      "Absolutely. TaskFlow works great for personal task planning. You can organize your workflow, track daily progress, and expand into team collaboration anytime.",
  },
  {
    question: "Is my data secure on TaskFlow?",
    answer:
      "Yes. TaskFlow uses secure authentication, encrypted communication, and professionally managed databases to keep your data safe and private.",
  },
  {
    question: "How do I get started with TaskFlow?",
    answer:
      "Just create an account, set up your first task or team, and you’re ready to go! The platform is designed to be simple, fast, and intuitive for all types of users.",
  },
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full flex justify-center items-start">
      <div className="flex-1 px-4 md:px-12 py-16 md:py-20 flex flex-col lg:flex-row justify-start items-start gap-6 lg:gap-12">
        {/* Left Column - Header */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-start gap-4 lg:py-5">
          <div className="w-full flex flex-col justify-center text-primary font-semibold leading-tight md:leading-[44px] font-sans text-4xl tracking-tight">
            Frequently Asked Questions
          </div>
          <div className="w-full text-primary/65 dark:text-secondary/65 text-base font-normal leading-7 font-sans">
            Create a Task, Build your dashboard,
            <br className="hidden md:block" />
            Chat with your team member.
          </div>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-center">
          <div className="w-full flex flex-col">
            {faqData.map((item, index) => {
              const isOpen = openItems.includes(index);

              return (
                <div
                  key={index}
                  className="w-full border-b border-primary/15 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="group w-full px-5 py-[18px] flex justify-between items-center gap-5 text-left hover:bg-primary transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1 text-primary text-base font-medium leading-6 font-sans group-hover:text-secondary transition-all">
                      {item.question}
                    </div>
                    <div className="flex justify-center items-center">
                      <ChevronsDownIcon
                        className={`w-6 h-6 text-primary group-hover:text-secondary transition-transform duration-300 ease-in-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-[18px] text-primary/65 dark:text-secondary/65 text-sm font-normal leading-6 font-sans">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
