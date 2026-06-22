import { getFaqs } from "@/lib/data";
import { faqs as defaultFaqs } from "@/lib/site-config";
import FaqsManager from "./FaqsManager";

export const metadata = {
  title: "Kelola FAQ — Admin",
};

export default async function AdminFaqPage() {
  const faqs = await getFaqs().catch(() => []);

  // Convert database structure or default values
  const initialData = faqs.length > 0 
    ? faqs 
    : defaultFaqs.map((item, idx) => ({
        id: `default-${idx}`,
        question: item.question,
        answer: item.answer,
        sortOrder: idx + 1,
      }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Pertanyaan FAQ</h1>
        <p className="text-sm text-ink/65 mt-1">
          Kelola daftar pertanyaan yang sering diajukan pelanggan. Perubahan di sini langsung terupdate di halaman FAQ website.
        </p>
      </div>

      <FaqsManager initialData={initialData} />
    </div>
  );
}
