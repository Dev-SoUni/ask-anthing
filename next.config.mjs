/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // TODO: 추후에 필요가 없어진다면 삭제해주세요.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
}

export default nextConfig
