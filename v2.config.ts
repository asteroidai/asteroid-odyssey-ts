import { defineConfig as openapiTsDefineConfig } from "@hey-api/openapi-ts";

export default openapiTsDefineConfig({
  input: "../agents/api/tsp-output/schema/openapi.Agents.External.v1.yaml",
  output: "src/generated/agents-v2",
  plugins: ["@hey-api/client-fetch"],
});
