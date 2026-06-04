/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "66.media.tumblr.com",
      },
    ],
  },
};

export default nextConfig;
