import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        includeAssets: ['icon-192x192.png', 'icon-512x512.png'],
        manifest: {
            name: 'Emage',
            short_name: 'Emage',
            description: 'AI image genearation app',
            theme_color: '#000',
            icons: [{
                    src: 'icon-192x192',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: 'icon-512x512',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ],
            // start_url: '/'
        }
    })],
    define: {
        global: "globalThis",
        "process.env": {},
    },
});