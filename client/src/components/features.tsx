import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Users,
  BarChart3,
  Smartphone,
} from "lucide-react";
const Features = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-balance">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help teams work smarter, not harder
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "Lightning Fast",
              description:
                "Instant task creation and updates. No lag, no delays. Pure productivity.",
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description:
                "Real-time collaboration with your team. Comments, mentions, and shared views.",
            },
            {
              icon: BarChart3,
              title: "Smart Analytics",
              description:
                "Track progress with beautiful dashboards. Understand your team's velocity.",
            },
            {
              icon: Smartphone,
              title: "Mobile Ready",
              description:
                "Manage tasks on the go. Full-featured mobile app for iOS and Android.",
            },
            {
              icon: CheckCircle2,
              title: "Automation",
              description:
                "Automate repetitive tasks. Set rules and let TaskFlow handle the rest.",
            },
            {
              icon: ArrowRight,
              title: "Integrations",
              description:
                "Connect with your favorite tools. Slack, GitHub, Jira, and more.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <feature.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
