import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        include: ['tests/**/*.test.ts'],
        env: {
            FORCE_COLOR: "true"
        }
    },
    resolve: {
        alias: {
            "@": join(dirname(fileURLToPath(import.meta.url)), "src")
        }
    }
});
