/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [80, 160, 320, 640, 800],
    imageSizes: [80, 160, 320],
  },
}

module.exports = nextConfig 