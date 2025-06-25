
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import path from 'path'
import process from 'node:process'; // Added import

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      electron([
        {
          // Main-Process entry file of the Electron App.
          entry: 'electron/main.ts',
          vite: {
            build: {
              outDir: 'dist-electron/main',
            },
          },
        },
        {
          entry: 'electron/preload.ts',
          onstart(options) {
            // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
            // instead of restarting the entire Electron App.
            options.reload()
          },
          vite: {
            build: {
              outDir: 'dist-electron/preload',
            },
          },
        }
      ]),
      renderer(),
    ],
    base: './', // Important for Electron to find assets correctly after packaging
    build: {
      outDir: 'dist', // Output directory for renderer process (React app)
    },
    server: {
      port: 3000, 
      // If you want to use the VITE_API_KEY directly in Vite config for some reason
      // (though it's better to use import.meta.env in your app code):
      // define: {
      //   'process.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY)
      // }
    },
    define: {
      // This makes VITE_API_KEY available in your renderer code via import.meta.env.VITE_API_KEY
      // Vite handles this automatically for `VITE_` prefixed vars, but explicit define can be used too.
      // 'import.meta.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY) 
    }
  }
})