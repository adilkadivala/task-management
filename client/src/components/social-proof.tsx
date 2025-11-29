import { Workflow } from "lucide-react";
import { Badge } from "./ui/badge";
import Pattern from "./pattern";

const Socialproof = () => {
  const logos = Array.from({ length: 8 });
  return (
    <div className="w-full border-b border-primary/10 flex flex-col justify-center items-center">
      <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 border-b border-primary/10 flex justify-center items-center gap-6">
        <div className="w-full max-w-[586px] px-4 sm:px-6 py-4 sm:py-5 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4">
          <Badge>Backed By</Badge>
          <div className="w-full max-w-[472.55px] text-center flex justify-center flex-col text-primary text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Confidence backed by results
          </div>
          <div className="self-stretch text-center text-primary/65 dark:text-secondary/65 text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
            Our customers achieve more each day
            <br className="hidden sm:block" />
            because their tools are simple, powerful, and clear.
          </div>
        </div>
      </div>

      {/* Logo Grid */}
      <div className="self-stretch border-primary/10 flex justify-center items-start border-t ">
        <Pattern length={50} />

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-0">
          {logos.map((_, index) => {
            return (
              <div
                key={index}
                className="group h-28 sm:h-32 md:h-36 flex flex-col sm:flex-row justify-center items-center gap-2 border-l border-r border-b border-primary/10 hover:bg-card transition delay-300"
              >
                <div className="w-6 h-6 relative rounded-full">
                  <Workflow className="group-hover:rotate-180 duration-300 ease-in-out group-hover:text-primary transition delay-300" />
                </div>
                <div className="text-center flex justify-center flex-col text-primary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-tight md:leading-9 dark:group-hover:text-secondary transition-all delay-300">
                  TaskFlow
                </div>
              </div>
            );
          })}
        </div>
        <Pattern length={50} />
      </div>
    </div>
  );
};

export default Socialproof;
