import { testimonials as defaultTestimonials } from "@/lib/site-config";
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
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Kata pelanggan"
          title="Dipercaya keluarga & kantor di Jabodetabek"
          align="center"
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-line bg-mist p-6 flex flex-col"
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
        </div>
      </Container>
    </section>
  );
}

