import { Badge } from "./ui/badge";
import Pattern from "./pattern";
import BentoCard from "./bento-card";

export default function BentoOfTaskFlow() {
  return (
    <section id="todos">
      <div className="w-full border-b border-primary/5 flex flex-col items-center">
        <div className="self-stretch px-4 sm:px-6 md:px-24 py-8 sm:py-12 md:py-16 border-b border-primary/10 flex justify-center items-center gap-6">
          <div className="w-full max-w-[586px] px-4 sm:px-6 py-4 sm:py-5 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4">
            <Badge>Work-flow</Badge>
            <div className="w-full max-w-[560.55px] text-center flex justify-center flex-col text-[#49423D] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
              Built for clarity, focus, and smooth execution
            </div>
            <div className="self-stretch text-center text-primary text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
              Stay organized with tools that keep your work structured,
              <br className="hidden sm:block" />
              your team connected, and every task moving with purpose.
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="w-full flex">
          <Pattern length={200} />

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 border-x border-primary/5">
            <BentoCard
              title="Smart. Simple. Organized."
              desc="Everything stays neatly structured so you can focus on work instead of searching through clutter."
            >
              <div className="object-cover w-fit h-fit rounded-tl-lg rounded-bl-lg overflow-hidden">
                <img src="dashboard.png" alt="bento-grid-img" />
              </div>
            </BentoCard>

            <BentoCard
              title="Create Teams & Manage Members"
              desc="Build teams, invite members, assign tasks, and track progress—all in one organized workspace."
            >
              {/* create a team, invite team member */}
              <div className="object-cover w-fit h-fit rounded-tl-lg rounded-bl-lg overflow-hidden">
                <img src="dashboard.png" alt="bento-grid-img" />
              </div>
            </BentoCard>

            <BentoCard
              title="Real-Time Chat on Tasks"
              desc="Collaborate instantly with teammates, discuss tasks, and resolve issues faster with task-based messaging."
            >
              {/* chat on the task room */}
              <div className="object-cover w-fit h-fit rounded-tl-lg rounded-bl-lg overflow-hidden">
                <img src="dashboard.png" alt="bento-grid-img" />
              </div>
            </BentoCard>

            <BentoCard
              title="Track Tasks & Member Activity"
              desc="Stay updated with task timelines, member performance, and team activity at a glance."
            >
              {/* follow task and teammember */}
              <div className="object-cover w-fit h-fit rounded-tl-lg rounded-bl-lg overflow-hidden">
                <img src="dashboard.png" alt="bento-grid-img" />
              </div>
            </BentoCard>
          </div>

          <Pattern length={200} />
        </div>
      </div>
    </section>
  );
}
