#!/usr/bin/env node

process.env.DEPLOY_TARGET = "gh-pages";
process.env.NEXT_PUBLIC_BASE_PATH = "/wedding_invite_one";

const { spawnSync } = require("child_process");

console.log("=== Building for GitHub Pages (basePath: /wedding_invite_one) ===");

const result = spawnSync("node", ["./node_modules/next/dist/bin/next", "build"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    DEPLOY_TARGET: "gh-pages",
    NEXT_PUBLIC_BASE_PATH: "/wedding_invite_one"
  }
});

process.exit(result.status || 0);
