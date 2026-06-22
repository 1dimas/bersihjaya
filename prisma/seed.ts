import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Business ──────────────────────────────────────────
  await prisma.business.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      name: "Bersih Jaya",
      tagline: "Jasa Kebersihan Profesional & Terpercaya",
      whatsappNumber: "6281234567890",
      email: "halo@bersihjaya.id",
      address: "Jl. Margonda Raya No. 1, Depok, Jawa Barat",
      serviceArea: "Depok, Jakarta Selatan, Jakarta Timur, dan sekitarnya (Jabodetabek)",
      operatingHours: "Setiap hari, 07.00 – 20.00 WIB",
      instagram: "https://instagram.com/bersihjaya.id",
    },
  });

  // ─── Hero Config ───────────────────────────────────────
  await prisma.heroConfig.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      status: "siap dibersihkan",
      description:
        "Tim terlatih, peralatan lengkap, dan harga yang jelas dari awal — tanpa biaya tersembunyi. Untuk rumah, apartemen, sampai kantor kecil.",
      ticketTitle: "General Cleaning",
      ticketStatus: "Terjadwal",
      ticketItems: [
        "Lap & bersihkan kaca",
        "Vacuum karpet & sofa",
        "Disinfeksi permukaan",
        "Pel lantai sampai kering",
      ],
      ticketDuration: "2–3 jam",
    },
  });

  // ─── Value Props ───────────────────────────────────────
  const valuePropsData = [
    {
      iconName: "Users",
      title: "Staf Terlatih",
      description:
        "Setiap petugas melalui pelatihan teknik kebersihan dan etika kerja sebelum turun ke lapangan.",
      sortOrder: 0,
    },
    {
      iconName: "Leaf",
      title: "Bahan Ramah Lingkungan",
      description:
        "Produk pembersih yang kami gunakan aman untuk anak-anak dan hewan peliharaan di rumah.",
      sortOrder: 1,
    },
    {
      iconName: "ShieldCheck",
      title: "Garansi Kebersihan",
      description:
        "Belum puas dengan hasilnya? Sampaikan dalam 24 jam, kami kembali membersihkan tanpa biaya tambahan.",
      sortOrder: 2,
    },
    {
      iconName: "Receipt",
      title: "Harga Transparan",
      description:
        "Estimasi biaya kami tampilkan terbuka sejak awal — tidak ada biaya kejutan setelah pekerjaan selesai.",
      sortOrder: 3,
    },
  ];
  for (const vp of valuePropsData) {
    await prisma.valueProp.create({ data: vp });
  }

  // ─── Services ──────────────────────────────────────────
  const servicesData = [
    {
      slug: "general-cleaning",
      name: "General Cleaning",
      image: "/images/service-general-cleaning.png",
      shortDesc: "Bersih-bersih rutin harian/mingguan untuk rumah & apartemen.",
      priceFrom: "Rp 120.000",
      unit: "per kunjungan (hingga 36m²)",
      included: [
        "Menyapu & mengepel seluruh ruangan",
        "Membersihkan debu di permukaan furnitur",
        "Membersihkan kaca jendela bagian dalam",
        "Merapikan & membuang sampah",
        "Membersihkan kamar mandi (kloset, lantai, wastafel)",
      ],
      excluded: [
        "Cuci sofa, karpet, dan kasur (paket terpisah)",
        "Naik ke ketinggian di atas 2 meter",
        "Membersihkan area luar pagar/balkon tanpa pengaman",
      ],
      sortOrder: 0,
    },
    {
      slug: "deep-cleaning",
      name: "Deep Cleaning",
      image: "/images/service-deep-cleaning.png",
      shortDesc: "Pembersihan menyeluruh untuk rumah baru, pasca renovasi, atau pindahan.",
      priceFrom: "Rp 350.000",
      unit: "per kunjungan (hingga 36m²)",
      included: [
        "Semua item General Cleaning",
        "Membersihkan sisa debu/cat pasca renovasi",
        "Menggosok kerak di kamar mandi & dapur",
        "Membersihkan kisi-kisi AC bagian luar",
        "Membersihkan bagian dalam kabinet dapur (kosong)",
      ],
      excluded: [
        "Bongkar pasang furnitur berat",
        "Servis AC (cuci evaporator/freon)",
        "Pengecatan ulang dinding",
      ],
      sortOrder: 1,
    },
    {
      slug: "sofa-karpet",
      name: "Cuci Sofa & Karpet",
      image: "/images/service-sofa-karpet.png",
      shortDesc: "Cuci kering (dry clean) untuk sofa, karpet, dan kasur.",
      priceFrom: "Rp 75.000",
      unit: "per meter persegi",
      included: [
        "Vacuum debu sebelum proses cuci",
        "Pencucian dengan shampoo khusus furnitur",
        "Pengangkatan noda ringan (kopi, debu, minyak)",
        "Pengeringan dengan extractor (kering ±4-6 jam)",
      ],
      excluded: [
        "Noda permanen/jamur yang sudah lama meresap",
        "Reparasi jahitan atau busa sofa yang rusak",
      ],
      sortOrder: 2,
    },
    {
      slug: "pest-control",
      name: "Pest Control",
      image: "/images/service-pest-control.png",
      shortDesc: "Pengendalian hama (kecoa, semut, nyamuk) untuk rumah & kantor kecil.",
      priceFrom: "Rp 250.000",
      unit: "per kunjungan",
      included: [
        "Penyemprotan area rawan hama (dapur, saluran air, sudut ruangan)",
        "Penggunaan bahan yang aman untuk anak & hewan peliharaan setelah kering",
        "Konsultasi titik rawan hama di rumah Anda",
      ],
      excluded: [
        "Fumigasi skala besar/gudang",
        "Garansi bebas hama 100% (tergantung kondisi lingkungan sekitar)",
      ],
      sortOrder: 3,
    },
  ];
  for (const svc of servicesData) {
    await prisma.service.create({ data: svc });
  }

  // ─── Booking Steps ─────────────────────────────────────
  const stepsData = [
    {
      title: "Lihat layanan & harga",
      description: "Pilih jenis layanan dan cek estimasi harga yang sudah kami cantumkan secara terbuka.",
      sortOrder: 0,
    },
    {
      title: 'Klik "Pesan via WhatsApp"',
      description: "Pesan otomatis terisi: nama, alamat, layanan, dan jadwal yang Anda inginkan.",
      sortOrder: 1,
    },
    {
      title: "Konfirmasi jadwal dengan admin",
      description: "Tim kami akan membalas dalam hitungan menit untuk mengonfirmasi waktu & detail pekerjaan.",
      sortOrder: 2,
    },
    {
      title: "Tim datang & bersihkan",
      description: "Petugas terlatih kami datang sesuai jadwal, lengkap dengan peralatan dan bahan pembersih.",
      sortOrder: 3,
    },
  ];
  for (const step of stepsData) {
    await prisma.bookingStep.create({ data: step });
  }

  // ─── Testimonials ──────────────────────────────────────
  const testimonialsData = [
    {
      name: "Ibu Sri W.",
      role: "Pelanggan Deep Cleaning, Depok",
      quote:
        "Rumah pasca renovasi jadi bersih total, sampai sela-sela keramik pun rapi. Petugasnya juga sopan dan tepat waktu.",
      sortOrder: 0,
    },
    {
      name: "Pak Hendra",
      role: "Pemilik Kantor Kecil, Cinere",
      quote:
        "Sudah langganan general cleaning kantor tiap minggu. Harganya jelas dari awal, tidak ada biaya tambahan tiba-tiba.",
      sortOrder: 1,
    },
    {
      name: "Mbak Dinda",
      role: "Pelanggan Cuci Sofa, Jakarta Selatan",
      quote:
        "Sofa 3 dudukan yang tadinya kusam jadi seperti baru lagi. Prosesnya juga cepat, kurang dari sehari sudah kering.",
      sortOrder: 2,
    },
  ];
  for (const t of testimonialsData) {
    await prisma.testimonial.create({ data: t });
  }

  // ─── FAQs ──────────────────────────────────────────────
  const faqsData = [
    {
      question: "Berapa lama waktu pengerjaan untuk satu rumah?",
      answer:
        "Untuk General Cleaning rumah tipe 36, biasanya 2-3 jam. Deep Cleaning bisa 4-6 jam tergantung kondisi dan luas area. Estimasi pasti akan kami sampaikan saat konfirmasi via WhatsApp.",
      sortOrder: 0,
    },
    {
      question: "Apakah peralatan dan bahan pembersih sudah disediakan?",
      answer:
        "Sudah. Tim kami membawa sendiri peralatan (vacuum, mop, extractor) dan bahan pembersih yang aman digunakan di rumah dengan anak-anak maupun hewan peliharaan.",
      sortOrder: 1,
    },
    {
      question: "Apakah saya harus berada di rumah selama proses pembersihan?",
      answer:
        "Tidak wajib, tapi kami sarankan ada perwakilan (keluarga/ART) saat tim datang dan selesai bekerja, untuk pengecekan hasil bersama-sama.",
      sortOrder: 2,
    },
    {
      question: "Bagaimana kebijakan pembatalan atau reschedule jadwal?",
      answer:
        'Pembatalan/reschedule dapat dilakukan gratis jika dikonfirmasi minimal 6 jam sebelum jadwal. Detail lengkap ada di halaman Syarat & Ketentuan.',
      sortOrder: 3,
    },
    {
      question: "Area mana saja yang dilayani?",
      answer:
        "Saat ini kami melayani area Depok, Jakarta Selatan, dan Jakarta Timur. Untuk area di luar itu, silakan tanyakan dulu via WhatsApp, kemungkinan masih bisa kami jangkau.",
      sortOrder: 4,
    },
    {
      question: "Bagaimana cara pembayarannya?",
      answer:
        "Pembayaran dilakukan setelah pekerjaan selesai, melalui transfer bank atau e-wallet. Tidak ada pembayaran di muka untuk layanan rumah tangga.",
      sortOrder: 5,
    },
  ];
  for (const faq of faqsData) {
    await prisma.faq.create({ data: faq });
  }

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
