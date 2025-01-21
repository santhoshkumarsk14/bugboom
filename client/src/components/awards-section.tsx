import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Star, Trophy } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function AwardsSection() {
  const awards = [
    {
      icon: <Trophy className="h-12 w-12 text-primary" />,
      title: "Kumar Sustainability & Innovation Prize",
      organization: "Runner-up",
      year: "2024",
      images: [
        "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/awards/1731560506158.jpeg",
        "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/awards/1731560511064.jpeg",
        "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/award1-3.jpg",
      ],
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title: "ASEAN Circular Economy Forum",
      organization: "Featured Speaker",
      year: "2024",
      images: [
        "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/awards/1731563170286.jpeg",
    },
    {
      icon: <Star className="h-12 w-12 text-primary" />,
      title: "NTU Entrepreneurship Academy",
      organization: "Guest Speaker",
      year: "2024",
      images: [
        "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/awards/1731563011087.jpeg",
        "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/awards/1731563011610.jpeg",
      ],
    },
  ];

  return (
    <section id="awards" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Recognition & Awards
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our commitment to sustainability and innovation has been recognized
            by leading industry organizations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="w-full mb-4"
                  >
                    <CarouselContent>
                      {award.images.map((image, imageIndex) => (
                        <CarouselItem key={imageIndex}>
                          <div className="aspect-video relative rounded-lg overflow-hidden">
                            <img
                              src={image}
                              alt={`${award.title} - Image ${imageIndex + 1}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">{award.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">
                      {award.title}
                    </h3>
                    <p className="text-muted-foreground mb-1">
                      {award.organization}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {award.year}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
