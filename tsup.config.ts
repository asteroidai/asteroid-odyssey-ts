import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  minify: true,
  sourcemap: false,
  target: 'es2022',
  outDir: 'dist',
  treeshake: true,
  splitting: false,
  platform: 'node',
});
