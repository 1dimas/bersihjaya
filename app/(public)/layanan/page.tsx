import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { services as defaultServices } from "@/lib/site-config";
import { getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Layanan",
  description: "Detail layanan General Cleaning, Deep Cleaning, cuci sofa & karpet, dan pest control — lengkap dengan rincian yang termasuk dan tidak termasuk.",
};

const galleryItems = [
  { label: "Ruang tamu", image: "/images/gallery-ruang-tamu.png" },
  { label: "Dapur", image: "/images/gallery-dapur.png" },
  { label: "Kamar mandi", image: "/images/gallery-kamar-mandi.png" },
  { label: "Sofa & karpet", image: "/images/gallery-sofa-karpet.png" },
];

export default async function LayananPage() {
  const services = await getServices().catch(() => defaultServices);

  return (
    <>
      <section className="bg-mist border-b border-line py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Layanan kami"
            title="Rincian lengkap setiap layanan"
            description="Supaya tidak ada salah paham, kami jelaskan apa saja yang termasuk dan tidak termasuk dalam setiap paket."
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} variant="full" />
            ))}
          </div>
        </Container>
      </section>

      {/* Galeri before/after */}
      <section className="py-16 sm:py-20 bg-mist border-y border-line">
        <Container>
          <SectionHeading eyebrow="Bukti hasil kerja" title="Sebelum & sesudah" align="center" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map(({ label, image }) => (
              <div key={label} className="group rounded-2xl border border-line bg-paper overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                     src={image}
                     alt={`Sebelum dan sesudah pembersihan ${label}`}
                     fill
                     className="object-cover transition-transform duration-500 group-hover:scale-105"
                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <p className="text-center py-3 font-display font-medium text-ink">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}


