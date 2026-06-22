"use client";

import { testimonials as defaultTestimonials } from "@/lib/site-config";
import { motion } from "framer-motion";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
}

interface TestimonialsProps {
  testimonials?: readonly TestimonialItem[];
}

export default function Testimonials({ testimonials = defaultTestimonials }: TestimonialsProps) {
  // Ambil maksimal 10 data, lalu duplikasi untuk membuat efek infinite loop
  const limitedTestimonials = testimonials.slice(0, 10);
  const duplicatedTestimonials = [...limitedTestimonials, ...limitedTestimonials];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mist/50 to-transparent pointer-events-none" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <SectionHeading
            eyebrow="Kata pelanggan"
            title="Dipercaya keluarga & kantor di Jabodetabek"
            align="center"
          />
        </motion.div>
      </Container>
      
      {/* Infinite Marquee Container */}
      <div className="mt-12 relative flex overflow-hidden">
        {/* Gradient mask untuk memberikan efek fade di sisi kiri & kanan (desktop) */}
        <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-paper to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-paper to-transparent z-10 pointer-events-none" />

        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex flex-nowrap gap-6 w-max px-4 sm:px-6"
        >
          {duplicatedTestimonials.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="rounded-2xl border border-line bg-white/70 backdrop-blur-sm p-6 flex flex-col hover:border-pine-300 hover:shadow-glow transition-all duration-300 shrink-0 w-[85vw] sm:w-[350px] lg:w-[400px] cursor-default"
            >
              <blockquote className="text-ink/85 leading-relaxed flex-1">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-dashed border-line">
                <p className="font-display font-semibold text-ink">{t.name}</p>
                <p className="text-sm text-ink/60">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

