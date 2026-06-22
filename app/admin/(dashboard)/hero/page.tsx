import { getHeroConfig } from "@/lib/data";
import { heroConfig as defaultHeroConfig } from "@/lib/site-config";
import HeroForm from "./HeroForm";

export const metadata = {
  title: "Kelola Hero Section — Admin",
};

export default async function AdminHeroPage() {
  const heroConfig = await getHeroConfig().catch(() => defaultHeroConfig);

  // Convert readonly array to mutable array for the form component
  const mutableHeroConfig = {
    ...heroConfig,
    ticketItems: [...heroConfig.ticketItems],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Hero Section</h1>
        <p className="text-sm text-ink/65 mt-1">
          Ubah status, deskripsi, dan info checklist "Surat Tugas" yang melayang di sebelah gambar hero beranda.
        </p>
      </div>

      <HeroForm initialData={mutableHeroConfig} />
    </div>
  );
}
