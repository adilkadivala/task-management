const BentoCard = ({ title, desc, children }: any) => (
  <div className="flex flex-col gap-4 border-primary/5 border">
    <div className="p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-[#37322F] text-lg sm:text-xl font-semibold">
          {title}
        </h3>
        <p className="text-[#605A57] text-sm md:text-base leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
    <div className="pl-7 pb-7 w-full overflow-hidden flex items-end justify-end-safe">
      {children}
    </div>
  </div>
);

export default BentoCard;
