/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: [
      "store.storeimages.cdn-apple.com",
      "images.samsung.com",
      "img-prod-cms-rt-microsoft-com.akamaized.net",
      "cafebiz.cafebizcdn.vn",
      "i0.wp.com/www.mobileworldlive.com",
      "www.zdnet.com",
      "ybpsohhfffcqexnuazos.supabase.co",
      "png.pngtree.com",
      "img.freepik.com",
    ],
  },
};

module.exports = nextConfig;
