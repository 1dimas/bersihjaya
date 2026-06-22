import Link from "next/link";
import Image from "next/image";
import { business as defaultBusiness, heroConfig as defaultHeroConfig } from "@/lib/site-config";
import WhatsAppCTA from "./WhatsAppCTA";
import Container from "./Container";

function CheckBadge({ delayMs }: { delayMs: number }) {
  return (
    <span
      className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pine-600 opacity-0 animate-tickIn"
      style={{ animationDelay: `${delayMs}ms`, animationFillMode: "forwards" }}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
        <path
          d="M5 12.5 9.5 17 19 7"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 24,
            strokeDashoffset: 24,
            animation: "checkDraw 0.35s ease-out forwards",
            animationDelay: `${delayMs + 150}ms`,
          }}
        />
      </svg>
    </span>
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
    <section className="bg-mist border-b border-line">
      <Container className="grid lg:grid-cols-2 gap-12 items-center py-14 sm:py-20 pb-24 sm:pb-28">
        <div>
          <p className="font-mono text-sm tracking-widest uppercase text-pine-600 mb-4">
            Status: {heroConfig.status}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-tight">
            {business.tagline}
          </h1>
          <p className="mt-5 text-lg text-ink/75 leading-relaxed max-w-md">
            {heroConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <WhatsAppCTA label="Pesan Sekarang" whatsappNumber={business.whatsappNumber} />
            <Link
              href="/harga"
              className="inline-flex items-center justify-center rounded-xl border-2 border-pine-600 px-6 py-4 min-h-[3.25rem] font-display font-semibold text-pine-600 hover:bg-pine-50 transition-colors"
            >
              Lihat Daftar Harga
            </Link>
          </div>
          <p className="mt-6 text-sm text-ink/60">
            Melayani area {business.serviceArea}.
          </p>
        </div>

        {/* Visual column: hero image + floating ticket card */}
        <div className="relative">
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
          <div className="absolute -bottom-8 -left-4 sm:-left-8 w-[85%] max-w-sm">
            <div className="rounded-2xl bg-paper/95 backdrop-blur-sm border border-line shadow-xl p-5 sm:p-6">
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
          </div>
        </div>
      </Container>
    </section>
  );
}


