/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    // Ganti/lengkapi domain ini kalau nanti foto diambil dari CDN/eksternal.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
