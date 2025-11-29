export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for individuals and personal productivity",
      features: [
        "Unlimited personal tasks",
        "Single user workspace",
        "Basic task filters",
        "Real-time task updates",
      ],
    },
    {
      name: "Team",
      price: "$12/user",
      description: "Built for small teams and collaboration",
      features: [
        "Unlimited teams & projects",
        "Task assignment & tracking",
        "Real-time chat on tasks",
        "Notifications & activity log",
        "Invite up to 20 members",
      ],
      highlighted: true,
    },
    {
      name: "Organization",
      price: "Custom",
      description: "For larger teams that need advanced control",
      features: [
        "Unlimited members",
        "Advanced permission controls",
        "Priority customer support",
        "Custom onboarding",
        "Dedicated workspace manager",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="w-full py-16 md:py-24 border-b border-primary/10"
    >
      <div className="w-full max-w-[1060px] mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-primary text-center mb-12 leading-tight">
          Simple, transparent pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-4 lg:p-8 rounded-lg border transition-all ${
                plan.highlighted
                  ? "border-primary bg-primary text-secondary shadow-lg"
                  : "border-primary/20 bg-card hover:shadow-lg"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-2 ${
                  plan.highlighted ? "text-secondary" : "text-primary"
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm mb-4 ${
                  plan.highlighted ? "text-secondary/85" : "text-primary"
                }`}
              >
                {plan.description}
              </p>
              <div className="text-3xl font-serif font-normal mb-6">
                {plan.price}
              </div>
              <button
                className={`w-full py-2 px-4 rounded-lg font-medium mb-6 transition-colors ${
                  plan.highlighted
                    ? "bg-secondary text-primary"
                    : "bg-primary text-secondary hover:bg-primary/90"
                }`}
              >
                Get started
              </button>
              <ul
                className={`space-y-3 text-sm ${
                  plan.highlighted ? "text-secondary" : "text-primary"
                }`}
              >
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
