import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "img.clerk.com",
      //   pathname: "**",
      // },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

export default withNextIntl(nextConfig)
