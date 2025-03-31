/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },  
  experimental: {
    appDir: true, // Enables the new App Router
  },
};

export default nextConfig;
