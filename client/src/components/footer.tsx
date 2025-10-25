import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();
  const newDate = date.getFullYear();

  return (
    <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold">TaskFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The modern task management platform.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#features"
                  className="hover:text-foreground transition"
                >
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="#" className="hover:text-foreground transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-foreground transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="#" className="hover:text-foreground transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-foreground transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-foreground transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {newDate} TaskFlow. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link to="#" className="hover:text-foreground transition">
              Twitter
            </Link>
            <a
              href="https://www.github.com/adilkadivala"
              target="_blank"
              className="hover:text-foreground transition"
            >
              GitHub
            </a>
            <Link to="#" className="hover:text-foreground transition">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
