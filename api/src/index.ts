import { OpenAPIHono } from "npm:@hono/zod-openapi@0.16.0";
import { cors } from "npm:hono/cors";

import { testRoute } from "./routes/testRoute.ts";

const honoServer = new OpenAPIHono();

honoServer.use("*", cors());

honoServer.doc31("/openapi.json", {
  openapi: "3.1.0",
  info: { title: "API Docs", version: "0.0.1" },
});

const honoApi = honoServer.openapi(testRoute.route, testRoute.handler);

Deno.serve(
  {
    hostname: "0.0.0.0",
    port: 8000,
  },
  honoServer.fetch
);

export type AppType = typeof honoApi;
