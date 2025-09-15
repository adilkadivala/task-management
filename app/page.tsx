"use client";

import type React from "react";

import PlayGroundHeader from "@/components/play-ground-header";
import { Textarea } from "@/components/ui/textarea";
import { AudioLines, Mic, Plus } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // Handle message submission here
      console.log("Message submitted:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 h-full">
      <PlayGroundHeader />
      <section className="w-full flex flex-col h-[80vh] justify-center items-center">
        <div className="h-16">
          <p className="text-2xl">Hey, kadi. Ready to dive in?</p>
        </div>
        <div className="border rounded-3xl max-w-3xl w-full overflow-hidden">
          <div className="flex items-end min-h-12 py-3 px-4 gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <Plus className="cursor-pointer size-6 flex-shrink-0 " />
            <div className="flex-1 flex flex-col">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything"
                className="flex-1 border-none p-0 bg-transparent shadow-none placeholder-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-base resize-none min-h-[24px] max-h-[200px] "
              />
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <Mic className="cursor-pointer size-6" />
              <AudioLines className="size-6 bg-muted rounded-full cursor-pointer p-1" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
