import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root; a stray package-lock.json in ~/ was being picked up.
  turbopack: { root: __dirname },
};

export default nextConfig;
