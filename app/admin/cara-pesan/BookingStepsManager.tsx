"use client";

import { useState } from "react";
import { upsertBookingStep, deleteBookingStep, reorderBookingSteps } from "../actions";
import { Plus, Trash2, Edit2, ArrowUp, ArrowDown } from "lucide-react";

interface BookingStepItem {
  id: string;
  title: string;
  description: string;
  sortOrder: number;
}

interface BookingStepsManagerProps {
  initialData: BookingStepItem[];
}

export default function BookingStepsManager({ initialData }: BookingStepsManagerProps) {
  const [items, setItems] = useState<BookingStepItem[]>(initialData);
  const [editingItem, setEditingItem] = useState<Partial<BookingStepItem> | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleEdit = (item: BookingStepItem) => {
    setEditingItem(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreateNew = () => {
    setEditingItem({
      title: "",
      description: "",
      sortOrder: items.length > 0 ? Math.max(...items.map((i) => i.sortOrder)) + 1 : 1,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus langkah pemesanan ini?")) return;
    setLoading(true);
    setStatus({ type: null, message: "" });

    const res = await deleteBookingStep(id);
    setLoading(false);

    if (res.success) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setStatus({ type: "success", message: "Langkah pemesanan berhasil dihapus!" });
    } else {
      setStatus({ type: "error", message: res.error || "Gagal menghapus langkah." });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title || !editingItem?.description) return;

    setLoading(true);
    setStatus({ type: null, message: "" });

    const res = await upsertBookingStep({
      id: editingItem.id,
      title: editingItem.title,
      description: editingItem.description,
      sortOrder: editingItem.sortOrder ?? 1,
    });

    setLoading(false);

    if (res.success) {
      const savedData = res.data as BookingStepItem;
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
      setStatus({ type: "success", message: "Langkah pemesanan berhasil disimpan!" });
    } else {
      setStatus({ type: "error", message: res.error || "Gagal menyimpan langkah." });
    }
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
    const res = await reorderBookingSteps(
      newItems.map((item, idx) => ({ id: item.id, sortOrder: item.sortOrder }))
    );
    if (!res.success) {
      setStatus({ type: "error", message: "Gagal menyimpan urutan baru ke database." });
    }
  };

  return (
    <div className="space-y-8">
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
            {editingItem.id ? "Edit Langkah Pemesanan" : "Tambah Langkah Pemesanan Baru"}
          </h2>

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-ink/80 mb-2">
                Judul Langkah
              </label>
              <input
                id="title"
                type="text"
                required
                value={editingItem.title || ""}
                onChange={(e) => setEditingItem((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Contoh: Lihat layanan & harga"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-ink/80 mb-2">
                Deskripsi Cara Pemesanan
              </label>
              <textarea
                id="description"
                required
                rows={3}
                value={editingItem.description || ""}
                onChange={(e) => setEditingItem((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Tulis instruksi singkat bagi calon pelanggan..."
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all resize-y"
              />
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
                {loading ? "Menyimpan..." : "Simpan Langkah"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Steps List */}
      <div className="bg-paper border border-line rounded-2xl shadow-sm overflow-hidden">
        <div className="flex justify-between items-center px-6 py-5 border-b border-line">
          <h2 className="font-display text-lg font-bold text-ink">Daftar Langkah Pemesanan ({items.length})</h2>
          {!editingItem && (
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-1.5 rounded-xl bg-pine-600 hover:bg-pine-700 text-white font-semibold text-sm px-4 py-2.5 transition-colors"
            >
              <Plus className="h-4.5 w-4.5" />
              <span>Tambah Langkah</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="p-8 text-center text-ink/50">Belum ada data langkah pemesanan di database.</div>
        ) : (
          <div className="divide-y divide-line">
            {items.map((item, index) => {
              return (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-5 justify-between items-start sm:items-center">
                  <div className="flex gap-4 items-start">
                    <span className="font-mono text-xl font-bold text-pine-600 bg-pine-50 border border-pine-100 rounded-xl h-10 w-10 flex items-center justify-center shrink-0">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-ink text-base">{item.title}</h3>
                      <p className="text-sm text-ink/70 leading-relaxed mt-1">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
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
                      aria-label="Edit langkah"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2.5 rounded-xl border border-line hover:border-red-200 hover:bg-red-50 text-red-500 transition-all"
                      aria-label="Hapus langkah"
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
