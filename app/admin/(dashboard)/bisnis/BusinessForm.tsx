"use client";

import { useState } from "react";
import { updateBusiness } from "../actions";

interface BusinessFormProps {
  initialData: {
    name: string;
    tagline: string;
    whatsappNumber: string;
    email: string;
    address: string;
    serviceArea: string;
    operatingHours: string;
    instagram: string;
  };
}

export default function BusinessForm({ initialData }: BusinessFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    const res = await updateBusiness(formData);
    setLoading(false);

    if (res.success) {
      setStatus({ type: "success", message: "Informasi bisnis berhasil disimpan!" });
    } else {
      setStatus({ type: "error", message: res.error || "Gagal menyimpan perubahan." });
    }
  };

  return (
    <div className="bg-paper border border-line rounded-2xl p-6 sm:p-8 shadow-sm">
      <h2 className="font-display text-lg font-bold text-ink mb-6">Edit Profil Bisnis</h2>

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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-ink/80 mb-2">
              Nama Bisnis
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="whatsappNumber" className="block text-sm font-semibold text-ink/80 mb-2">
              Nomor WhatsApp (Format Internasional)
            </label>
            <input
              id="whatsappNumber"
              name="whatsappNumber"
              type="text"
              required
              value={formData.whatsappNumber}
              onChange={handleChange}
              placeholder="Contoh: 6281234567890"
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all"
            />
            <span className="text-xs text-ink/50 mt-1 block">Jangan gunakan tanda "+" atau angka "0" di depan.</span>
          </div>
        </div>

        <div>
          <label htmlFor="tagline" className="block text-sm font-semibold text-ink/80 mb-2">
            Slogan / Tagline Bisnis
          </label>
          <input
            id="tagline"
            name="tagline"
            type="text"
            required
            value={formData.tagline}
            onChange={handleChange}
            className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-ink/80 mb-2">
              Email Hubungi
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="instagram" className="block text-sm font-semibold text-ink/80 mb-2">
              URL Instagram
            </label>
            <input
              id="instagram"
              name="instagram"
              type="url"
              required
              value={formData.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/akun-anda"
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="operatingHours" className="block text-sm font-semibold text-ink/80 mb-2">
              Jam Operasional
            </label>
            <input
              id="operatingHours"
              name="operatingHours"
              type="text"
              required
              value={formData.operatingHours}
              onChange={handleChange}
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="serviceArea" className="block text-sm font-semibold text-ink/80 mb-2">
              Area Layanan
            </label>
            <input
              id="serviceArea"
              name="serviceArea"
              type="text"
              required
              value={formData.serviceArea}
              onChange={handleChange}
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-ink/80 mb-2">
            Alamat Kantor
          </label>
          <textarea
            id="address"
            name="address"
            required
            rows={3}
            value={formData.address}
            onChange={handleChange}
            className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all resize-y"
          />
        </div>

        <div className="pt-4 border-t border-line flex justify-end">
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
