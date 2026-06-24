import { defineConfig } from "vitest/config";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Resolves package resolution warning in some IDE environments
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Enable native tsconfig paths resolution in Vite 6 / Vitest 4
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    restoreMocks: true,
    clearMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
    // Limit Vitest to search only inside the src/ folder for unit/integration tests
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
