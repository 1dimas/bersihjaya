"use client";

import { bookingSteps as defaultBookingSteps } from "@/lib/site-config";
import { motion } from "framer-motion";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

interface BookingStepItem {
  title: string;
  description: string;
}

interface StepFlowProps {
  bookingSteps?: readonly BookingStepItem[];
}

export default function StepFlow({ bookingSteps = defaultBookingSteps }: StepFlowProps) {
  return (
    <section className="py-16 sm:py-20 bg-mist border-y border-line overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <SectionHeading eyebrow="Cara pesan" title="Empat langkah, selesai" align="center" />
        </motion.div>

        <motion.ol 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {bookingSteps.map((step, i) => (
            <motion.li
              key={step.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative rounded-2xl bg-white/70 backdrop-blur-sm border border-line p-6 pt-8 hover:border-pine-300 hover:shadow-glow transition-all duration-300"
            >
              <span className="font-mono text-4xl font-bold text-pine-100/60 absolute top-4 right-5 select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display font-semibold text-lg text-ink relative z-10">
                {step.title}
              </h3>
              <p className="mt-2 text-ink/70 leading-relaxed relative z-10">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}

