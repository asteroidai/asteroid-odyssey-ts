import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '../agents/server/api/openapi.yaml',
  output: 'src/generated/agents',
  plugins: ['@hey-api/client-fetch'],
});
