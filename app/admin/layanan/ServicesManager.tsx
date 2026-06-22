"use client";

import { useState } from "react";
import Image from "next/image";
import { upsertService, deleteService, reorderServices } from "../actions";
import { UploadDropzone } from "@/lib/uploadthing";
import { Plus, Trash2, Edit2, ArrowUp, ArrowDown, Check, X, ImageIcon } from "lucide-react";
import "@uploadthing/react/styles.css";

interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  priceFrom: string;
  unit: string;
  image: string;
  included: string[];
  excluded: string[];
  sortOrder: number;
}

interface ServicesManagerProps {
  initialData: ServiceItem[];
}

export default function ServicesManager({ initialData }: ServicesManagerProps) {
  const [items, setItems] = useState<ServiceItem[]>(initialData);
  const [editingItem, setEditingItem] = useState<Partial<ServiceItem> | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleEdit = (item: ServiceItem) => {
    setEditingItem({
      ...item,
      included: [...item.included],
      excluded: [...item.excluded],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreateNew = () => {
    setEditingItem({
      slug: "",
      name: "",
      shortDesc: "",
      priceFrom: "Rp ",
      unit: "per kunjungan",
      image: "",
      included: [""],
      excluded: [""],
      sortOrder: items.length > 0 ? Math.max(...items.map((i) => i.sortOrder)) + 1 : 1,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus layanan ini?")) return;
    setLoading(true);
    setStatus({ type: null, message: "" });

    const res = await deleteService(id);
    setLoading(false);

    if (res.success) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setStatus({ type: "success", message: "Layanan berhasil dihapus!" });
    } else {
      setStatus({ type: "error", message: res.error || "Gagal menghapus layanan." });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !editingItem?.name ||
      !editingItem?.slug ||
      !editingItem?.shortDesc ||
      !editingItem?.priceFrom ||
      !editingItem?.unit
    ) {
      setStatus({ type: "error", message: "Mohon isi semua field wajib." });
      return;
    }

    if (!editingItem.image) {
      setStatus({ type: "error", message: "Mohon upload gambar layanan terlebih dahulu." });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    // Filter list kosong
    const included = (editingItem.included || []).filter((item) => item.trim() !== "");
    const excluded = (editingItem.excluded || []).filter((item) => item.trim() !== "");

    const res = await upsertService({
      id: editingItem.id,
      slug: editingItem.slug,
      name: editingItem.name,
      shortDesc: editingItem.shortDesc,
      priceFrom: editingItem.priceFrom,
      unit: editingItem.unit,
      image: editingItem.image,
      included,
      excluded,
      sortOrder: editingItem.sortOrder ?? 1,
    });

    setLoading(false);

    if (res.success) {
      const savedData = res.data as ServiceItem;
      setItems((prev) => {
        const index = prev.findIndex((i) => i.id === savedData.id);
        if (index > -1) {
          const updated = [...prev];
          updated[index] = savedData;
          return updated.sort((a, b) => a.sortOrder - b.sortOrder);
        } else {
          return [...prev, savedData].sort((a, b) => a.sortOrder - b.sortOrder);
        }
      });
      setEditingItem(null);
      setStatus({ type: "success", message: "Layanan berhasil disimpan!" });
    } else {
      setStatus({ type: "error", message: res.error || "Gagal menyimpan layanan." });
    }
  };

  const handleArrayItemChange = (type: "included" | "excluded", index: number, value: string) => {
    setEditingItem((prev) => {
      if (!prev) return null;
      const list = prev[type] ? [...prev[type]!] : [];
      list[index] = value;
      return { ...prev, [type]: list };
    });
  };

  const handleAddArrayItem = (type: "included" | "excluded") => {
    setEditingItem((prev) => {
      if (!prev) return null;
      const list = prev[type] ? [...prev[type]!] : [];
      return { ...prev, [type]: [...list, ""] };
    });
  };

  const handleRemoveArrayItem = (type: "included" | "excluded", index: number) => {
    setEditingItem((prev) => {
      if (!prev) return null;
      const list = prev[type] ? prev[type]!.filter((_, i) => i !== index) : [];
      return { ...prev, [type]: list };
    });
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === items.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const newItems = [...items];

    // Swap sortOrder values
    const tempOrder = newItems[index].sortOrder;
    newItems[index].sortOrder = newItems[targetIndex].sortOrder;
    newItems[targetIndex].sortOrder = tempOrder;

    // Swap items positions in local array
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setItems(newItems);

    // Save to DB
    const res = await reorderServices(
      newItems.map((item, idx) => ({ id: item.id, sortOrder: item.sortOrder }))
    );
    if (!res.success) {
      setStatus({ type: "error", message: "Gagal menyimpan urutan baru ke database." });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Status Alerts */}
      {status.type && (
        <div
          className={`p-4 rounded-xl border text-sm flex gap-2.5 items-start ${
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

      {/* Editing Form Panel */}
      {editingItem && (
        <div className="bg-paper border border-line rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-display text-lg font-bold text-ink mb-6">
            {editingItem.id ? "Edit Paket Layanan" : "Tambah Paket Layanan Baru"}
          </h2>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-ink/80 mb-2">
                  Nama Layanan *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={editingItem.name || ""}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    setEditingItem((prev) => ({ ...prev, name, slug }));
                  }}
                  placeholder="Contoh: General Cleaning"
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-semibold text-ink/80 mb-2">
                  Slug URL (Otomatis) *
                </label>
                <input
                  id="slug"
                  type="text"
                  required
                  value={editingItem.slug || ""}
                  onChange={(e) => setEditingItem((prev) => ({ ...prev, slug: e.target.value }))}
                  className="w-full rounded-xl border border-line bg-mist px-4 py-3 text-ink/50 outline-none cursor-not-allowed font-mono text-xs"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label htmlFor="shortDesc" className="block text-sm font-semibold text-ink/80 mb-2">
                Deskripsi Singkat Layanan *
              </label>
              <textarea
                id="shortDesc"
                required
                rows={2}
                value={editingItem.shortDesc || ""}
                onChange={(e) => setEditingItem((prev) => ({ ...prev, shortDesc: e.target.value }))}
                placeholder="Rangkuman singkat jasa kebersihan untuk ditampilkan di card beranda..."
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all resize-y"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="priceFrom" className="block text-sm font-semibold text-ink/80 mb-2">
                  Mulai Harga *
                </label>
                <input
                  id="priceFrom"
                  type="text"
                  required
                  value={editingItem.priceFrom || ""}
                  onChange={(e) => setEditingItem((prev) => ({ ...prev, priceFrom: e.target.value }))}
                  placeholder="Contoh: Rp 120.000"
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="unit" className="block text-sm font-semibold text-ink/80 mb-2">
                  Satuan Unit Harga *
                </label>
                <input
                  id="unit"
                  type="text"
                  required
                  value={editingItem.unit || ""}
                  onChange={(e) => setEditingItem((prev) => ({ ...prev, unit: e.target.value }))}
                  placeholder="Contoh: per kunjungan (hingga 36m²)"
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all"
                />
              </div>
            </div>

            {/* Upload Gambar Layanan */}
            <div>
              <label className="block text-sm font-semibold text-ink/80 mb-2">Gambar Banner Layanan *</label>
              {editingItem.image ? (
                <div className="relative rounded-xl overflow-hidden border border-line aspect-[16/9] max-w-md bg-mist flex flex-col items-center justify-center group">
                  <Image
                    src={editingItem.image}
                    alt="Preview upload"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setEditingItem((prev) => ({ ...prev, image: "" }))}
                      className="rounded-xl bg-red-650 hover:bg-red-750 text-white font-semibold text-sm px-4 py-2.5 shadow-md flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                      <span>Hapus & Ganti Gambar</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-line rounded-xl bg-mist p-2 max-w-md">
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        setEditingItem((prev) => ({ ...prev, image: res[0].url }));
                        setStatus({ type: "success", message: "Gambar berhasil diupload ke serverless CDN!" });
                      }
                    }}
                    onUploadError={(err) => {
                      setStatus({ type: "error", message: `Gagal upload: ${err.message}` });
                    }}
                    content={{
                      label: "Pilih file atau drop gambar di sini",
                      allowedContent: "Gambar (Maksimal 4MB)",
                      button: "Pilih Gambar"
                    }}
                    appearance={{
                      container: "py-6 border-0",
                      button: "bg-pine-600 border-0 text-white hover:bg-pine-700 font-display font-semibold rounded-xl text-sm py-2 px-4 shadow-sm",
                      label: "text-ink/60 font-medium text-sm mt-1",
                      allowedContent: "text-ink/40 text-xs mt-0.5"
                    }}
                  />
                </div>
              )}
            </div>

            {/* Included & Excluded Section */}
            <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-line border-dashed">
              {/* Yang Termasuk */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-semibold text-ink/80 flex items-center gap-1.5">
                    <Check className="h-5 w-5 text-pine-600 shrink-0" />
                    <span>Yang Termasuk (Included)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("included")}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-pine-600 hover:text-pine-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Tambah Item</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {(editingItem.included || []).map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        required
                        value={item}
                        onChange={(e) => handleArrayItemChange("included", index, e.target.value)}
                        placeholder="Contoh: Menyapu & mengepel seluruh ruangan"
                        className="flex-1 rounded-xl border border-line bg-paper px-3 py-2 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("included", index)}
                        disabled={(editingItem.included || []).length <= 1}
                        className="p-2.5 rounded-xl border border-line hover:border-red-200 hover:bg-red-50 text-red-500 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-line transition-all shrink-0"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Yang Tidak Termasuk */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-semibold text-ink/80 flex items-center gap-1.5">
                    <X className="h-5 w-5 text-red-650 shrink-0" />
                    <span>Yang Tidak Termasuk (Excluded)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("excluded")}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-pine-600 hover:text-pine-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Tambah Item</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {(editingItem.excluded || []).map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        required
                        value={item}
                        onChange={(e) => handleArrayItemChange("excluded", index, e.target.value)}
                        placeholder="Contoh: Bongkar pasang furnitur berat"
                        className="flex-1 rounded-xl border border-line bg-paper px-3 py-2 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("excluded", index)}
                        disabled={(editingItem.excluded || []).length <= 1}
                        className="p-2.5 rounded-xl border border-line hover:border-red-200 hover:bg-red-50 text-red-500 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-line transition-all shrink-0"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-line flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="rounded-xl border border-line bg-paper text-ink px-5 py-3 hover:bg-mist font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-pine-600 hover:bg-pine-700 text-white px-5 py-3 font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Simpan Layanan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      <div className="bg-paper border border-line rounded-2xl shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-6 py-5 border-b border-line">
          <h2 className="font-display text-lg font-bold text-ink">Daftar Paket Layanan ({items.length})</h2>
          {!editingItem && (
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-1.5 rounded-xl bg-pine-600 hover:bg-pine-700 text-white font-semibold text-sm px-4 py-2.5 transition-colors"
            >
              <Plus className="h-4.5 w-4.5" />
              <span>Tambah Layanan</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="p-8 text-center text-ink/50">Belum ada data paket layanan di database.</div>
        ) : (
          <div className="divide-y divide-line">
            {items.map((item, index) => {
              return (
                <div key={item.id} className="p-6 flex flex-col md:flex-row gap-5 justify-between items-start md:items-center">
                  <div className="flex gap-4 items-start">
                    <div className="relative h-16 w-24 rounded-xl border border-line overflow-hidden shrink-0 bg-mist flex items-center justify-center">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-ink/30" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-ink text-base flex items-center gap-2">
                        {item.name}
                        <span className="font-mono text-[10px] text-pine-700 bg-pine-50 border border-pine-100 px-2 py-0.5 rounded-full font-medium">
                          mulai {item.priceFrom} / {item.unit}
                        </span>
                      </h3>
                      <p className="text-sm text-ink/70 leading-relaxed mt-1">{item.shortDesc}</p>
                      <div className="flex gap-4 mt-2 text-xs text-ink/45 font-medium">
                        <span>✓ {item.included.length} Included</span>
                        <span>✗ {item.excluded.length} Excluded</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => handleMove(index, "up")}
                      disabled={index === 0}
                      className="p-2.5 rounded-xl border border-line hover:bg-mist text-ink/60 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                      aria-label="Geser ke atas"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleMove(index, "down")}
                      disabled={index === items.length - 1}
                      className="p-2.5 rounded-xl border border-line hover:bg-mist text-ink/60 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                      aria-label="Geser ke bawah"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2.5 rounded-xl border border-line hover:border-pine-200 hover:bg-pine-50 text-pine-600 transition-all"
                      aria-label="Edit layanan"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2.5 rounded-xl border border-line hover:border-red-200 hover:bg-red-50 text-red-500 transition-all"
                      aria-label="Hapus layanan"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
