"use client";

import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeatureCard from "./feature-card";

export default function Hero() {
  const [activeCard, setActiveCard] = useState(0);
  const [progress, setProgress] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (!mountedRef.current) return;

      setProgress((prev) => {
        if (prev >= 100) {
          if (mountedRef.current) {
            setActiveCard((current) => (current + 1) % 3);
          }
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => {
      clearInterval(progressInterval);
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleCardClick = (index: any) => {
    if (!mountedRef.current) return;
    setActiveCard(index);
    setProgress(0);
  };

  return (
    <section>
      {" "}
      <div className="w-full flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        <div className="self-stretch rounded-[3px] flex flex-col justify-center items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <div className="w-full flex items-center text-center justify-center flex-col text-primary text-[24px] xs:text-[28px] sm:text-[36px] md:text-[52px] lg:text-[80px] font-normal leading-[1.1] sm:leading-[1.15] md:leading-[1.2] lg:leading-24 font-serif px-2 sm:px-4 md:px-0">
            Intelligent task management
            <br />
            by TaskFlow
          </div>
          <div className="w-full text-center flex justify-center flex-col text-[rgba(55,50,47,0.80)] sm:text-lg md:text-xl leading-[1.4] sm:leading-[1.45] md:leading-[1.5] lg:leading-7 font-sans px-2 sm:px-4 md:px-0 lg:text-lg font-medium text-sm">
            Streamline your workflow with AI-powered task tracking,
            <br className="hidden sm:block" />
            real-time collaboration, and seamless project organization.
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative z-10 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
        <div className="backdrop-blur-[8.25px] flex justify-start items-center gap-4">
          <div className="h-10 sm:h-11 md:h-12 px-6 sm:px-8 md:px-10 lg:px-12 py-2 sm:py-[6px] relative bg-primary overflow-hidden rounded-full flex justify-center items-center">
            <div className="flex flex-col justify-center text-white text-sm sm:text-base md:text-[15px] font-medium leading-5 font-sans">
              <Button className="cursor-pointer" asChild>
                <Link to="/auth/sign-up">Start for free</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  pt-2 sm:pt-4 pb-6 sm:pb-8 md:pb-10 px-2 sm:px-4 md:px-6 lg:px-11 flex flex-col justify-center items-center gap-2 relative z-5 my-8 sm:my-12 md:my-16 lg:my-16 mb-0 lg:pb-0">
        <div className="w-full  h-[200px] sm:h-[280px] md:h-[450px] lg:h-[695.55px] bg-white shadow-[0px_0px_0px_0.9056603908538818px_rgba(0,0,0,0.08)] overflow-hidden rounded-[6px] sm:rounded-[8px] lg:rounded-[9.06px] flex flex-col justify-start items-start">
          {/* Dashboard Content */}
          <div className="self-stretch flex-1 flex justify-start items-start">
            {/* Main Content */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full overflow-hidden">
                {/* Product Image 1 - Plan your schedules */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    activeCard === 0
                      ? "opacity-100 scale-100 blur-0"
                      : "opacity-0 scale-95 blur-sm"
                  }`}
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dsadsadsa.jpg-xTHS4hGwCWp2H5bTj8np6DXZUyrxX7.jpeg"
                    alt="Schedules Dashboard - Customer Subscription Management"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Image 2 - Data to insights */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    activeCard === 1
                      ? "opacity-100 scale-100 blur-0"
                      : "opacity-0 scale-95 blur-sm"
                  }`}
                >
                  <img
                    src="/analytics-dashboard-with-charts-graphs-and-data-vi.jpg"
                    alt="Analytics Dashboard"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Image 3 - Data visualization */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    activeCard === 2
                      ? "opacity-100 scale-100 blur-0"
                      : "opacity-0 scale-95 blur-sm"
                  }`}
                >
                  <img
                    src="/data-visualization-dashboard-with-interactive-char.jpg"
                    alt="Data Visualization Dashboard"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch border-t  border-b border-[#E0DEDB] flex justify-center items-start">
        <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
          {/* Left decorative pattern */}
          <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left  outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
              ></div>
            ))}
          </div>
        </div>

        <div className="flex-1 px-0 sm:px-2 md:px-0 flex flex-col md:flex-row justify-center items-stretch gap-0">
          {/* Feature Cards */}
          <FeatureCard
            title="Smart task organization"
            description="Automatically categorize and prioritize tasks with intelligent AI-powered suggestions."
            isActive={activeCard === 0}
            progress={activeCard === 0 ? progress : 0}
            onClick={() => handleCardClick(0)}
          />
          <FeatureCard
            title="Real-time collaboration"
            description="Keep your team synced with live updates, comments, and seamless task sharing."
            isActive={activeCard === 1}
            progress={activeCard === 1 ? progress : 0}
            onClick={() => handleCardClick(1)}
          />
          <FeatureCard
            title="Project insights"
            description="Track progress with visual analytics and actionable metrics for better planning."
            isActive={activeCard === 2}
            progress={activeCard === 2 ? progress : 0}
            onClick={() => handleCardClick(2)}
          />
        </div>

        <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
          {/* Right decorative pattern */}
          <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
              ></div>
            ))}
          </div>
        </div>
      </div>{" "}
    </section>
  );
}
