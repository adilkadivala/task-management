import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">TaskFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="#features"
            className="text-sm hover:text-primary transition"
          >
            Features
          </Link>
          <Link to="#pricing" className="text-sm hover:text-primary transition">
            Pricing
          </Link>
          <Link to="#" className="text-sm hover:text-primary transition">
            Docs
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/auth/sign-in">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/auth/sign-up">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
