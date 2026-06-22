"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { business as defaultBusiness, heroConfig as defaultHeroConfig } from "@/lib/site-config";
import WhatsAppCTA from "./WhatsAppCTA";
import Container from "./Container";

function CheckBadge({ delayMs }: { delayMs: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -6 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: "easeOut", delay: delayMs / 1000 }}
      className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pine-600"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
        <motion.path
          d="M5 12.5 9.5 17 19 7"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "easeOut", delay: (delayMs + 150) / 1000 }}
        />
      </svg>
    </motion.span>
  );
}

interface HeroProps {
  business?: {
    name: string;
    tagline: string;
    whatsappNumber: string;
    serviceArea: string;
  };
  heroConfig?: {
    status: string;
    description: string;
    ticketTitle: string;
    ticketStatus: string;
    ticketItems: readonly string[];
    ticketDuration: string;
  };
}

export default function Hero({ business = defaultBusiness, heroConfig = defaultHeroConfig }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-mist border-b border-line">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-pine-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob pointer-events-none" />
      <div 
        className="absolute top-0 -right-4 w-72 h-72 bg-citrus-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob pointer-events-none" 
        style={{ animationDelay: '2s' }} 
      />
      <div 
        className="absolute -bottom-8 left-20 w-72 h-72 bg-pine-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob pointer-events-none" 
        style={{ animationDelay: '4s' }} 
      />

      <Container className="relative grid lg:grid-cols-2 gap-12 items-center py-14 sm:py-20 pb-24 sm:pb-28 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", staggerChildren: 0.15 }}
        >
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-sm tracking-widest uppercase text-pine-600 mb-4"
          >
            Status: {heroConfig.status}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-tight text-gradient"
          >
            {business.tagline}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-lg text-ink/75 leading-relaxed max-w-md"
          >
            {heroConfig.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <WhatsAppCTA label="Pesan Sekarang" whatsappNumber={business.whatsappNumber} />
            <Link
              href="/harga"
              className="inline-flex items-center justify-center rounded-xl border-2 border-pine-600 bg-white/50 backdrop-blur-sm px-6 py-4 min-h-[3.25rem] font-display font-semibold text-pine-600 hover:bg-pine-50 hover:shadow-glow transition-all"
            >
              Lihat Daftar Harga
            </Link>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-sm text-ink/60"
          >
            Melayani area {business.serviceArea}.
          </motion.p>
        </motion.div>

        {/* Visual column: hero image + floating ticket card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          {/* Hero background image */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/hero-cleaning.png"
              alt={`Tim ${business.name} sedang membersihkan rumah`}
              width={640}
              height={480}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Kartu "surat tugas" — floating overlay on the image */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="absolute -bottom-8 -left-4 sm:-left-8 w-[85%] max-w-sm"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 shadow-glow p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-dashed border-line pb-3 mb-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
                    Surat Tugas
                  </p>
                  <p className="font-display font-semibold text-ink">{heroConfig.ticketTitle}</p>
                </div>
                <span className="font-mono text-xs rounded-full bg-citrus-500/20 text-citrus-600 px-3 py-1">
                  {heroConfig.ticketStatus}
                </span>
              </div>

              <ul className="space-y-3">
                {heroConfig.ticketItems.map((item, i) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckBadge delayMs={i * 220} />
                    <span className="text-sm text-ink/85">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-3 border-t border-dashed border-line flex items-center justify-between">
                <span className="text-xs text-ink/60">Estimasi durasi</span>
                <span className="font-mono text-sm font-semibold text-ink">{heroConfig.ticketDuration}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}


