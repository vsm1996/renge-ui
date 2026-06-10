import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@renge-ui/tokens", "@renge-ui/react"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
