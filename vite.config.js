import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { execSync } from "child_process";

const environment = process.env.ICP_ENVIRONMENT || "local";
const CANISTER_NAMES = ["vetawallet"];

function getCanisterId(name) {
  try {
    return execSync(`icp canister status ${name} -e ${environment} -i`, {
      encoding: "utf-8",
      stdio: "pipe",
    }).trim();
  } catch {
    return "";
  }
}

function getDevServerConfig() {
  try {
    const networkStatus = JSON.parse(
      execSync(`icp network status -e ${environment} --json`, {
        encoding: "utf-8",
      }),
    );
    const canisterParams = CANISTER_NAMES
      .filter((name) => getCanisterId(name))
      .map((name) => `PUBLIC_CANISTER_ID:${name}=${getCanisterId(name)}`)
      .join("&");

    return {
      headers: {
        "Set-Cookie": `ic_env=${encodeURIComponent(
          `${canisterParams}&ic_root_key=${networkStatus.root_key}`,
        )}; SameSite=Lax;`,
      },
      proxy: {
        "/api": {
          target: networkStatus.api_url,
          changeOrigin: true,
        },
      },
    };
  } catch {
    return {
      proxy: {
        "/api": {
          target: "http://localhost:8000",
          changeOrigin: true,
        },
      },
    };
  }
}

export default defineConfig(({ command }) => ({
  plugins: [react()],
  root: "src/veta_assets",
  publicDir: resolve("src/veta_assets/assets"),
  build: {
    outDir: resolve("dist/veta_assets"),
    emptyOutDir: true,
  },
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      "@": resolve("src/veta_assets/src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  server: {
    port: 3001,
    ...(command === "serve" ? getDevServerConfig() : {}),
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    css: true,
  },
}));
