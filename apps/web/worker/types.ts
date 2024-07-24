import { D1Database as CloudflareD1Database } from "@cloudflare/workers-types";

export interface Env {
  DB: CloudflareD1Database;
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}
