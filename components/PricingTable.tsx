import { ServiceItem } from "@/lib/site-config";

export default function PricingTable({ services }: { services: ServiceItem[] }) {
  return (
    <div className="rounded-2xl border border-line bg-paper shadow-sm overflow-hidden max-w-2xl mx-auto">
      <div className="bg-pine-600 text-paper px-6 sm:px-8 py-5">
        <p className="font-mono text-xs uppercase tracking-widest text-paper/70">
          Estimasi Biaya
        </p>
        <p className="font-display text-lg font-semibold">Daftar Harga Layanan</p>
      </div>

      <dl className="px-6 sm:px-8 py-6 divide-y divide-dashed divide-line">
        {services.map((service) => (
          <div key={service.slug} className="flex items-baseline justify-between gap-4 py-4">
            <dt className="text-ink">
              {service.name}
              <span className="block text-sm text-ink/55">{service.unit}</span>
            </dt>
            <dd className="font-mono font-semibold text-ink whitespace-nowrap">
              {service.priceFrom}
            </dd>
          </div>
        ))}
      </dl>

      <p className="px-6 sm:px-8 pb-6 text-sm text-ink/55 leading-relaxed">
        * Harga di atas adalah estimasi awal (“mulai dari”) untuk luas standar.
        Harga akhir akan dikonfirmasi tim kami sesuai kondisi & luas area
        sebenarnya, sebelum pekerjaan dimulai — tanpa biaya tersembunyi.
      </p>
    </div>
  );
}
