import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Star, Trophy } from "lucide-react";

export function AwardsSection() {
  const awards = [
    {
      icon: <Trophy className="h-12 w-12 text-primary" />,
      title: "Sustainability Excellence",
      organization: "Global Green Tech Awards",
      year: "2023"
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title: "Innovation in Waste Management",
      organization: "EcoTech Summit",
      year: "2023"
    },
    {
      icon: <Star className="h-12 w-12 text-primary" />,
      title: "Environmental Impact",
      organization: "Sustainable Business Awards",
      year: "2022"
    }
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Recognition & Awards</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our commitment to sustainability and innovation has been recognized by leading
            industry organizations.
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
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{award.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                  <p className="text-muted-foreground mb-1">{award.organization}</p>
                  <p className="text-sm text-muted-foreground">{award.year}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
