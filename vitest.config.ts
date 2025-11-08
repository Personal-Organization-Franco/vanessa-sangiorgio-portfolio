import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: [
        "node_modules/",
        "**/*.config.{js,ts}",
        "**/dist/**",
        "**/.cache/**",
        "**/public/**",
        "**/__tests__/**",
      ],
    },
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      src: path.resolve(__dirname, "./src"),
    },
  },
});
