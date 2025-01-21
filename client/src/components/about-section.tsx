import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Leaf, Recycle, Sprout } from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Eco-Friendly Process",
      description: "Our vermi composting technology naturally transforms waste without harmful chemicals."
    },
    {
      icon: <Recycle className="h-8 w-8 text-primary" />,
      title: "Circular Economy",
      description: "Creating a closed-loop system that converts waste into valuable resources."
    },
    {
      icon: <Sprout className="h-8 w-8 text-primary" />,
      title: "Sustainable Future",
      description: "Reducing carbon footprint while producing high-quality protein sources."
    }
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Revolutionary Waste Management
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Through advanced vermi composting technology, we're pioneering sustainable solutions
            for organic waste management and protein production.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
