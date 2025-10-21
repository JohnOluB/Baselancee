import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Cta() {
  return (
    <section id="cta" className="bg-background text-foreground py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold">Join BaseLance Today</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experience the future of work with BaseLance. Sign up now and start connecting with top talent or exciting projects.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/sign-up">
              <Button size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
