import Image from "next/image";
import { UserRound, Search, Zap } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const steps = [
  {
    icon: UserRound,
    title: "Create Your Profile",
    description: "Sign up with your wallet or email. Showcase your skills, portfolio, and set your rates.",
    image_id: "profile-screenshot",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    icon: Search,
    title: "Find Work or Talent",
    description: "Browse jobs or post your project. Connect with the perfect match for your needs.",
    image_id: "marketplace-screenshot",
    iconBg: "bg-success-green/10 text-success-green",
  },
  {
    icon: Zap,
    title: "Get Paid Instantly",
    description: "Funds secured in smart contract escrow. Released instantly when work is approved.",
    image_id: "payment-screenshot",
    iconBg: "bg-warning-orange/10 text-warning-orange",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl">Three Simple Steps</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started on your freelance journey with BaseLance.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const image = PlaceHolderImages.find(p => p.id === step.image_id);
            return (
              <Card key={step.title} className="overflow-hidden shadow-md transition-shadow hover:shadow-lg">
                <CardHeader className="items-center text-center">
                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${step.iconBg}`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <CardTitle as="h3" className="text-2xl">{step.title}</CardTitle>
                  <CardDescription className="text-base">{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={400}
                      height={300}
                      className="w-full rounded-lg border object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
