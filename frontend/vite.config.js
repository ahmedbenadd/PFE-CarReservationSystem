import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: true, // Allow connections from all hosts
        allowedHosts: [
            '008a-196-115-212-76.ngrok-free.app',
            'grumpy-swans-brake.loca.lt'// Wildcard for all ngrok subdomains
        ],
        watch: {
            usePolling: true,
        },
    },
});