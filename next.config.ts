import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old Webflow URLs -> closest new page (permanent: true = 301). Keep these indefinitely.
  async redirects() {
    return [
      ["/find-position", "/jobs"],
      ["/job-listings/:slug*", "/jobs"],
      ["/services/talent-acquisition", "/employers/staffing-recruiting"],
      ["/services/veteran-success-initiative", "/employers/veteran-workforce-skillbridge"],
      ["/services/operational-consulting", "/employers/workforce-advisory"],
      ["/industries/energy", "/industries/energy-utilities"],
      ["/industries/logistics", "/industries/logistics-operations"],
      ["/industries/operations", "/industries/logistics-operations"],
      ["/industries/tech", "/industries/technology-cleared-programs"],
      ["/web-design-agency", "/"],
    ].map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
