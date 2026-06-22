import Link from "next/link";
import { getBusiness } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { business as defaultBusiness } from "@/lib/site-config";
import {
  Building2,
  Sparkles,
  Award,
  Briefcase,
  Milestone,
  MessageSquare,
  HelpCircle,
  ArrowRight,
  Database,
  Globe,
} from "lucide-react";

export default async function AdminDashboard() {
  // Fetch business info & counts
  const business = await getBusiness().catch(() => defaultBusiness);

  const [servicesCount, faqsCount, valuePropsCount, testimonialsCount, stepsCount] = await Promise.all([
    prisma.service.count().catch(() => 0),
    prisma.faq.count().catch(() => 0),
    prisma.valueProp.count().catch(() => 0),
    prisma.testimonial.count().catch(() => 0),
    prisma.bookingStep.count().catch(() => 0),
  ]);

  const cards = [
    {
      title: "Informasi Bisnis",
      desc: "Ubah nama, nomor WhatsApp, email, alamat, & area layanan.",
      count: null,
      href: "/admin/bisnis",
      icon: Building2,
      color: "bg-blue-50 text-blue-700 border-blue-100",
    },
    {
      title: "Hero Section",
      desc: "Ubah status kesiapan, deskripsi hero, surat tugas, & durasi kerja.",
      count: null,
      href: "/admin/hero",
      icon: Sparkles,
      color: "bg-purple-50 text-purple-700 border-purple-100",
    },
    {
      title: "Keunggulan",
      desc: "Kelola 4 keunggulan utama layanan beserta ikon & deskripsi.",
      count: valuePropsCount,
      href: "/admin/value-props",
      icon: Award,
      color: "bg-indigo-50 text-indigo-700 border-indigo-100",
    },
    {
      title: "Paket Layanan",
      desc: "Kelola rincian layanan, harga, unit, gambar, included, & excluded.",
      count: servicesCount,
      href: "/admin/layanan",
      icon: Briefcase,
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      title: "Langkah Cara Pesan",
      desc: "Atur tahapan pemesanan jasa yang ditampilkan di halaman utama.",
      count: stepsCount,
      href: "/admin/cara-pesan",
      icon: Milestone,
      color: "bg-amber-50 text-amber-700 border-amber-100",
    },
    {
      title: "Testimoni Pelanggan",
      desc: "Kelola review, nama, foto/inisial, & layanan yang dipesan pelanggan.",
      count: testimonialsCount,
      href: "/admin/testimoni",
      icon: MessageSquare,
      color: "bg-rose-50 text-rose-700 border-rose-100",
    },
    {
      title: "Pertanyaan FAQ",
      desc: "Kelola daftar tanya-jawab umum di halaman bantuan.",
      count: faqsCount,
      href: "/admin/faq",
      icon: HelpCircle,
      color: "bg-teal-50 text-teal-700 border-teal-100",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-paper border border-line rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Halo, Administrator!
          </h1>
          <p className="mt-1.5 text-ink/75">
            Selamat datang kembali di panel CMS <strong className="text-pine-700 font-semibold">{business.name}</strong>.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm font-semibold text-ink hover:bg-mist transition-colors"
          >
            <Globe className="h-4 w-4" />
            <span>Lihat Website</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-paper border border-line rounded-2xl p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-mono text-ink/50 uppercase tracking-wider">Total Layanan</p>
            <p className="text-2xl font-bold text-ink mt-0.5">{servicesCount}</p>
          </div>
        </div>

        <div className="bg-paper border border-line rounded-2xl p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shrink-0">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-mono text-ink/50 uppercase tracking-wider">Total FAQ</p>
            <p className="text-2xl font-bold text-ink mt-0.5">{faqsCount}</p>
          </div>
        </div>

        <div className="bg-paper border border-line rounded-2xl p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shrink-0">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-mono text-ink/50 uppercase tracking-wider">Testimoni</p>
            <p className="text-2xl font-bold text-ink mt-0.5">{testimonialsCount}</p>
          </div>
        </div>

        <div className="bg-paper border border-line rounded-2xl p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-mono text-ink/50 uppercase tracking-wider">Status Database</p>
            <p className="text-sm font-bold text-emerald-650 mt-1 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Connected
            </p>
          </div>
        </div>
      </div>

      {/* Sections List */}
      <div>
        <h2 className="font-display text-lg font-bold text-ink mb-5">Manajemen Konten</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-2xl border border-line bg-paper p-6 hover:shadow-md hover:border-pine-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center border shrink-0 mb-4 ${card.color}`}>
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="font-display font-bold text-ink group-hover:text-pine-700 transition-colors flex items-center gap-2">
                    {card.title}
                    {card.count !== null && (
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-mist border border-line text-ink/60">
                        {card.count}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-ink/70 leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-line border-dashed flex items-center justify-between text-sm font-semibold text-pine-600">
                  <span>Kelola Konten</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
