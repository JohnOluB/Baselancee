import { User, Search, Zap } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

const steps = [
  {
    icon: User,
    title: "Create Your Profile",
    description: "Sign up with your wallet or email. Showcase your skills, portfolio, and set your rates.",
    visual_id: "profile-creation",
  },
  {
    icon: Search,
    title: "Find Work or Talent",
    description: "Browse jobs or post your project. Connect with the perfect match for your needs.",
    visual_id: "find-work",
  },
  {
    icon: Zap,
    title: "Get Paid Instantly",
    description: "Funds secured in smart contract escrow. Released instantly when work is approved.",
    visual_id: "get-paid",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A simplified, transparent, and secure freelance experience.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const image = PlaceHolderImages.find(p => p.id === step.visual_id);
            return (
                <Card key={step.title} className="bg-card border shadow-sm transition-shadow hover:shadow-lg text-center items-center">
                <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <step.icon className="h-8 w-8" />
                    </div>
                    <CardTitle as="h3" className="text-xl">{step.title}</CardTitle>
                    <CardDescription className="text-base mt-2">{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                        {image ? (
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                width={600}
                                height={400}
                                className="w-full h-full object-cover"
                                data-ai-hint={image.imageHint}
                            />
                        ) : (
                            <p className="text-muted-foreground text-sm">[Visual Placeholder]</p>
                        )}
                    </div>
                </CardContent>
                </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
