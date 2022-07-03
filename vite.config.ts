/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    coverage: ["cobertura", "html", "text"],
    /* for example, use global to avoid globals imports (describe, test, expect): */
  },
});
