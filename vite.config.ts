import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { QUALIFICACAO } from "./src/content";

export default defineConfig({
  plugins: [
    react(),
    {
      // Injeta a qualificação de src/content.ts no título e nas meta tags do index.html
      name: "qualificacao-no-html",
      transformIndexHtml: (html) => html.split("%QUALIFICACAO%").join(QUALIFICACAO),
    },
  ],
  build: {
    target: "es2020",
  },
});
