import { getServices } from "@/lib/data";
import { services as defaultServices } from "@/lib/site-config";
import ServicesManager from "./ServicesManager";

export const metadata = {
  title: "Kelola Layanan — Admin",
};

export default async function AdminLayananPage() {
  const services = await getServices().catch(() => []);

  // Convert database structure or default values
  const initialData = services.length > 0 
    ? services.map((s) => ({
        ...s,
        included: [...s.included],
        excluded: [...s.excluded],
      }))
    : defaultServices.map((s, idx) => ({
        id: `default-${idx}`,
        slug: s.slug,
        name: s.name,
        shortDesc: s.shortDesc,
        priceFrom: s.priceFrom,
        unit: s.unit,
        image: s.image,
        included: [...s.included],
        excluded: [...s.excluded],
        sortOrder: idx + 1,
      }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Paket Layanan</h1>
        <p className="text-sm text-ink/65 mt-1">
          Kelola katalog jasa kebersihan, rentang harga, rincian pekerjaan yang tercakup (included / excluded), dan upload gambar representatif menggunakan Cloud Storage.
        </p>
      </div>

      <ServicesManager initialData={initialData} />
    </div>
  );
}
