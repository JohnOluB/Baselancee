import { DollarSign, Zap, ShieldCheck } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    icon: DollarSign,
    title: "Lower Fees",
    description: "BaseLance offers significantly lower fees compared to traditional platforms, maximizing earnings for freelancers and reducing costs for clients.",
  },
  {
    icon: Zap,
    title: "Instant Crypto Payments",
    description: "Experience the future of payments with instant crypto transactions, ensuring fast and secure transfers without intermediaries.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Transparent",
    description: "Our platform prioritizes security and transparency, providing a safe environment for both freelancers and clients to collaborate effectively.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl">How BaseLance Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            BaseLance connects freelancers with clients seeking top talent. Our platform ensures secure transactions, transparent communication, and efficient project management.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.title} className="bg-muted/30 border-none shadow-sm transition-shadow hover:shadow-lg text-center items-center">
              <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <step.icon className="h-8 w-8" />
                  </div>
                <CardTitle as="h3" className="text-xl">{step.title}</CardTitle>
                <CardDescription className="text-base mt-2">{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
