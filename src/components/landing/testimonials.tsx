import Image from "next/image";

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
    name: "Sophia Carter",
    role: "Web Developer",
    quote: "BaseLance has revolutionized my freelancing career. The lower fees and instant crypto payments have significantly increased my earnings, and the platform's transparency has built trust with my clients.",
    avatar_id: "avatar-sarah",
  },
  {
    name: "Ethan Lee",
    role: "Project Manager",
    quote: "Finding top talent has never been easier. BaseLance's streamlined search and vetting process helped me connect with skilled professionals who delivered exceptional results. The secure transaction system ensured a smooth and trustworthy experience.",
    avatar_id: "avatar-james",
  },
  {
    name: "Olivia Ramirez",
    role: "Graphic Designer",
    quote: "BaseLance is a game-changer for freelancers. The platform's modern interface and focus on transparency have made it my go-to for finding projects and building lasting client relationships. The instant crypto payments are a huge plus!",
    avatar_id: "avatar-maria",
  },
];

export default function Testimonials() {
  return (
    <section id="for-freelancers" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl">Testimonials</h2>
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
                  <div className="p-1 h-full">
                    <Card className="h-full shadow-md bg-background flex flex-col items-center text-center">
                      <CardContent className="flex h-full flex-col justify-center items-center p-6">
                        <Avatar className="w-24 h-24 mb-4">
                          {avatar && <AvatarImage src={avatar.imageUrl} alt={testimonial.name} data-ai-hint={avatar.imageHint} />}
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <blockquote className="text-base italic text-muted-foreground">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="mt-6">
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
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
