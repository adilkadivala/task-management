const FeatureCard = ({
  title,
  description,
  isActive,
  progress,
  onClick,
}: {
  title: string;
  description: string;
  isActive: boolean;
  progress: number;
  onClick: () => void;
}) => {
  return (
    <div
      className={`w-full md:flex-1 self-stretch px-6 py-5 overflow-hidden flex flex-col justify-start items-start gap-2 cursor-pointer relative border-b md:border-b-0 last:border-b-0 ${
        isActive
          ? "bg-card"
          : "border-l-0 border-r-0 md:border border-primary/15"
      }`}
      onClick={onClick}
    >
      {isActive && (
        <div className="absolute top-0 left-0 w-full h-0.5 bg-accent">
          <div
            className="h-full bg-primary transition-all ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="self-stretch flex justify-center flex-col text-primary text-sm md:text-sm font-semibold leading-6 md:leading-6 font-sans">
        {title}
      </div>
      <div className="self-stretch text-primary/65 dark:text-secondary/65 text-[13px] md:text-[13px] font-normal leading-[22px] md:leading-[22px] font-sans">
        {description}
      </div>
    </div>
  );
};

export default FeatureCard;
