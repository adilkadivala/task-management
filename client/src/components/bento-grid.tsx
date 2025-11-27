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
              Built for absolute clarity and focused work
            </div>
            <div className="self-stretch text-center text-primary text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
              Stay focused with tools that organize, connect
              <br className="hidden sm:block" />
              and turn information into confident decisions.
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="w-full flex">
          <Pattern length={200} />

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 border-x border-primary/5">
            <BentoCard
              title="Smart. Simple. Brilliant."
              desc="Your data is beautifully organized so you see everything clearly without the clutter."
            >
              <div className="object-cover w-fit h-fit rounded-tl-lg rounded-bl-lg overflow-hidden">
                <img src="dashboard.png" alt="bento-grid-img" />
              </div>
            </BentoCard>

            <BentoCard
              title="Creat a team, Invite members"
              desc="Create team, list out team tasks, assign task to member, track your tasks status."
            >
              {/* create a team, invite team member */}
              <div className="object-cover w-fit h-fit rounded-tl-lg rounded-bl-lg overflow-hidden">
                <img src="dashboard.png" alt="bento-grid-img" />
              </div>
            </BentoCard>

            <BentoCard
              title="Real-Time chat with members"
              desc="Collabrate with the Team, Disscuss on the Task, let help to assignee for better resoluton of the task."
            >
              {/* chat on the task room */}
              <div className="object-cover w-fit h-fit rounded-tl-lg rounded-bl-lg overflow-hidden">
                <img src="dashboard.png" alt="bento-grid-img" />
              </div>
            </BentoCard>

            <BentoCard
              title="Smart. Simple. Brilliant."
              desc="Your data is beautifully organized so you see everything clearly without the clutter."
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
