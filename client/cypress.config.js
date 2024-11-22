import { defineConfig } from "cypress";

const is_prod = process.env.NODE_ENV === "production";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: is_prod ? "http://localhost:3333" : "http://localhost:5173",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
