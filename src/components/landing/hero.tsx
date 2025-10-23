
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '../ui/badge';
import { Check, Globe, DollarSign } from 'lucide-react';


export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-illustration');

  return (
    <section className="relative bg-gradient-to-br from-primary to-teal-500 text-white pt-32 pb-20 md:pt-48 md:pb-28 overflow-hidden">
        <div
        className="absolute inset-0 bg-repeat opacity-5"
        style={{ backgroundImage: "url('/geometric-pattern.svg')" }}
      />
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <Badge className="bg-white/20 text-white backdrop-blur-sm mb-4">🚀 Save 15-40% on Fees</Badge>
            <h1 className="text-5xl md:text-6xl font-bold">
              Freelance Without the 20% Fee
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90">
                Get paid instantly in stablecoins. Build your reputation onchain. Keep more of what you earn.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-200 shadow-glow">
                  <Link href="/signup/freelancer">Find Work</Link>
              </Button>
               <Button size="lg" variant="outline" asChild className="bg-transparent text-white border-white hover:bg-white hover:text-primary">
                   <Link href="/signup/client">Hire Talent</Link>
               </Button>
            </div>
             <div className="mt-10 flex justify-center md:justify-start items-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>$5M+ paid out</span>
                </div>
                <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>1,200+ jobs completed</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>75+ countries</span>
                </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={600}
                height={600}
                className="rounded-xl shadow-lg w-full"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
             {/* Floating elements can be added here */}
          </div>
        </div>
      </div>
    </section>
  );
}
