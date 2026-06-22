import { getBookingSteps } from "@/lib/data";
import { bookingSteps as defaultBookingSteps } from "@/lib/site-config";
import BookingStepsManager from "./BookingStepsManager";

export const metadata = {
  title: "Kelola Cara Pesan — Admin",
};

export default async function AdminCaraPesanPage() {
  const steps = await getBookingSteps().catch(() => []);

  // Convert database structure or default values
  const initialData = steps.length > 0 
    ? steps 
    : defaultBookingSteps.map((item, idx) => ({
        id: `default-${idx}`,
        title: item.title,
        description: item.description,
        sortOrder: idx + 1,
      }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Langkah Cara Pesan</h1>
        <p className="text-sm text-ink/65 mt-1">
          Kelola alur tahapan pemesanan jasa yang ditampilkan di halaman depan website. Anda bisa menambah langkah baru, mengedit rincian, dan mengatur posisi urutannya.
        </p>
      </div>

      <BookingStepsManager initialData={initialData} />
    </div>
  );
}
