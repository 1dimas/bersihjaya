import { business } from "./site-config";

/**
 * Membuat link "click-to-chat" WhatsApp dengan pesan yang sudah terisi
 * otomatis, sesuai PRD bagian 4.6 (Integrasi Pemesanan & Kontak).
 */
export function buildWhatsAppLink(whatsappNumber?: string, message?: string): string {
  const num = whatsappNumber || business.whatsappNumber;
  const base = `https://wa.me/${num}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function whatsappMessageForService(businessName?: string, serviceName?: string): string {
  const name = businessName || business.name;
  if (!serviceName) {
    return `Halo ${name}, saya ingin tanya-tanya soal layanan cleaning service.`;
  }
  return `Halo ${name}, saya ingin memesan layanan *${serviceName}*.\n\nNama:\nAlamat:\nJadwal yang diinginkan:`;
}

