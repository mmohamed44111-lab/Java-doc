import type { NextConfig } from "next";

// Static export for GitHub Pages.
// The site is served under https://<user>.github.io/Java-doc/
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? "/Java-doc" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
