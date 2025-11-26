import EffortlessIntegration from "./effort-less-intigration";
import SmartSimpleBrilliant from "./smart-simple-brilliant";
import { Badge } from "./ui/badge";
import YourWorkInSync from "./your-work-in-synk";

const BentoOfTaskFlow = () => {
  return (
    <div className="w-full border-b border-primary/5 flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="self-stretch px-4 sm:px-6 md:px-8 lg:px-0  py-8 sm:py-12 md:py-16 border-b border-primary/5 flex justify-center items-center gap-6">
        <div className="w-full  px-4 sm:px-6 py-4 sm:py-5 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4 shadow-none">
          <Badge variant="default">Work-flow</Badge>
          <div className="w-full max-w-[598.06px] lg:w-[598.06px] text-center flex justify-center flex-col text-[#49423D] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Built for absolute clarity and focused work
          </div>
          <div className="self-stretch text-center text-[#605A57] text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
            Stay focused with tools that organize, connect
            <br />
            and turn information into confident decisions.
          </div>
        </div>
      </div>

      {/* Bento Grid Content */}
      <div className="self-stretch flex justify-center items-start">
        <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
          {/* Left decorative pattern */}
          <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
            {Array.from({ length: 200 }).map((_, i) => (
              <div
                key={i}
                className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
              />
            ))}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-r border-primary/5">
          {/* Top Left - Smart. Simple. Brilliant. */}
          <div className="border-b border-r-0 md:border-r border-primary/5 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold leading-tight font-sans">
                Smart. Simple. Brilliant.
              </h3>
              <p className="text-[#605A57] text-sm md:text-base font-normal leading-relaxed font-sans">
                Your data is beautifully organized so you see everything clearly
                without the clutter.
              </p>
            </div>
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex items-center justify-center overflow-hidden">
              <SmartSimpleBrilliant />
            </div>
          </div>

          {/* Top Right - Your work, in sync */}
          <div className="border-b border-primary/5 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#37322F] font-semibold leading-tight font-sans text-lg sm:text-xl">
                Your work, in sync
              </h3>
              <p className="text-[#605A57] text-sm md:text-base font-normal leading-relaxed font-sans">
                Every update flows instantly across your team and keeps
                collaboration effortless and fast.
              </p>
            </div>
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex overflow-hidden text-right items-center justify-center">
              <YourWorkInSync />
            </div>
          </div>

          {/* Bottom Left - Effortless integration */}
          <div className="border-r-0 md:border-r border-primary/5 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6 bg-transparent">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold leading-tight font-sans">
                Effortless integration
              </h3>
              <p className="text-[#605A57] text-sm md:text-base font-normal leading-relaxed font-sans">
                All your favorite tools connect in one place and work together
                seamlessly by design.
              </p>
            </div>
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex overflow-hidden justify-center items-center relative bg-transparent">
              <div className="w-full h-full flex items-center justify-center bg-transparent">
                <EffortlessIntegration />
              </div>
              {/* Gradient mask for soft bottom edge */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F7F5F3] to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Bottom Right - Numbers that speak */}
          <div className="border-b border-r-0 md:border-r border-primary/5 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-start items-start gap-4 sm:gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold leading-tight font-sans">
                Smart. Simple. Brilliant.
              </h3>
              <p className="text-[#605A57] text-sm md:text-base font-normal leading-relaxed font-sans">
                Your data is beautifully organized so you see everything clearly
                without the clutter.
              </p>
            </div>
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg flex items-center justify-center overflow-hidden">
              <SmartSimpleBrilliant />
            </div>
          </div>
        </div>

        <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
          {/* Right decorative pattern */}
          <div className="w-[120px] sm:w-[140px] md:w-[162px] left-[-40px] sm:left-[-50px] md:left-[-58px] top-[-120px] absolute flex flex-col justify-start items-start">
            {Array.from({ length: 200 }).map((_, i) => (
              <div
                key={i}
                className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left  outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoOfTaskFlow;
