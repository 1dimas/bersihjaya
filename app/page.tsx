import Link from "next/link";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import ServiceCard from "@/components/ServiceCard";
import StepFlow from "@/components/StepFlow";
import PricingTable from "@/components/PricingTable";
import Testimonials from "@/components/Testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import {
  services as defaultServices,
  faqs as defaultFaqs,
  business as defaultBusiness,
  heroConfig as defaultHeroConfig,
  valueProps as defaultValueProps,
  bookingSteps as defaultBookingSteps,
  testimonials as defaultTestimonials
} from "@/lib/site-config";
import {
  getBusiness,
  getHeroConfig,
  getValueProps,
  getServices,
  getBookingSteps,
  getTestimonials,
  getFaqs
} from "@/lib/data";

export default async function HomePage() {
  const business = await getBusiness().catch(() => defaultBusiness);
  const heroConfig = await getHeroConfig().catch(() => defaultHeroConfig);
  const valueProps = await getValueProps().catch(() => defaultValueProps);
  const services = await getServices().catch(() => defaultServices);
  const bookingSteps = await getBookingSteps().catch(() => defaultBookingSteps);
  const testimonials = await getTestimonials().catch(() => defaultTestimonials);
  const faqs = await getFaqs().catch(() => defaultFaqs);

  return (
    <>
      <Hero business={business} heroConfig={heroConfig} />
      <ValueProps valueProps={valueProps} />

      <section className="py-16 sm:py-20 bg-mist border-y border-line">
        <Container>
          <SectionHeading
            eyebrow="Layanan kami"
            title="Pilih sesuai kebutuhan rumah atau kantor Anda"
            align="center"
          />
          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} variant="compact" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/layanan"
              className="font-display font-semibold text-pine-600 hover:text-pine-700"
            >
              Lihat detail semua layanan →
            </Link>
          </div>
        </Container>
      </section>

      <StepFlow bookingSteps={bookingSteps} />

      <section className="py-16 sm:py-20">
        <Container className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow="Transparan dari awal"
              title="Harga jelas, tanpa kejutan di akhir"
              description="Kami percaya pelanggan berhak tahu kisaran biaya sejak awal. Estimasi di bawah ini bisa jadi acuan sebelum Anda menghubungi kami."
            />
            <div className="mt-6">
              <WhatsAppCTA label="Tanya Estimasi Lengkap" whatsappNumber={business.whatsappNumber} businessName={business.name} />
            </div>
          </div>
          <PricingTable services={services.slice(0, 3)} />
        </Container>
      </section>

      <Testimonials testimonials={testimonials} />

      <section className="py-16 sm:py-20 bg-mist border-y border-line">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Pertanyaan umum" title="Yang sering ditanyakan" align="center" />
          <div className="mt-10">
            <FaqAccordion items={faqs.slice(0, 4)} />
          </div>
          <div className="mt-8 text-center">
            <Link href="/faq" className="font-display font-semibold text-pine-600 hover:text-pine-700">
              Lihat semua pertanyaan →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="text-center max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            Rumah atau kantor Anda siap dibersihkan?
          </h2>
          <p className="mt-4 text-lg text-ink/70">
            Chat sekarang, ceritakan kebutuhan Anda, dan tim kami bantu jadwalkan secepatnya.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppCTA label="Pesan via WhatsApp" whatsappNumber={business.whatsappNumber} businessName={business.name} />
          </div>
        </Container>
      </section>
    </>
  );
}

