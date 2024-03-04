/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "store.storeimages.cdn-apple.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.samsung.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img-prod-cms-rt-microsoft-com.akamaized.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cafebiz.cafebizcdn.vn",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
        pathname: "www.mobileworldlive.com/**",
      },
      {
        protocol: "https",
        hostname: "www.zdnet.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "ybpsohhfffcqexnuazos.supabase.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
