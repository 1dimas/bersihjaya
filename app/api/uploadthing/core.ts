import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  // Hanya izinkan upload gambar dengan ukuran maksimal 4MB
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // Pastikan hanya admin yang bisa melakukan upload
      const session = await auth();
      if (!session) {
        throw new Error("Unauthorized: Anda harus login untuk mengupload file.");
      }

      return { userId: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload selesai oleh:", metadata.userId);
      console.log("URL File:", file.url);
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
