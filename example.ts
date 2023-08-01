import { cached, callable, KeyPool, makeLRUSelector } from "./mod.ts";

const kv = await Deno.openKv();
const key = ["foo", "bar"];

const keys = callable(cached({
  async get() {
    const result = await kv.get<string[]>(key);
    return result.value ?? [];
  },
  async set(value) {
    await kv.set(key, value);
  },
}));

const keyPool = new KeyPool({
  keys,
  selector: makeLRUSelector(),
});

Deno.serve(async (req) => {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { pathname } = new URL(req.url);

  switch (pathname) {
    case "/":
      return new Response(await keyPool.select());
    case "/new": {
      const randomHex = Math.random().toString(16).slice(2);
      const newKeys = [...await keys(), randomHex];
      await keys.set(newKeys);

      return new Response(randomHex);
    }
    default:
      return new Response("Not Found", { status: 404 });
  }
});
