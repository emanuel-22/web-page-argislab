import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    ssr: true,
    outDir: './dist',
  },
  plugins: [
    tsconfigPaths(),
    ...VitePluginNode({
      adapter: 'nest',
      appPath: './src/main.ts',
      tsCompiler: 'swc',
      outputFormat: 'esm',
      swcOptions: {
        minify: false,
      },
    }),
  ],
  server: {
    watch: {
      usePolling: true,
      cwd: './src',
    },
  },
});
