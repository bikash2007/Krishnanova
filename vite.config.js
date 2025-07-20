import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Krishnanova/", // 👈 crucial for subdirectory deploys
});
