"use client";

import { ServiceItem } from "@/lib/site-config";
import { motion } from "framer-motion";

export default function PricingTable({ services }: { services: ServiceItem[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-line bg-white/80 backdrop-blur-md shadow-glow overflow-hidden max-w-2xl mx-auto"
    >
      <div className="bg-gradient-to-r from-pine-600 to-pine-500 text-paper px-6 sm:px-8 py-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <p className="font-mono text-xs uppercase tracking-widest text-paper/80">
          Estimasi Biaya
        </p>
        <p className="font-display text-xl font-semibold mt-1">Daftar Harga Layanan</p>
      </div>

      <dl className="px-6 sm:px-8 py-6 divide-y divide-dashed divide-line">
        {services.map((service, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            key={service.slug} 
            className="flex items-baseline justify-between gap-4 py-4 hover:bg-pine-50/80 transition-colors -mx-4 px-4 rounded-xl"
          >
            <dt className="text-ink">
              {service.name}
              <span className="block text-sm text-ink/55">{service.unit}</span>
            </dt>
            <dd className="font-mono font-semibold text-pine-600 whitespace-nowrap">
              {service.priceFrom}
            </dd>
          </motion.div>
        ))}
      </dl>

      <div className="px-6 sm:px-8 pb-6 pt-2 bg-gradient-to-b from-transparent to-mist/30">
        <p className="text-sm text-ink/55 leading-relaxed">
          * Harga di atas adalah estimasi awal (“mulai dari”) untuk luas standar.
          Harga akhir akan dikonfirmasi tim kami sesuai kondisi & luas area
          sebenarnya, sebelum pekerjaan dimulai — tanpa biaya tersembunyi.
        </p>
      </div>
    </motion.div>
  );
}
