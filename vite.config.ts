import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src')
    }
  },
  test: {
    globals: true,
    environment: "happy-dom",
    include: ["**/*.{test,spec}.{js,ts,jsx,tsx}"],
    exclude: ["node_modules", "dist", ".git", ".idea", ".vscode"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/components/**/*", "src/store/**/*", "src/utils/**/*"],
      exclude: ["**/*.test.ts", "**/*.spec.ts"]
    }
  },
});
