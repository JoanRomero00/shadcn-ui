import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "../symfony-api-base/openapi/openapi.json",
  output: "lib/api/generated",
  plugins: [
    "@hey-api/client-fetch",
    "@hey-api/typescript",
    "@hey-api/sdk",
  ],
});
