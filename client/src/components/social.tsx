const Social = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground font-medium mb-4">
            TRUSTED BY LEADING TEAMS
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            {["Stripe", "Vercel", "Figma", "Notion"].map((company) => (
              <div key={company} className="text-center">
                <p className="font-semibold text-foreground/60">{company}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            { stat: "50%", label: "Faster task completion" },
            { stat: "3x", label: "Better team alignment" },
            { stat: "99.9%", label: "Uptime SLA" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-xl border border-border"
            >
              <p className="text-4xl font-bold text-primary mb-2">
                {item.stat}
              </p>
              <p className="text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Social;
