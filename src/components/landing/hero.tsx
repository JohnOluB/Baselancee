
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';


export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-illustration');

  return (
    <section className="relative bg-background pt-24 md:pt-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold">
              The future of work is here
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              BaseLance is a professional, modern, and trustworthy platform for freelancers and clients, aiming to replace platforms like Upwork with lower fees and instant crypto payments.
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
              <Link href="/signup">
                  <Button size="lg">
                      Get Started
                  </Button>
              </Link>
            </div>
          </div>

          <div className="relative w-full">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={600}
                className="rounded-xl shadow-lg w-full"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
