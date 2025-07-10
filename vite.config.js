import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/cospa-productivo/", // 👈 usa el nombre exacto de tu repo
});
