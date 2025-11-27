"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeatureCard from "./feature-card";

interface CARD {
  title: string;
  description: string;
  image: string;
}

export default function Hero() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const cards: CARD[] = [
    {
      title: "Smart task organization",
      description:
        "Automatically categorize and prioritize tasks with intelligent AI-powered suggestions.",
      image: "dashboard.png",
    },
    {
      title: "Solo or Work with Team",
      description: "follow your daily task with team and",
      image: "dashboard.png",
    },
    {
      title: "Collaborate seamlessly",
      description: "Work together in real-time with your team",
      image: "dashboard.png",
    },
  ];

  useEffect(() => {
    const i = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setActive((a) => (a + 1) % cards.length);
          return 0;
        }
        return p + 2;
      });
    }, 1000);

    return () => clearInterval(i);
  }, []);

  const selectCard = (index: number) => {
    setActive(index);
    setProgress(0);
  };

  return (
    <section id="features" className="flex flex-col items-center">
      <div className="text-center max-w-3xl px-4">
        <h1 className="text-primary text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight">
          Intelligent task management <br /> by TaskFlow
        </h1>

        <p className="text-gray-600 mt-4 text-sm sm:text-lg">
          Streamline your workflow with AI-powered task tracking, real-time
          collaboration, and seamless project organization.
        </p>
      </div>

      <div className="mt-8">
        <Button asChild className="px-11 py-5 rounded-full">
          <Link to="/auth/sign-up">Start for free</Link>
        </Button>
      </div>

      <div className="w-full max-w-7xl mt-10">
        <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[600px] rounded-lg overflow-hidden shadow">
          {cards.map((card, index) => (
            <img
              key={index}
              src={card.image}
              style={{ zIndex: active === index ? 10 : 0 }}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                active === index
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 blur-sm"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex w-full max-w-7xl border-t border-b mt-10">
        {cards.map((card, index) => (
          <FeatureCard
            key={index}
            title={card.title}
            description={card.description}
            isActive={active === index}
            progress={active === index ? progress : 0}
            onClick={() => selectCard(index)}
          />
        ))}
      </div>
    </section>
  );
}
