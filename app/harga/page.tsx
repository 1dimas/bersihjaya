import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PricingTable from "@/components/PricingTable";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { services as defaultServices, business as defaultBusiness } from "@/lib/site-config";
import { getServices, getBusiness } from "@/lib/data";

export const metadata: Metadata = {
  title: "Harga",
  description: "Daftar harga transparan untuk General Cleaning, Deep Cleaning, cuci sofa & karpet, dan pest control.",
};

export default async function HargaPage() {
  const services = await getServices().catch(() => defaultServices);
  const business = await getBusiness().catch(() => defaultBusiness);

  return (
    <>
      <section className="bg-mist border-b border-line py-14 sm:py-16">
        <Container className="text-center max-w-2xl">
          <SectionHeading
            eyebrow="Daftar harga"
            title="Transparan sejak awal"
            description="Tidak ada biaya tersembunyi. Estimasi akhir disesuaikan dengan luas & kondisi area saat survei singkat via WhatsApp."
            align="center"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <PricingTable services={services} />

          <div className="mt-10 text-center">
            <p className="text-ink/70 mb-5">
              Punya kebutuhan khusus atau luas area yang besar? Chat dulu, kami bantu hitungkan.
            </p>
            <WhatsAppCTA label="Tanya Harga via WhatsApp" whatsappNumber={business.whatsappNumber} businessName={business.name} />
          </div>
        </Container>
      </section>
    </>
  );
}

