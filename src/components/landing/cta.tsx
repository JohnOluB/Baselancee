import { Button } from "@/components/ui/button";

export default function Cta() {
  return (
    <section id="for-clients" className="bg-deep-blue text-primary-foreground">
      <div
        className="container relative mx-auto px-4 py-20 md:py-28"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsla(var(--border) / 0.1) 1px, transparent 0)",
          backgroundSize: "2rem 2rem",
        }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl">Ready to Start Earning More?</h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Join thousands of freelancers who've made the switch.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="shadow-glow">
              Create Freelancer Profile
            </Button>
            <Button size="lg" variant="secondary" className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
              Post a Job
            </Button>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/60">
            No credit card required • Set up in 2 minutes
          </p>
        </div>
      </div>
    </section>
  );
}
