import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@renge/tokens", "@renge/react"],
};

export default nextConfig;
