import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import intro from "@/assets/task-intro.mp4";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                ✨ The future of task management
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-balance">
                Organize your work,{" "}
                <span className="text-primary">amplify your impact</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                TaskFlow helps teams collaborate seamlessly, prioritize what
                matters, and ship faster. Built for modern teams.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold">10K+</p>
                <p className="text-sm text-muted-foreground">
                  Teams using TaskFlow
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-sm text-muted-foreground">
                  Uptime guarantee
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-3xl" />
            <div className="relative bg-card border border-border rounded-2xl p-8 space-y-4">
              <video src={intro} autoPlay playsInline loop></video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
