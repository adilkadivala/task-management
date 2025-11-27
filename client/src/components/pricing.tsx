export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for freelancers",
      features: ["Up to 5 projects", "Basic integrations", "Email support"],
    },
    {
      name: "Professional",
      price: "$79",
      description: "For growing teams",
      features: [
        "Unlimited projects",
        "Advanced integrations",
        "Priority support",
        "Team collaboration",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "24/7 support",
        "Dedicated account manager",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="w-full py-16 sm:py-20 md:py-24 border-b border-[rgba(55,50,47,0.12)]"
    >
      <div className="w-full max-w-[1060px] mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#37322F] text-center mb-12 leading-tight">
          Simple, transparent pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-lg border transition-all ${
                plan.highlighted
                  ? "border-[#37322F] bg-[#37322F] text-white shadow-lg"
                  : "border-[#E0DEDB] bg-white hover:shadow-lg"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-2 ${
                  plan.highlighted ? "text-white" : "text-[#37322F]"
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm mb-4 ${
                  plan.highlighted ? "text-white/80" : "text-[#605A57]"
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
                    ? "bg-white text-[#37322F] hover:bg-[#F5F3F1]"
                    : "bg-[#37322F] text-white hover:bg-[#37322F]/90"
                }`}
              >
                Get started
              </button>
              <ul
                className={`space-y-3 text-sm ${
                  plan.highlighted ? "text-white/80" : "text-[#605A57]"
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
