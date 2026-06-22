# Bersih Jaya — Website Company Profile Cleaning Service

Dibangun dengan **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**.
Sesuai PRD: fokus MVP halaman statis, pemesanan lewat WhatsApp click-to-chat,
harga transparan, dan loading cepat.

## 1. Cara Menjalankan

Butuh Node.js versi 18 atau lebih baru.

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

Untuk build versi produksi:

```bash
npm run build
npm run start
```

## 2. Hal Pertama yang Wajib Diganti

Semua data bisnis dikumpulkan di **satu file**, supaya gampang diedit tanpa
bongkar tiap halaman:

📄 `lib/site-config.ts`

Yang perlu diganti sebelum live:

1. **`whatsappNumber`** — nomor WhatsApp asli, format `62` + nomor tanpa angka 0 di depan.
   Contoh: nomor `0812-3456-7890` ditulis `"6281234567890"`.
2. **`name`, `tagline`, `address`, `email`, `serviceArea`, `operatingHours`** — sesuaikan dengan data asli.
3. **`services`** — nama layanan, harga (`priceFrom`), satuan (`unit`), dan daftar `included` / `excluded`.
   Ini yang paling penting untuk transparansi harga (sesuai PRD bagian 7 — manajemen risiko ekspektasi).
4. **`testimonials`** — testimoni di file ini **masih contoh/placeholder**.
   Ganti dengan ulasan asli pelanggan sebelum website tayang ke publik,
   supaya tidak menyesatkan calon pelanggan.
5. **`faqs`** — sesuaikan jika ada pertanyaan khas bisnis Anda.

Setelah edit nomor WhatsApp, semua tombol "Pesan via WhatsApp" di seluruh
halaman otomatis ikut berubah — tidak perlu cari satu-satu.

## 3. Mengganti Foto Placeholder

Galeri before/after di halaman `/layanan` masih berupa kotak placeholder
bertuliskan "ganti placeholder ini" (lihat `app/layanan/page.tsx`).

Langkah ganti dengan foto asli:

1. Simpan foto di folder `public/images/` (lihat catatan di
   `public/images/BACA-SAYA.txt`).
2. Pakai komponen `<Image>` dari `next/image` (bukan tag `<img>` biasa),
   supaya foto otomatis dikompres ke WebP/AVIF dan di-lazy-load —
   ini penting untuk menjaga loading tetap di bawah 3 detik sesuai PRD.

```tsx
import Image from "next/image";

<Image
  src="/images/after-ruang-tamu.jpg"
  alt="Ruang tamu setelah dibersihkan oleh tim Bersih Jaya"
  width={600}
  height={600}
  className="aspect-square object-cover"
/>
```

Selalu isi `alt` dengan deskripsi yang jelas — membantu SEO sekaligus
pengguna pembaca layar (screen reader).

## 4. Struktur Folder

```
app/
  layout.tsx          -> Header, Footer, font, SEO metadata global
  page.tsx            -> Beranda
  layanan/page.tsx    -> Detail semua layanan + galeri before/after
  harga/page.tsx      -> Daftar harga lengkap
  faq/page.tsx        -> Semua FAQ
  syarat-ketentuan/page.tsx -> T&C (kebijakan pembatalan, batasan tanggung jawab)
  sitemap.ts          -> sitemap.xml otomatis untuk SEO
  robots.ts           -> robots.txt otomatis

components/           -> Semua bagian UI (Hero, kartu layanan, FAQ, dst)
lib/
  site-config.ts       -> SATU file sumber data bisnis (edit di sini)
  whatsapp.ts          -> Helper bikin link wa.me dengan pesan otomatis
```

## 5. Catatan Desain & Aksesibilitas

- **Ukuran teks dasar dinaikkan ke ~18px** (lihat `app/globals.css`) supaya
  lebih nyaman dibaca segala usia, termasuk pengguna lanjut usia — ini
  berlaku otomatis ke seluruh halaman.
- **Kontras warna tinggi**: teks gelap (`ink`) di atas latar terang (`paper`/`mist`).
- **Tombol berukuran besar** (tinggi minimal ~52px) supaya mudah ditekan,
  termasuk di perangkat sentuh.
- Tombol WhatsApp selalu memakai **ikon + teks**, tidak ikon saja, supaya
  jelas fungsinya tanpa perlu menebak.
- Menu mobile & FAQ memakai elemen HTML native (`<details>/<summary>`) —
  tidak butuh JavaScript tambahan, otomatis bisa dioperasikan dengan
  keyboard dan pembaca layar.
- Mendukung `prefers-reduced-motion`: animasi otomatis dimatikan untuk
  pengguna yang mengaktifkan pengaturan tersebut di perangkatnya.

## 6. Catatan Performa

- Font (Sora, Public Sans, IBM Plex Mono) di-*self-host* lewat `next/font`
  — tidak ada request render-blocking ke Google Fonts saat halaman dibuka.
- Hampir semua komponen adalah **React Server Component** (tanpa
  `"use client"`), jadi JavaScript yang dikirim ke browser sangat minim.
- Tidak ada library animasi berat — animasi hero memakai CSS murni.
- Tailwind CSS otomatis membuang class yang tidak terpakai saat build
  (`npm run build`), jadi ukuran file CSS akhir kecil.

## 7. Catatan Hukum (Halaman Syarat & Ketentuan)

Isi halaman `/syarat-ketentuan` adalah **template umum** berdasarkan
manajemen risiko di PRD (batasan tanggung jawab, kebijakan pembatalan).
Sebelum dipakai resmi, sebaiknya direview oleh yang memahami regulasi
perlindungan konsumen yang berlaku, agar sesuai kebutuhan bisnis Anda.
Bagian ini bukan nasihat hukum.

## 8. Deploy

Cara tercepat: deploy ke [Vercel](https://vercel.com) (pembuat Next.js).

```bash
npm install -g vercel
vercel
```

Atau hubungkan repo GitHub project ini ke Vercel lewat dashboard mereka —
build & deploy otomatis tiap kali ada perubahan kode.
