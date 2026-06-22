import type { Metadata } from "next";
import { Sora, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import { business as defaultBusiness } from "@/lib/site-config";
import { getBusiness } from "@/lib/data";
import "./globals.css";

// next/font men-download & self-host font saat build, jadi tidak ada
// request ke Google Fonts saat runtime — lebih cepat & tidak ada layout shift.
const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://www.bersihjaya.id"; // GANTI dengan domain asli setelah live

export async function generateMetadata(): Promise<Metadata> {
  const business = await getBusiness().catch(() => defaultBusiness);
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${business.name} — ${business.tagline}`,
      template: `%s — ${business.name}`,
    },
    description: `${business.name} menyediakan jasa General Cleaning, Deep Cleaning, cuci sofa & karpet, hingga pest control di ${business.serviceArea}. Harga transparan, pesan langsung via WhatsApp.`,
    keywords: [
      "cleaning service Depok",
      "jasa kebersihan Depok",
      "jasa bersih rumah Jabodetabek",
      "deep cleaning rumah",
      "cuci sofa dan karpet",
      "jasa pest control rumah",
    ],
    openGraph: {
      title: `${business.name} — ${business.tagline}`,
      description: `Jasa kebersihan profesional untuk rumah & kantor kecil di ${business.serviceArea}.`,
      url: siteUrl,
      siteName: business.name,
      locale: "id_ID",
      type: "website",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const business = await getBusiness().catch(() => defaultBusiness);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.tagline,
    address: business.address,
    areaServed: business.serviceArea,
    email: business.email,
    openingHours: business.operatingHours,
  };

  return (
    <html lang="id" className={`${sora.variable} ${publicSans.variable} ${plexMono.variable}`}>
      <body className="font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

