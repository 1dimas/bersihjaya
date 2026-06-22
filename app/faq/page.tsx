import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { faqs as defaultFaqs, business as defaultBusiness } from "@/lib/site-config";
import { getFaqs, getBusiness } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Jawaban untuk pertanyaan yang sering ditanyakan seputar durasi pengerjaan, peralatan, area layanan, dan kebijakan pembatalan.",
};

export default async function FaqPage() {
  const faqs = await getFaqs().catch(() => defaultFaqs);
  const business = await getBusiness().catch(() => defaultBusiness);

  return (
    <>
      <section className="bg-mist border-b border-line py-14 sm:py-16">
        <Container className="max-w-3xl text-center">
          <SectionHeading
            eyebrow="Bantuan"
            title="Pertanyaan yang sering ditanyakan"
            align="center"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <FaqAccordion items={faqs} />

          <div className="mt-10 text-center">
            <p className="text-ink/70 mb-5">Masih ada yang ingin ditanyakan?</p>
            <WhatsAppCTA label="Tanya Langsung via WhatsApp" whatsappNumber={business.whatsappNumber} businessName={business.name} />
          </div>
        </Container>
      </section>
    </>
  );
}

