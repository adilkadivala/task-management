export default function Testimonials() {
  const testimonials = [
    {
      quote: "TaskFlow has transformed how our team collaborates. We've cut project timelines by 30%.",
      author: "Sarah Johnson",
      role: "Product Manager at TechCorp",
    },
    {
      quote: "The AI-powered task suggestions save us hours every week. Absolutely game-changing.",
      author: "Michael Chen",
      role: "CEO at StartupXYZ",
    },
    {
      quote: "Best project management tool we've used. The team loves the simplicity and power.",
      author: "Emma Wilson",
      role: "Team Lead at DesignStudio",
    },
  ]

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 border-b border-[rgba(55,50,47,0.12)]">
      <div className="w-full max-w-[1060px] mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#37322F] text-center mb-12 leading-tight">
          Loved by teams worldwide
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-6 border border-[#E0DEDB] rounded-lg bg-white hover:shadow-lg transition-shadow"
            >
              <p className="text-[#605A57] mb-4 leading-relaxed italic">"{testimonial.quote}"</p>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-[#37322F]">{testimonial.author}</p>
                <p className="text-sm text-[#605A57]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
