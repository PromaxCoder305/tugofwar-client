import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ensure Vite binds to all interfaces
    port: 5173, // Or any other port you're using
    strictPort: true, // Ensures the port does not change
    allowedHosts: ['tugofwar-client.onrender.com'], // Allow the Render frontend URL
  },
});
