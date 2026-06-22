import Image from "next/image";
import { Check, X } from "lucide-react";
import { ServiceItem } from "@/lib/site-config";

export default function ServiceCard({
  service,
  variant = "compact",
}: {
  service: ServiceItem;
  variant?: "compact" | "full";
}) {
  const visibleIncluded =
    variant === "compact" ? service.included.slice(0, 3) : service.included;

  return (
    <article className="group rounded-2xl border border-line bg-paper overflow-hidden transition-shadow hover:shadow-lg">
      {/* Service image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute bottom-3 left-4 font-mono text-xs whitespace-nowrap rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-pine-600 font-semibold">
          mulai {service.priceFrom}
        </span>
      </div>

      <div className="p-6 sm:p-7">
        <h3 className="font-display text-xl font-semibold text-ink">{service.name}</h3>
        <p className="mt-2 text-ink/70 leading-relaxed">{service.shortDesc}</p>

        <p className="mt-5 font-mono text-xs uppercase tracking-widest text-ink/50">
          Termasuk
        </p>
        <ul className="mt-3 space-y-2">
          {visibleIncluded.map((item) => (
            <li key={item} className="flex items-start gap-2 text-ink/85">
              <Check className="h-5 w-5 shrink-0 text-pine-600 mt-0.5" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {variant === "full" && (
          <>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-ink/50">
              Tidak termasuk
            </p>
            <ul className="mt-3 space-y-2">
              {service.excluded.map((item) => (
                <li key={item} className="flex items-start gap-2 text-ink/60">
                  <X className="h-5 w-5 shrink-0 text-ink/40 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  );
}
