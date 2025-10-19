import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/10">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-balance">
            Ready to transform your workflow?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of teams already using TaskFlow to work smarter
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gap-2">
            Start Your Free Trial <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline">
            Schedule a Demo
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          No credit card required. 14-day free trial.
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
