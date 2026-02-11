const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "drive.google.com",
      "lh3.googleusercontent.com",
      "public.blob.vercel-storage.com",
    ],
  },

  turbopack: {},
  reactCompiler: true,
};

module.exports = withPWA(nextConfig);
