"use client";

import { ShieldCheck, Leaf, Users, Receipt, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { valueProps as defaultValueProps } from "@/lib/site-config";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  Users,
  Leaf,
  ShieldCheck,
  Receipt,
};

interface ValuePropItem {
  iconName: string;
  title: string;
  description: string;
}

interface ValuePropsProps {
  valueProps?: readonly ValuePropItem[];
}

export default function ValueProps({ valueProps = defaultValueProps }: ValuePropsProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="Kenapa pilih kami"
            title="Bersih yang bisa Anda percaya"
            align="center"
          />
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {valueProps.map(({ iconName, title, description }) => {
            const Icon = iconMap[iconName] || ShieldCheck;
            return (
              <motion.div
                key={title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(20, 92, 80, 0.2)" }}
                className="rounded-2xl border border-line bg-white/60 backdrop-blur-sm p-6 hover:border-pine-400 transition-all duration-300 group cursor-default"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pine-50 text-pine-600 mb-4 group-hover:bg-pine-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-display font-semibold text-lg text-ink group-hover:text-pine-700 transition-colors">{title}</h3>
                <p className="mt-2 text-ink/70 leading-relaxed">{description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

