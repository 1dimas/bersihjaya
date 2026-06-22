"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import {
  LayoutDashboard,
  Building2,
  Sparkles,
  Award,
  Briefcase,
  Milestone,
  MessageSquare,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  session: Session;
}

export default function AdminLayoutClient({ children, session }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/bisnis", label: "Info Bisnis", icon: Building2 },
    { href: "/admin/hero", label: "Hero Section", icon: Sparkles },
    { href: "/admin/value-props", label: "Keunggulan", icon: Award },
    { href: "/admin/layanan", label: "Layanan", icon: Briefcase },
    { href: "/admin/cara-pesan", label: "Cara Pesan", icon: Milestone },
    { href: "/admin/testimoni", label: "Testimoni", icon: MessageSquare },
    { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-paper border-r border-line">
      {/* Brand logo header */}
      <div className="flex h-20 items-center px-6 border-b border-line gap-2">
        <span aria-hidden="true" className="text-citrus-500 font-bold text-xl">✓</span>
        <span className="font-display font-bold text-lg text-ink">Admin Panel</span>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-pine-50 text-pine-700 font-semibold"
                  : "text-ink/75 hover:bg-mist hover:text-pine-600"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="border-t border-line p-4 bg-mist/50">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="h-9 w-9 rounded-full bg-pine-100 flex items-center justify-center text-pine-700 font-semibold font-mono text-sm">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink truncate">{session.user?.name || "Admin"}</p>
            <p className="text-xs text-ink/65 truncate">{session.user?.email || "admin@bersihjaya.id"}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-mist flex flex-col md:flex-row">
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:block w-64 shrink-0 sticky top-0 h-screen z-25">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex h-16 items-center justify-between px-6 bg-paper border-b border-line sticky top-0 z-30 shadow-sm">
        <Link href="/" className="font-display font-bold text-pine-600 flex items-center gap-1.5">
          <span aria-hidden="true" className="text-citrus-500 font-bold">✓</span>
          <span>Admin</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg border border-line hover:bg-mist text-ink transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/30 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Menu Drawer */}
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-paper shadow-2xl animate-slideRight">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Page Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
