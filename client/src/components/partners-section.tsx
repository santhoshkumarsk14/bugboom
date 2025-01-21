import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export function PartnersSection() {
  const partners = [
    {
      name: "Green Solutions Inc",
      logo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    },
    {
      name: "EcoInnovate",
      logo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    },
    {
      name: "Sustainable Future",
      logo: "https://images.unsplash.com/photo-1589898424451-21e24dcb143c",
    },
    {
      name: "BioTech Partners",
      logo: "https://images.unsplash.com/photo-1689514930640-123c5f55ed09",
    },
  ];

  return (
    <section id="partners" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Partners</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Working together with industry leaders to create sustainable solutions
            for a better tomorrow.
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {partners.map((partner, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card>
                  <CardContent className="p-6">
                    <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-center">{partner.name}</h3>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
