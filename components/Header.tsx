import Link from "next/link";
import { business as defaultBusiness } from "@/lib/site-config";

const navLinks = [
  { href: "/#keunggulan", label: "Keunggulan" },
  { href: "/layanan", label: "Layanan" },
  { href: "/#cara-pesan", label: "Cara Pesan" },
  { href: "/harga", label: "Harga" },
];

interface HeaderProps {
  businessName?: string;
}

export default function Header({ businessName = defaultBusiness.name }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-line">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8 flex items-center justify-between h-20">
        <Link href="/" className="font-display text-xl font-bold text-pine-600 flex items-center gap-2">
          <span aria-hidden="true" className="text-citrus-500">✓</span>
          {businessName}
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-base text-ink/80 hover:text-pine-600 transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Tombol menu mobile — pakai <details>/<summary> bawaan browser,
            jadi tidak perlu JavaScript sama sekali untuk buka/tutup menu. */}
        <details className="md:hidden relative">
          <summary
            aria-label="Buka menu navigasi"
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-line"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <nav
            aria-label="Navigasi mobile"
            className="absolute right-0 top-14 w-64 rounded-xl border border-line bg-paper shadow-lg p-3 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-3 text-lg text-ink hover:bg-mist"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}


