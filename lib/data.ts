import { prisma } from "./prisma";

// ─── Data Access Functions ───────────────────────────────
// Semua fungsi ini dipanggil di Server Components (page.tsx)
// untuk fetch data dari database.

export async function getBusiness() {
  const biz = await prisma.business.findUnique({ where: { id: "main" } });
  if (!biz) throw new Error("Business config not found in database. Run `npx prisma db seed` first.");
  return biz;
}

export async function getHeroConfig() {
  const hero = await prisma.heroConfig.findUnique({ where: { id: "main" } });
  if (!hero) throw new Error("Hero config not found in database. Run `npx prisma db seed` first.");
  return hero;
}

export async function getValueProps() {
  return prisma.valueProp.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getServices() {
  return prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({ where: { slug } });
}

export async function getBookingSteps() {
  return prisma.bookingStep.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getFaqs() {
  return prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });
}
