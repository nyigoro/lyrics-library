/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/lyrics") {
      const data = await request.json();
      const { title, lyrics } = data;

      if (!title || !lyrics) {
        return new Response("Missing title or lyrics", { status: 400 });
      }

      await env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS lyrics (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          content TEXT
        );
      `).run();

      await env.DB.prepare(`
        INSERT INTO lyrics (title, content) VALUES (?, ?);
      `).bind(title, lyrics).run();

      return new Response("✅ Saved", { status: 200 });
    }

    if (request.method === "GET" && url.pathname === "/lyrics") {
      const { results } = await env.DB.prepare("SELECT * FROM lyrics").all();
      return Response.json(results);
    }

    return new Response("Not found", { status: 404 });
  },
};

