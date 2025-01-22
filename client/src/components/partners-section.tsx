import { motion } from "framer-motion";

export function PartnersSection() {
  const partners = [
    {
      name: "Vidacity",
      logo: "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/partner%20logos/vidacity-logo.png",
    },
    {
      name: "City Sprouts",
      logo: "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/partner%20logos/Brandmark_170x%402x.svg",
    },
    {
      name: "NTU Entrepreneurship Academy",
      logo: "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/partner%20logos/Nanyang_Technological_University-Logo.wine.png",
    },
    {
      name: "Revital",
      logo: "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/partner%20logos/2025-01-21%2020.51.53.jpg",
    },
    {
      name: "Nutrition Technologies",
      logo: "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/partner%20logos/03.avif",
    },
    {
      name: "IDSG",
      logo: "https://pub-5658b1b4fb264ccab4a41995fb83981b.r2.dev/partner%20logos/9ed2aa_61786ca7cabf4d989c3bda15948187fa~mv2_d_2953_2953_s_4_2%20(1).avif",
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
            Working together with industry leaders to create sustainable
            solutions for a better tomorrow.
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="animate-scroll inline-flex gap-8">
            {[...partners, ...partners, ...partners, ...partners].map(
              (partner, index) => (
                <div key={index} className="flex-none w-[200px]">
                  <div className="aspect-[3/2] relative">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="absolute inset-0 w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      draggable="false"
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
