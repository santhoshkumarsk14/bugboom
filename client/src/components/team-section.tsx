import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

export function TeamSection() {
  const team = [
    {
      name: "Vasanth Sreeram",
      role: "CEO",
      image: "https://media.licdn.com/dms/image/v2/D5603AQF-yukeWP667w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1684256373104?e=1743033600&v=beta&t=QdoLjYGHyr7Iyj7OlL0CMZvHj_rCC-P1XDvObnYsYeg",
      social: {
        linkedin: "#"
      }
    },
    {
      name: "Ivan Ong",
      role: "COO",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
      social: {
        linkedin: "#"
      }
    },
    {
      name: "Lim En Cheng",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31",
      social: {
        linkedin: "#"
      }
    },
    {
      name: "Taha Basrai",
      role: "Sustainability Director",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
      social: {
        linkedin: "#"
      }
    },
    
  ];

  return (
    <section id="team" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate experts working together to revolutionize sustainable technology
            and waste management.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-muted-foreground mb-4">{member.role}</p>
                    <div className="flex gap-4">
                      <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
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
