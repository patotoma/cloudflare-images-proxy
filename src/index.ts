/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request: Request, env: {}, context: ExecutionContext): Promise<Response> {
    if (request.method === "GET") {
      let response = await serveAsset(request, env, context);
      if (response.status > 399) {
        response = new Response(response.statusText, { status: response.status });
      }
      return response;
    } else {
      return new Response("Method not allowed", { status: 405 });
    }
  },
};

async function serveAsset(request: Request, env: {}, context: ExecutionContext) {
  const url = new URL(request.url);
  const cache = caches.default;
  let response = await cache.match(request);

  if (!response) {
    response = await fetch(`https://imagedelivery.net${url.pathname}`, {
      headers: request.headers,
    });
    const headers = new Headers(response.headers);
    headers.set("cache-control", "public, max-age=31536000");
    headers.set("vary", "Accept");
    response = new Response(response.body, { ...response, headers });
    context.waitUntil(cache.put(request, response.clone()));
  }

  return response;
}
