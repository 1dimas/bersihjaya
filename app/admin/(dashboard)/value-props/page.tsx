import { getValueProps } from "@/lib/data";
import { valueProps as defaultValueProps } from "@/lib/site-config";
import ValuePropsManager from "./ValuePropsManager";

export const metadata = {
  title: "Kelola Keunggulan — Admin",
};

export default async function AdminValuePropsPage() {
  const valueProps = await getValueProps().catch(() => []);

  // Convert database structure or default values
  const initialData = valueProps.length > 0 
    ? valueProps 
    : defaultValueProps.map((item, idx) => ({
        id: `default-${idx}`,
        iconName: item.iconName,
        title: item.title,
        description: item.description,
        sortOrder: idx + 1,
      }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Keunggulan Bisnis</h1>
        <p className="text-sm text-ink/65 mt-1">
          Kelola keunggulan bisnis yang ditampilkan di bagian "Kenapa pilih kami". Anda bisa mengubah judul, ikon, deskripsi, dan urutan posisinya.
        </p>
      </div>

      <ValuePropsManager initialData={initialData} />
    </div>
  );
}
