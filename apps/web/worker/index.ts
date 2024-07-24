import type { D1Database } from "@cloudflare/workers-types";
import { Env, ExecutionContext } from "./types";

export default {
  async fetch(
    request: Request,
    env: Env & { DB: D1Database },
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api")) {
      // Handle API requests
      return handleApiRequest(request, env, ctx);
    }

    // Serve static assets for the Next.js app
    return env.ASSETS.fetch(request);
  },
};

async function handleApiRequest(
  request: Request,
  env: Env & { DB: D1Database },
  ctx: ExecutionContext
): Promise<Response> {
  // Implement API logic here
  return new Response("API not implemented yet", { status: 501 });
}
