const Social = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-center mb-16 space-y-4">
            <h4 className="text-2xl sm:text-3xl font-bold text-balance">
              TRUSTED BY LEADING TEAMS
            </h4>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help teams work smarter, not harder
            </p>
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
