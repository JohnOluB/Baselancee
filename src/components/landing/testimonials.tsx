import Image from "next/image";
import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const testimonials = [
  {
    name: "Sarah O.",
    role: "Graphic Designer, Lagos",
    quote: "I saved $200 on my first job alone. The instant payments are a game-changer for freelancers in Nigeria.",
    stats: "32 jobs • $12,450 earned",
    avatar_id: "avatar-sarah",
  },
  {
    name: "James K.",
    role: "Full-Stack Developer, Nairobi",
    quote: "No more waiting for PayPal transfers. I get paid in USDC and cash out locally whenever I want.",
    stats: "18 jobs • $45,000 earned",
    avatar_id: "avatar-james",
  },
  {
    name: "Maria S.",
    role: "Content Writer, Remote",
    quote: "My reputation is finally portable. I can prove my track record anywhere with my onchain profile.",
    stats: "56 jobs • $23,100 earned",
    avatar_id: "avatar-maria",
  },
];

export default function Testimonials() {
  return (
    <section id="for-freelancers" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl">Trusted by Freelancers Worldwide</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear from freelancers who are building their careers on BaseLance.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="mt-12"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const avatar = PlaceHolderImages.find(p => p.id === testimonial.avatar_id);
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full shadow-md">
                      <CardContent className="flex h-full flex-col justify-between p-6">
                        <div>
                          <div className="flex items-center gap-4">
                            <Avatar>
                              {avatar && <AvatarImage src={avatar.imageUrl} alt={testimonial.name} data-ai-hint={avatar.imageHint} />}
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </div>
                          <div className="mt-4 flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <blockquote className="mt-4 border-l-2 border-border pl-4 text-lg italic">
                            {testimonial.quote}
                          </blockquote>
                        </div>
                        <p className="mt-6 text-sm font-medium text-muted-foreground">{testimonial.stats}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
