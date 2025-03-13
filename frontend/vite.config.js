import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: true, // Allow connections from all hosts
        allowedHosts: [
            '5ce3-196-118-75-53.ngrok-free.app', // Add your ngrok host here
        ],
        watch: {
            usePolling: true,
        },
    },
});