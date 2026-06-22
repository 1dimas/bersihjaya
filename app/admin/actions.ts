"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Helper untuk validasi session admin
async function checkAuth() {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized: Anda harus login sebagai admin.");
  }
}

// ─── INFO BISNIS ─────────────────────────────────────────────────────────────
export async function updateBusiness(data: {
  name: string;
  tagline: string;
  whatsappNumber: string;
  email: string;
  address: string;
  serviceArea: string;
  operatingHours: string;
  instagram: string;
}) {
  await checkAuth();

  try {
    const biz = await prisma.business.upsert({
      where: { id: "main" },
      update: data,
      create: { id: "main", ...data },
    });

    revalidatePath("/");
    revalidatePath("/layanan");
    revalidatePath("/harga");
    revalidatePath("/faq");
    revalidatePath("/syarat-ketentuan");
    return { success: true, data: biz };
  } catch (error: any) {
    console.error("Gagal update info bisnis:", error);
    return { success: false, error: error.message || "Gagal menyimpan perubahan." };
  }
}

// ─── HERO CONFIG ─────────────────────────────────────────────────────────────
export async function updateHeroConfig(data: {
  status: string;
  description: string;
  ticketTitle: string;
  ticketStatus: string;
  ticketItems: string[];
  ticketDuration: string;
}) {
  await checkAuth();

  try {
    const config = await prisma.heroConfig.upsert({
      where: { id: "main" },
      update: data,
      create: { id: "main", ...data },
    });

    revalidatePath("/");
    return { success: true, data: config };
  } catch (error: any) {
    console.error("Gagal update hero config:", error);
    return { success: false, error: error.message || "Gagal menyimpan perubahan." };
  }
}

// ─── KEUNGGULAN (VALUE PROPS) ──────────────────────────────────────────────────
export async function upsertValueProp(data: {
  id?: string;
  iconName: string;
  title: string;
  description: string;
  sortOrder: number;
}) {
  await checkAuth();

  try {
    let result;
    if (data.id) {
      result = await prisma.valueProp.update({
        where: { id: data.id },
        data: {
          iconName: data.iconName,
          title: data.title,
          description: data.description,
          sortOrder: data.sortOrder,
        },
      });
    } else {
      result = await prisma.valueProp.create({
        data: {
          iconName: data.iconName,
          title: data.title,
          description: data.description,
          sortOrder: data.sortOrder,
        },
      });
    }

    revalidatePath("/");
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Gagal upsert value prop:", error);
    return { success: false, error: error.message || "Gagal menyimpan data." };
  }
}

export async function deleteValueProp(id: string) {
  await checkAuth();

  try {
    await prisma.valueProp.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Gagal delete value prop:", error);
    return { success: false, error: error.message || "Gagal menghapus data." };
  }
}

export async function reorderValueProps(items: { id: string; sortOrder: number }[]) {
  await checkAuth();

  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.valueProp.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        })
      )
    );
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Gagal mengurutkan keunggulan:", error);
    return { success: false, error: error.message || "Gagal menyimpan urutan." };
  }
}

// ─── LAYANAN (SERVICES) ──────────────────────────────────────────────────────
export async function upsertService(data: {
  id?: string;
  slug: string;
  name: string;
  shortDesc: string;
  priceFrom: string;
  unit: string;
  image: string;
  included: string[];
  excluded: string[];
  sortOrder: number;
}) {
  await checkAuth();

  try {
    let result;
    const dbPayload = {
      slug: data.slug,
      name: data.name,
      shortDesc: data.shortDesc,
      priceFrom: data.priceFrom,
      unit: data.unit,
      image: data.image,
      included: data.included,
      excluded: data.excluded,
      sortOrder: data.sortOrder,
    };

    if (data.id) {
      result = await prisma.service.update({
        where: { id: data.id },
        data: dbPayload,
      });
    } else {
      result = await prisma.service.create({
        data: dbPayload,
      });
    }

    revalidatePath("/");
    revalidatePath("/layanan");
    revalidatePath("/harga");
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Gagal upsert service:", error);
    return { success: false, error: error.message || "Gagal menyimpan layanan." };
  }
}

export async function deleteService(id: string) {
  await checkAuth();

  try {
    await prisma.service.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/layanan");
    revalidatePath("/harga");
    return { success: true };
  } catch (error: any) {
    console.error("Gagal delete service:", error);
    return { success: false, error: error.message || "Gagal menghapus layanan." };
  }
}

export async function reorderServices(items: { id: string; sortOrder: number }[]) {
  await checkAuth();

  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.service.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        })
      )
    );
    revalidatePath("/");
    revalidatePath("/layanan");
    revalidatePath("/harga");
    return { success: true };
  } catch (error: any) {
    console.error("Gagal mengurutkan layanan:", error);
    return { success: false, error: error.message || "Gagal menyimpan urutan." };
  }
}

// ─── LANGKAH PEMESANAN (BOOKING STEPS) ─────────────────────────────────────────
export async function upsertBookingStep(data: {
  id?: string;
  title: string;
  description: string;
  sortOrder: number;
}) {
  await checkAuth();

  try {
    let result;
    if (data.id) {
      result = await prisma.bookingStep.update({
        where: { id: data.id },
        data: {
          title: data.title,
          description: data.description,
          sortOrder: data.sortOrder,
        },
      });
    } else {
      result = await prisma.bookingStep.create({
        data: {
          title: data.title,
          description: data.description,
          sortOrder: data.sortOrder,
        },
      });
    }

    revalidatePath("/");
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Gagal upsert booking step:", error);
    return { success: false, error: error.message || "Gagal menyimpan data." };
  }
}

export async function deleteBookingStep(id: string) {
  await checkAuth();

  try {
    await prisma.bookingStep.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Gagal delete booking step:", error);
    return { success: false, error: error.message || "Gagal menghapus data." };
  }
}

export async function reorderBookingSteps(items: { id: string; sortOrder: number }[]) {
  await checkAuth();

  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.bookingStep.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        })
      )
    );
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Gagal mengurutkan langkah pemesanan:", error);
    return { success: false, error: error.message || "Gagal menyimpan urutan." };
  }
}

// ─── TESTIMONI (TESTIMONIALS) ─────────────────────────────────────────────────
export async function upsertTestimonial(data: {
  id?: string;
  name: string;
  role: string;
  quote: string;
  sortOrder: number;
}) {
  await checkAuth();

  try {
    let result;
    if (data.id) {
      result = await prisma.testimonial.update({
        where: { id: data.id },
        data: {
          name: data.name,
          role: data.role,
          quote: data.quote,
          sortOrder: data.sortOrder,
        },
      });
    } else {
      result = await prisma.testimonial.create({
        data: {
          name: data.name,
          role: data.role,
          quote: data.quote,
          sortOrder: data.sortOrder,
        },
      });
    }

    revalidatePath("/");
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Gagal upsert testimonial:", error);
    return { success: false, error: error.message || "Gagal menyimpan testimoni." };
  }
}

export async function deleteTestimonial(id: string) {
  await checkAuth();

  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Gagal delete testimonial:", error);
    return { success: false, error: error.message || "Gagal menghapus testimoni." };
  }
}

export async function reorderTestimonials(items: { id: string; sortOrder: number }[]) {
  await checkAuth();

  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.testimonial.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        })
      )
    );
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Gagal mengurutkan testimoni:", error);
    return { success: false, error: error.message || "Gagal menyimpan urutan." };
  }
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export async function upsertFaq(data: {
  id?: string;
  question: string;
  answer: string;
  sortOrder: number;
}) {
  await checkAuth();

  try {
    let result;
    if (data.id) {
      result = await prisma.faq.update({
        where: { id: data.id },
        data: {
          question: data.question,
          answer: data.answer,
          sortOrder: data.sortOrder,
        },
      });
    } else {
      result = await prisma.faq.create({
        data: {
          question: data.question,
          answer: data.answer,
          sortOrder: data.sortOrder,
        },
      });
    }

    revalidatePath("/");
    revalidatePath("/faq");
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Gagal upsert faq:", error);
    return { success: false, error: error.message || "Gagal menyimpan FAQ." };
  }
}

export async function deleteFaq(id: string) {
  await checkAuth();

  try {
    await prisma.faq.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/faq");
    return { success: true };
  } catch (error: any) {
    console.error("Gagal delete faq:", error);
    return { success: false, error: error.message || "Gagal menghapus FAQ." };
  }
}

export async function reorderFaqs(items: { id: string; sortOrder: number }[]) {
  await checkAuth();

  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.faq.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        })
      )
    );
    revalidatePath("/");
    revalidatePath("/faq");
    return { success: true };
  } catch (error: any) {
    console.error("Gagal mengurutkan FAQ:", error);
    return { success: false, error: error.message || "Gagal menyimpan urutan." };
  }
}
