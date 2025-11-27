import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();
  const newDate = date.getFullYear();

  const socials = [
    {
      name: "X",
      url: "https://x.com/adil_kadival",
    },
    {
      name: "Github",
      url: "https://github/adilkadivala",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/adilkadivala",
    },
  ];

  return (
    <footer className="w-full bg-accent border border-primary/10">
      <div className="w-full max-w-[1060px] mx-auto">
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#605A57] text-sm">
            © {newDate} TaskFlow. All rights reserved.
          </p>
          <div className="flex gap-6">
            {socials.map((social) => (
              <Link
                to={social.url}
                className="text-[#605A57] hover:text-[#37322F] transition-colors text-sm"
              >
                {social.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="hidden p-0 h-full lg:flex items-stretch justify-center w-full">
        <span className="text-[200px] font-stretch-extra-expanded font-extrabold tracking-normal bg-linear-to-t from-accent to-accent-foreground/20 bg-clip-text text-transparent">
          TaskFlow
        </span>
      </div>
    </footer>
  );
};

export default Footer;
