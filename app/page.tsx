import PlayGroundHeader from "@/components/play-ground-header";
import { Input } from "@/components/ui/input";
import { AudioLines, MessageCircleDashed, Mic, Plus } from "lucide-react";
export default function Home() {
  return (
    <>
      <PlayGroundHeader />
      <div className="flex flex-col items-center gap-3 justify-center">
        <p className="text-2xl">Where should we begin?</p>
        <div className="border flex justify-between items-center h-15 rounded-4xl w-3xl py-2 px-2 gap-1">
          <Plus className="cursor-pointer w-10 h-full p-2" />
          <Input
            placeholder="Ask anything"
            className="border-0 h-full text-2xl outline-none ring-0 shadow-none focus:ring-0 focus:outline-none focus:border-0 focus-visible:ring-0 focus-visible:border-0 p-0"
          />
          <Mic className="cursor-pointer w-10 h-full p-2" />
          <AudioLines className=" w-10 h-full p-2 bg-muted rounded-full cursor-pointer" />
        </div>
      </div>
    </>
  );
}
