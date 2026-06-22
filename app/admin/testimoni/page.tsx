import { getTestimonials } from "@/lib/data";
import { testimonials as defaultTestimonials } from "@/lib/site-config";
import TestimonialsManager from "./TestimonialsManager";

export const metadata = {
  title: "Kelola Testimoni — Admin",
};

export default async function AdminTestimoniPage() {
  const testimonials = await getTestimonials().catch(() => []);

  // Convert database structure or default values
  const initialData = testimonials.length > 0 
    ? testimonials 
    : defaultTestimonials.map((item, idx) => ({
        id: `default-${idx}`,
        name: item.name,
        role: item.role,
        quote: item.quote,
        sortOrder: idx + 1,
      }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Testimoni Pelanggan</h1>
        <p className="text-sm text-ink/65 mt-1">
          Kelola feedback dari pelanggan rumah tangga maupun perkantoran yang ditampilkan di beranda. Anda bisa menambah ulasan baru, mengedit nama/peran, serta mengurutkan posisi tampilnya.
        </p>
      </div>

      <TestimonialsManager initialData={initialData} />
    </div>
  );
}
