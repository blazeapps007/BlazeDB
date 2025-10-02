import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          ui: ['lucide-react'],
          charts: ['recharts'],
          radix: [
            '@radix-ui/react-tabs',
            '@radix-ui/react-dialog',
            '@radix-ui/react-popover',
            '@radix-ui/react-toggle-group'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
        passes: 3
      },
      mangle: {
        safari10: true
      }
    },
    target: 'es2020',
    cssCodeSplit: true,
    assetsInlineLimit: 8192,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'recharts'
    ],
    exclude: ['@vite/client', '@vite/env'],
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    drop: mode === 'production' ? ['console', 'debugger'] : []
  }
}));
