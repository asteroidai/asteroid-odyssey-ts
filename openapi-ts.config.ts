import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '../agents/go/agents/api/sdk/openapi.yaml',
  output: 'src/generated/agents',
  plugins: ['@hey-api/client-fetch'],
});
