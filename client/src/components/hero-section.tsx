import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="min-h-screen pt-16 flex items-center bg-gradient-to-b from-green-50 to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Transforming Food Waste Into
              <span className="text-primary"> Sustainable Protein</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Our innovative vermi composting technology converts organic waste into high-quality protein,
              creating a circular economy solution for a sustainable future.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <a href="#contact">Get Started</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#about">Learn More</a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-square"
          >
            <img
              src="https://images.unsplash.com/photo-1589898424451-21e24dcb143c"
              alt="Sustainable Technology"
              className="rounded-lg object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
