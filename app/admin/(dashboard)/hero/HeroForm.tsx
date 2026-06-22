"use client";

import { useState } from "react";
import { updateHeroConfig } from "../actions";
import { Plus, Trash2 } from "lucide-react";

interface HeroFormProps {
  initialData: {
    status: string;
    description: string;
    ticketTitle: string;
    ticketStatus: string;
    ticketItems: string[];
    ticketDuration: string;
  };
}

export default function HeroForm({ initialData }: HeroFormProps) {
  const [formData, setFormData] = useState({
    status: initialData.status,
    description: initialData.description,
    ticketTitle: initialData.ticketTitle,
    ticketStatus: initialData.ticketStatus,
    ticketDuration: initialData.ticketDuration,
  });
  const [ticketItems, setTicketItems] = useState<string[]>(initialData.ticketItems);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index: number, value: string) => {
    setTicketItems((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleAddItem = () => {
    setTicketItems((prev) => [...prev, ""]);
  };

  const handleRemoveItem = (index: number) => {
    setTicketItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    // Filter items kosong
    const filteredItems = ticketItems.filter((item) => item.trim() !== "");

    const res = await updateHeroConfig({
      ...formData,
      ticketItems: filteredItems,
    });
    setLoading(false);

    if (res.success) {
      setStatus({ type: "success", message: "Konfigurasi Hero section berhasil disimpan!" });
      // Update local state dengan item terfilter
      setTicketItems(filteredItems);
    } else {
      setStatus({ type: "error", message: res.error || "Gagal menyimpan perubahan." });
    }
  };

  return (
    <div className="bg-paper border border-line rounded-2xl p-6 sm:p-8 shadow-sm">
      <h2 className="font-display text-lg font-bold text-ink mb-6">Edit Hero Section & Kartu Surat Tugas</h2>

      {status.type && (
        <div
          className={`mb-6 p-4 rounded-xl border text-sm flex gap-2.5 items-start ${
            status.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {status.type === "success" ? (
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          )}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Kolom Hero Utama */}
        <div className="space-y-6">
          <h3 className="font-display font-semibold text-sm text-ink/50 uppercase tracking-wider">Konten Utama Hero</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-ink/80 mb-2">
                Status Bisnis (Teks kecil di atas tagline)
              </label>
              <input
                id="status"
                name="status"
                type="text"
                required
                value={formData.status}
                onChange={handleChange}
                placeholder="Contoh: siap dibersihkan"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="ticketDuration" className="block text-sm font-semibold text-ink/80 mb-2">
                Estimasi Durasi Kerja
              </label>
              <input
                id="ticketDuration"
                name="ticketDuration"
                type="text"
                required
                value={formData.ticketDuration}
                onChange={handleChange}
                placeholder="Contoh: 2–3 jam"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-ink/80 mb-2">
              Deskripsi Hero Section
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all resize-y"
            />
          </div>
        </div>

        {/* Kolom Floating Card (Surat Tugas) */}
        <div className="space-y-6 pt-6 border-t border-line border-dashed">
          <h3 className="font-display font-semibold text-sm text-ink/50 uppercase tracking-wider">Visual Floating Card (Surat Tugas)</h3>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="ticketTitle" className="block text-sm font-semibold text-ink/80 mb-2">
                Nama Surat Tugas
              </label>
              <input
                id="ticketTitle"
                name="ticketTitle"
                type="text"
                required
                value={formData.ticketTitle}
                onChange={handleChange}
                placeholder="Contoh: General Cleaning"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="ticketStatus" className="block text-sm font-semibold text-ink/80 mb-2">
                Status Surat Tugas (Badge Kanan Atas)
              </label>
              <input
                id="ticketStatus"
                name="ticketStatus"
                type="text"
                required
                value={formData.ticketStatus}
                onChange={handleChange}
                placeholder="Contoh: Terjadwal"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-semibold text-ink/80">
                Item Tugas Terjadwal (Checklist Tugas)
              </label>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-pine-600 hover:text-pine-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Tambah Item</span>
              </button>
            </div>

            <div className="space-y-3.5">
              {ticketItems.map((item, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <span className="font-mono text-sm text-ink/40 w-6">{(index + 1).toString().padStart(2, "0")}.</span>
                  <input
                    type="text"
                    required
                    value={item}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    placeholder="Contoh: Lap & bersihkan kaca"
                    className="flex-1 rounded-xl border border-line bg-paper px-4 py-2.5 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    disabled={ticketItems.length <= 1}
                    className="p-2.5 rounded-xl border border-line hover:border-red-200 hover:bg-red-50 text-red-500 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-line transition-all shrink-0"
                    aria-label="Hapus item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-line flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-pine-600 hover:bg-pine-700 text-white font-display font-semibold px-6 py-3.5 transition-colors disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
