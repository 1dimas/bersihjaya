import { auth } from "@/lib/auth";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Jika tidak ada session (misal di halaman login), render halaman biasa saja tanpa sidebar admin
  if (!session) {
    return <>{children}</>;
  }

  return (
    <AdminLayoutClient session={session}>
      {children}
    </AdminLayoutClient>
  );
}
