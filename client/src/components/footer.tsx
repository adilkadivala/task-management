const Footer = () => {
  const date = new Date();
  const newDate = date.getFullYear();

  return (
    <footer className="w-full bg-[#F7F5F3] border-t border-[rgba(55,50,47,0.12)]">
      <div className="w-full max-w-[1060px] mx-auto">
        <div className="border-t border-[#E0DEDB] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#605A57] text-sm">
            © {newDate} TaskFlow. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "GitHub", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[#605A57] hover:text-[#37322F] transition-colors text-sm"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="hidden p-0 h-full lg:flex items-stretch justify-center w-full">
        <span className="text-[200px] font-stretch-extra-expanded font-extrabold tracking-normal bg-linear-to-t from-primary to-secondary/20 bg-clip-text text-transparent">
          TaskFlow
        </span>
      </div>
    </footer>
  );
};

export default Footer;
