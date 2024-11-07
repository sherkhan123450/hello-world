/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "plus.unsplash.com"],
  },
  async rewrites() {
    return [
      {
        source: "/socket.io/:path*",
        destination: "http://localhost:3000/socket.io/:path*",
      },
    ];
  },
};

export default nextConfig;
