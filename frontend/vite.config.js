import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    server: {
      proxy: mode === 'development' ? {
        '/api/v1': 'http://localhost:4000', // Assuming your local backend runs on port 5000
      } : {
        '/api/v1': 'https://ministore-backend.vercel.app'
      },
    },
    build: {
      outDir: 'dist'
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode)
    },
    plugins: [react()],
  };
});


