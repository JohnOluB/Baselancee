
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-illustration');

  return (
    <section className="bg-background pt-36 pb-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold">
              The future of work is here
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto md:mx-0">
              BaseLance is a professional, modern, and trustworthy platform for freelancers and clients, aiming to replace platforms like Upwork with lower fees and instant crypto payments.
            </p>
            <div className="mt-8 flex justify-center">
              <Button size="lg" asChild>
                  <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>

          <div>
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={600}
                height={600}
                className="rounded-xl shadow-lg w-full h-auto"
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
