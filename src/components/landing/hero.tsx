import Image from 'next/image';
import { CheckCircle, CircleDollarSign, Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const trustIndicators = [
  { icon: CircleDollarSign, text: '$5M+ paid to freelancers' },
  { icon: CheckCircle, text: '10k+ jobs completed' },
  { icon: Globe, text: '120+ countries' },
];

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-illustration');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-teal pt-32 pb-20 md:pt-40 md:pb-28">
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiPjxwYXRoIGQ9Ik0wIC41SDMyTTUuNSAwVjMyTTExIDBWMzJNMjEuNSAwVjMyTTI3IDBWMzJNMCA1LjVIMzJNMCAxMUgzMk0wIDIxLjVIMzJNMCAyN0gzMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwwKSIvPjwvc3ZnPg==')]"
        style={{ backgroundRepeat: 'repeat' }}
      ></div>
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="text-center md:text-left">
            <Badge variant="secondary" className="bg-white/20 text-white">
              🚀 Save 15-40% on Fees
            </Badge>
            <h1 className="mt-4 text-5xl text-white md:text-6xl">
              Freelance Without the 20% Fee
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/90 md:text-xl">
              Get paid instantly in stablecoins. Build your reputation onchain. Keep more of what you earn.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                Find Work
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Hire Talent
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
              {trustIndicators.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                  <item.icon className="h-4 w-4" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto max-w-md">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={600}
                height={400}
                className="rounded-xl shadow-lg"
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
