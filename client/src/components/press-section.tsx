import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink, Newspaper, Calendar } from "lucide-react";

export function PressSection() {
  const pressItems = [
    {
      title: "Using Black Soldier Flies to Turn Food Waste into Treasure",
      originalTitle: "用黑水虻把剩饭剩菜变废为宝",
      publication: "Zaobao (联合早报)",
      date: "April 21, 2025",
      author: "Ho Jiahui (何家炜)",
      excerpt: "24-year-old Lim Encheng witnessed the shocking reality of food waste in his parents' restaurant from a young age. Now, he and his team are using a group of special 'little workers' - black soldier flies - to transform food waste into treasure. From growing up in his parents' restaurant business, Lin has the most direct experience with food waste, and this close observation planted the seed for his future entrepreneurship.",
      url: "https://www.zaobao.com.sg/news/singapore/story20250421-6218376",
      image: "https://www.zaobao.com.sg/sites/default/files/styles/article_large/public/images/202504/20250421/file7mv9h0a4qbb1qzy6o8o1.jpg",
      tags: ["Sustainability", "Innovation", "Food Waste", "Black Soldier Fly", "Singapore Media"]
    }
  ];

  return (
    <section id="press" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Press & Media Coverage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our innovative approach to sustainable waste management has captured 
            the attention of leading media outlets across Singapore and the region.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {pressItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Image Section */}
                    <div className="md:col-span-1">
                      <div className="aspect-video md:aspect-square relative rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-cover w-full h-full"
                          onError={(e: any) => {
                            // Fallback to a placeholder if image fails to load
                            e.currentTarget.src = "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=600&h=400&fit=crop&crop=center";
                          }}
                        />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:col-span-2 p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Newspaper className="h-4 w-4" />
                        <span className="font-medium">{item.publication}</span>
                        <span>•</span>
                        <Calendar className="h-4 w-4" />
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>By {item.author}</span>
                      </div>

                      <h3 className="text-2xl font-bold mb-2 text-foreground">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4 italic">
                        Original: {item.originalTitle}
                      </p>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {item.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More Link */}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                      >
                        Read Full Article (Chinese)
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Media Mentions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Also featured in:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>Kumar Sustainable Innovation Award Coverage</span>
            <span>•</span>
            <span>ASEAN Circular Economy Forum</span>
            <span>•</span>
            <span>NTU Entrepreneurship Academy Speaker Series</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 