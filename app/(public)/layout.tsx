import { business as defaultBusiness } from "@/lib/site-config";
import { getBusiness } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const business = await getBusiness().catch(() => defaultBusiness);

  return (
    <>
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-pine-600 focus:text-paper focus:px-4 focus:py-2"
      >
        Lompat ke konten utama
      </a>
      <Header businessName={business.name} />
      <main id="konten-utama">{children}</main>
      <Footer business={business} />
      <WhatsAppFloatingButton whatsappNumber={business.whatsappNumber} businessName={business.name} />
    </>
  );
}
