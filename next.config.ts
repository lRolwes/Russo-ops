import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Legacy Webflow URLs -> new pages go here once the old site is crawled (permanent: true = 301).
  async redirects() {
    return [];
  },
};

export default nextConfig;
