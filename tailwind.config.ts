import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Token warna brand "Bersih Jaya" — lihat README.md bagian Desain.
        paper: "#FAFAF7", // latar utama, putih hangat, lebih nyaman di mata daripada putih murni
        ink: "#182523", // teks utama, hitam kehijauan, kontras tinggi (mudah dibaca segala usia)
        pine: {
          50: "#EAF2EE",
          100: "#D2E4DC",
          400: "#2D8270",
          500: "#1A6F5F",
          600: "#145C50", // warna brand utama
          700: "#0E463D",
        },
        mist: "#EAF2EE", // latar section selang-seling
        citrus: {
          400: "#F0B85C",
          500: "#E8A23A", // aksen CTA / sorot harga
          600: "#C8842A",
        },
        line: "#D8E4DF", // garis pembatas / border halus
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        tickIn: {
          "0%": { opacity: "0", transform: "translateX(-6px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        checkDraw: {
          "0%": { strokeDashoffset: "24" },
          "100%": { strokeDashoffset: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        tickIn: "tickIn 0.45s ease-out forwards",
        checkDraw: "checkDraw 0.4s ease-out forwards",
        fadeUp: "fadeUp 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
