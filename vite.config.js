import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/tv/", // <-- مهم جدا باش يخدم على المسار الفرعي
  plugins: [react()],
});
