import { motion } from "framer-motion";

export function PartnersSection() {
  const partners = [
    {
      name: "Vidacity",
      logo: "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/partner1.png",
    },
    {
      name: "City Sprouts",
      logo: "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/partner2.png",
    },
    {
      name: "NTU Entrepreneurship Academy",
      logo: "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/partner3.png",
    },
    {
      name: "Revital",
      logo: "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/partner4.png",
    },
    {
      name: "Nutrition Technologies",
      logo: "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/partner4.png",
    },    {
      name: "IDSG",
      logo: "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/partner4.png",
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

        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[200px] mx-8"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
