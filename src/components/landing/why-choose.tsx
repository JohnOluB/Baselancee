import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";


const items = [
    {
      title: "For Freelancers",
      description: "Maximize your earnings with lower fees and instant crypto payments. Gain access to a wide range of projects and clients, building your professional reputation on a trusted platform.",
      image_id: "why-choose-freelancer"
    },
    {
      title: "For Clients",
      description: "Find top talent quickly and efficiently with our streamlined search and vetting process. Benefit from transparent communication and secure transactions, ensuring project success and satisfaction.",
      image_id: "why-choose-client"
    }
]

export default function WhyChoose() {
  return (
    <section id="why-baselance" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl">Why Choose BaseLance?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            BaseLance offers a unique blend of features designed to empower freelancers and clients alike. Our platform fosters a collaborative environment, ensuring project success and satisfaction.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
            {items.map(item => {
                const image = PlaceHolderImages.find(p => p.id === item.image_id);
                return (
                    <Card key={item.title} className="border-none bg-transparent shadow-none">
                        <CardContent className="p-0">
                            {image && (
                                <Image
                                src={image.imageUrl}
                                alt={image.description}
                                width={600}
                                height={200}
                                className="w-full h-[200px] rounded-lg object-cover"
                                data-ai-hint={image.imageHint}
                                />
                            )}
                        </CardContent>
                        <CardHeader className="px-0">
                            <CardTitle as="h3" className="text-2xl">{item.title}</CardTitle>
                            <CardDescription className="text-base mt-2">{item.description}</CardDescription>
                        </CardHeader>
                    </Card>
                )
            })}
        </div>
      </div>
    </section>
  );
}
