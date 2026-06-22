"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email atau password admin salah.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-mist px-4 py-12 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-pine-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-citrus-200/30 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-paper border border-line rounded-2xl shadow-xl p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pine-600 text-white font-display font-bold text-xl mb-3 shadow-md shadow-pine-600/10">
            ✓
          </div>
          <h1 className="font-display text-2xl font-bold text-ink">Admin Bersih Jaya</h1>
          <p className="mt-2 text-sm text-ink/65">Silakan masuk ke panel manajemen konten</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 flex gap-2 items-start animate-shake">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-ink/80 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink placeholder-ink/40 focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all duration-150 text-base"
              placeholder="admin@bersihjaya.id"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-sm font-semibold text-ink/80">
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink placeholder-ink/40 focus:border-pine-650 focus:ring-1 focus:ring-pine-650 outline-none transition-all duration-150 text-base"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-xl bg-pine-600 hover:bg-pine-700 text-white font-display font-semibold py-4 px-6 min-h-[3.25rem] transition-colors focus:ring-2 focus:ring-pine-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-pine-650/10 text-base"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Memproses...
              </span>
            ) : (
              "Masuk ke Dashboard"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
