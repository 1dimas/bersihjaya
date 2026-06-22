import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { business as defaultBusiness } from "@/lib/site-config";
import { getBusiness } from "@/lib/data";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan ketentuan penggunaan jasa cleaning service, termasuk kebijakan pembatalan dan batasan tanggung jawab.",
};

export default async function SyaratKetentuanPage() {
  const business = await getBusiness().catch(() => defaultBusiness);

  const sections = [
    {
      title: "1. Ruang Lingkup Layanan",
      body: `Layanan yang kami berikan mengikuti rincian "termasuk" dan "tidak termasuk" yang tercantum di halaman Layanan dan Harga pada website ini. Pekerjaan tambahan di luar rincian tersebut akan dikonfirmasi dan dapat dikenakan biaya tambahan sebelum dikerjakan.`,
    },
    {
      title: "2. Jadwal, Reschedule, dan Pembatalan",
      body: `Pemesanan dikonfirmasi melalui WhatsApp setelah Anda menyampaikan jadwal yang diinginkan. Perubahan jadwal (reschedule) atau pembatalan dapat dilakukan tanpa biaya apabila disampaikan paling lambat 6 (enam) jam sebelum jadwal yang disepakati. Pembatalan mendadak (kurang dari 6 jam) atau tim yang sudah datang ke lokasi namun tidak dapat bekerja karena akses tertutup, dapat dikenakan biaya kunjungan sesuai kesepakatan.`,
    },
    {
      title: "3. Tanggung Jawab & Batasan Kerusakan Barang",
      body: `Tim kami bekerja dengan hati-hati menggunakan peralatan dan bahan standar. Apabila terjadi kerusakan barang akibat kelalaian langsung petugas selama proses pengerjaan, ${business.name} akan menindaklanjuti laporan tersebut secara wajar setelah pelanggan menyampaikan keluhan maksimal 24 jam setelah pekerjaan selesai, disertai bukti foto/video. Kami tidak bertanggung jawab atas: (a) kerusakan pada barang yang sudah rapuh, retak, atau aus sebelum pengerjaan; (b) barang berharga/mudah pecah yang tidak diinformasikan dan diamankan sebelum tim bekerja; (c) kerusakan akibat kondisi tersembunyi yang tidak dapat diketahui secara kasat mata (misalnya instalasi listrik/pipa yang sudah bermasalah).`,
    },
    {
      title: "4. Pembayaran",
      body: `Pembayaran dilakukan setelah pekerjaan selesai dan dicek bersama, melalui transfer bank atau e-wallet sesuai kesepakatan di WhatsApp. Untuk layanan B2B/kontrak rutin, ketentuan pembayaran dapat diatur tersendiri sesuai perjanjian tertulis.`,
    },
    {
      title: "5. Privasi Data",
      body: `Data yang Anda bagikan melalui WhatsApp (nama, alamat, nomor kontak) hanya digunakan untuk keperluan penjadwalan dan komunikasi terkait pemesanan, dan tidak kami bagikan ke pihak ketiga untuk kepentingan komersial.`,
    },
    {
      title: "6. Perubahan Syarat & Ketentuan",
      body: `Kami dapat memperbarui halaman ini dari waktu ke waktu. Perubahan akan berlaku sejak dipublikasikan di halaman ini.`,
    },
  ];

  return (
    <>
      <section className="bg-mist border-b border-line py-14 sm:py-16">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Legal" title="Syarat & Ketentuan" />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-xl font-semibold text-ink">{s.title}</h2>
                <p className="mt-3 text-ink/75 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-line">
            <h2 className="font-display text-xl font-semibold text-ink">Hubungi Kami</h2>
            <p className="mt-3 text-ink/75 leading-relaxed">
              Pertanyaan seputar syarat & ketentuan dapat disampaikan melalui {business.email}{" "}
              atau WhatsApp kami.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

