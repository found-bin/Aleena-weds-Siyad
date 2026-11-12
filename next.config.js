const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  // Determine deployment target:
  // 1. Explicit env override: NEXT_PUBLIC_BASE_PATH
  // 2. Vercel deployment: VERCEL=1 or VERCEL_ENV is set by Vercel environment
  // 3. GitHub Actions / GitHub Pages: GITHUB_ACTIONS=true, GITHUB_PAGES=true, or DEPLOY_TARGET=gh-pages
  const isVercel = Boolean(
    process.env.VERCEL === "1" ||
    process.env.VERCEL_ENV ||
    process.env.NOW_BUILDER
  );

  const isGitHubPages = Boolean(
    process.env.GITHUB_PAGES === "true" ||
    process.env.GITHUB_ACTIONS === "true" ||
    process.env.DEPLOY_TARGET === "gh-pages"
  );

  let basePath = "";
  if (process.env.NEXT_PUBLIC_BASE_PATH !== undefined) {
    basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  } else if (isVercel || isDev) {
    basePath = "";
  } else if (isGitHubPages) {
    basePath = "/wedding_invite_one";
  } else {
    // Default to root so standard production builds deploy at root (e.g. Vercel, Netlify, custom domains)
    basePath = "";
  }

  const config = {
    reactStrictMode: true,
    ...(isDev ? {} : { output: "export" }),
    env: {
      NEXT_PUBLIC_BASE_PATH: basePath
    },
    images: {
      unoptimized: true
    },
    webpack: (config, { dev }) => {
      if (dev) {
        config.cache = {
          type: "memory"
        };
      }
      return config;
    }
  };

  if (basePath) {
    config.basePath = basePath;
    config.assetPrefix = basePath;
  }

  return config;
};
