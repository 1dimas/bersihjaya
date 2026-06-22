import Link from "next/link";
import Container from "@/components/Container";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="text-center max-w-lg">
        <p className="font-mono text-sm tracking-widest uppercase text-pine-600 mb-3">
          Error 404
        </p>
        <h1 className="font-display text-3xl font-bold text-ink">Halaman tidak ditemukan</h1>
        <p className="mt-4 text-ink/70 leading-relaxed">
          Halaman yang Anda cari mungkin sudah dipindahkan atau tidak tersedia.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border-2 border-pine-600 px-6 py-4 min-h-[3.25rem] font-display font-semibold text-pine-600 hover:bg-pine-50"
          >
            Kembali ke Beranda
          </Link>
          <WhatsAppCTA label="Hubungi Kami" />
        </div>
      </Container>
    </section>
  );
}
