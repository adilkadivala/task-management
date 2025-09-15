"use client";

import { MessageCircleDashed, Sparkles, SquareSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
} from "@/components/ui/select";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";

const PlayGroundHeader = () => {
  const [selected, setSelected] = useState("ChatGPT");
  return (
    <div className="w-full p-2 flex items-center">
      <div className=" w-[20%]">
        <Select value={selected} onValueChange={(val) => setSelected(val)}>
          <SelectTrigger className="w-fit border-0 ring-0 text-xl shadow-none hover:bg-secondary">
            <span className="text-base">{selected}</span>
          </SelectTrigger>

          <SelectContent className="rounded-2xl ">
            <SelectGroup>
              <SelectItem value="ChatGPT Go" className="p-0">
                <div className="flex items-center gap-2 p-2 ">
                  <Sparkles className="w-4 h-4" />
                  <div className="flex flex-col w-full">
                    <p>ChatGPT Go</p>
                    <p className="text-sm text-muted-foreground">
                      our smartest model & more
                    </p>
                  </div>
                  {selected !== "ChatGPT Go" && (
                    <Badge variant="outline" className="ml-auto">
                      Upgrade
                    </Badge>
                  )}
                </div>
              </SelectItem>

              <SelectItem value="ChatGPT" className="p-0">
                <div className="flex items-center gap-2 p-2">
                  <SquareSquare className="w-4 h-4" />
                  <div className="flex flex-col">
                    <p>ChatGPT</p>
                    <p className="text-sm text-muted-foreground">
                      greate for everyday tasks
                    </p>
                  </div>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className=" flex-1 flex items-center justify-center">
        <Button
          asChild
          variant="secondary"
          className="flex items-center p-0 w-fit rounded-3xl text-indigo-600"
        >
          <Link href="/">
            <Sparkles className="text-sm" />
            Upgrade to Go
          </Link>
        </Button>
      </div>

      <div className="w-[20%] flex items-end justify-end">
        <MessageCircleDashed size="18px" className="w-fit"/>
      </div>
    </div>
  );
};

export default PlayGroundHeader;
