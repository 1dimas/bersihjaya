import Link from "next/link";
import { business as defaultBusiness } from "@/lib/site-config";

interface BusinessInfo {
  name: string;
  tagline: string;
  address: string;
  email: string;
  operatingHours: string;
  serviceArea: string;
}

interface FooterProps {
  business?: BusinessInfo;
}

export default function Footer({ business = defaultBusiness }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-pine-700 text-paper">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8 py-12 grid gap-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold mb-3">{business.name}</p>
          <p className="text-paper/80 leading-relaxed">{business.tagline}</p>
        </div>

        <div>
          <p className="font-mono text-sm uppercase tracking-widest text-citrus-400 mb-3">
            Kontak
          </p>
          <ul className="space-y-2 text-paper/90">
            <li>{business.address}</li>
            <li>{business.email}</li>
            <li>{business.operatingHours}</li>
            <li>Area layanan: {business.serviceArea}</li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-sm uppercase tracking-widest text-citrus-400 mb-3">
            Tautan
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/layanan" className="hover:text-citrus-400">
                Layanan
              </Link>
            </li>
            <li>
              <Link href="/harga" className="hover:text-citrus-400">
                Harga
              </Link>
            </li>
            <li>
              <Link href="/syarat-ketentuan" className="hover:text-citrus-400">
                Syarat & Ketentuan
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="mx-auto w-full max-w-content px-5 sm:px-8 py-5 text-sm text-paper/70">
          © {year} {business.name}. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}

