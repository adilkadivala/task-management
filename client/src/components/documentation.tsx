"use client";

import { useState, useEffect } from "react";
import { Badge } from "./ui/badge";

export default function DocumentationSection() {
  const [activeCard, setActiveCard] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const cards = [
    {
      title: "Plan Your Work Efficiently",
      description:
        "Organize tasks, set priorities, and keep your daily workflow structured and predictable.",
      image: "/dashboard.png",
    },
    {
      title: "Insights at a Glance",
      description:
        "Track task status, progress, and team activity with clean, easy-to-read dashboards.",
      image: "/dashboard.png",
    },
    {
      title: "Collaborate Seamlessly",
      description:
        "Work together with your team in real-time through shared tasks and instant updates.",
      image: "/dashboard.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
      setAnimationKey((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [cards.length]);

  const handleCardClick = (index: number) => {
    setActiveCard(index);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className="w-full border-b border-primary/15 flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="self-stretch px-6 md:px-24 py-12 md:py-16 border-b border-primary/15 flex justify-center items-center gap-6">
        <div className="w-full max-w-[586px] px-6 py-5 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-4">
          <Badge>Platform Features</Badge>

          <div className="self-stretch text-center flex justify-center flex-col text-primary text-3xl md:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Everything you need to stay organized
          </div>

          <div className="self-stretch text-center text-primary/65 dark:text-secondary/65 text-base font-normal leading-7 font-sans">
            Plan tasks, monitor progress, and collaborate with your team —
            <br />
            all from one simple and powerful workspace.
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="self-stretch px-4 lg:px-9 overflow-hidden flex justify-start items-center">
        <div className="flex-1 py-8 lg:py-11 flex flex-col lg:flex-row justify-start items-center gap-6 lg:gap-12">
          {/* Left Column - Feature Cards */}
          <div className="w-full lg:w-auto lg:max-w-[400px] flex flex-col justify-center items-center gap-4 order-2 lg:order-1">
            {cards.map((card, index) => {
              const isActive = index === activeCard;

              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`w-full overflow-hidden flex flex-col justify-start items-start transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-card"
                      : "border border-primary/15"
                  }`}
                >
                  <div
                    className={`w-full h-0.5 bg-[rgba(50,45,43,0.08)] overflow-hidden ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div
                      key={animationKey}
                      className="h-0.5 bg-[#322D2B] animate-[progressBar_5s_linear_forwards] will-change-transform"
                    />
                  </div>
                  <div className="px-6 py-5 w-full flex flex-col gap-2">
                    <div className="self-stretch flex justify-center flex-col text-primary text-sm font-semibold leading-6 font-sans">
                      {card.title}
                    </div>
                    <div className="self-stretch text-primary/65 dark:text-secondary/65 text-[13px] font-normal leading-[22px] font-sans whitespace-pre-line">
                      {card.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column - Image */}
          <div className="w-full lg:w-auto rounded-lg flex flex-col justify-center items-center gap-2 order-1 md:order-2 ">
            <div className="w-full lg:w-[980px] h-[250px] md:h-[420px] bg-white overflow-hidden rounded-lg flex flex-col justify-start items-start">
              {cards.map((card) => (
                <img
                  src={card.image}
                  className={`object-cover h-fit w-fit transition-all duration-300 ${
                    activeCard === 0
                      ? "bg-gradient-to-br from-blue-50 to-blue-100"
                      : activeCard === 1
                      ? "bg-gradient-to-br from-purple-50 to-purple-100"
                      : "bg-gradient-to-br from-green-50 to-green-100"
                  }`}
                  alt=""
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
