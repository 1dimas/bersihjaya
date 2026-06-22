import { getBusiness } from "@/lib/data";
import { business as defaultBusiness } from "@/lib/site-config";
import BusinessForm from "./BusinessForm";

export const metadata = {
  title: "Kelola Info Bisnis — Admin",
};

export default async function AdminBusinessPage() {
  const business = await getBusiness().catch(() => defaultBusiness);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Informasi Bisnis</h1>
        <p className="text-sm text-ink/65 mt-1">
          Ubah informasi profil dasar perusahaan. Perubahan di sini langsung terupdate di seluruh website.
        </p>
      </div>

      <BusinessForm initialData={business} />
    </div>
  );
}
