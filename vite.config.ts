import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    // O 3D (three + react-three) vai num pedaço separado via React.lazy e só carrega quando a seção Sobre se aproxima
    chunkSizeWarningLimit: 1100,
  },
});
