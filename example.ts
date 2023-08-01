import { makeLRUSelector, newKeyPool } from "./mod.ts";

const kv = await Deno.openKv();
const key = ["foo", "bar"];

await kv.atomic()
  .check({ key, versionstamp: null })
  .set(key, ["a", "b", "c"])
  .commit();

const keyPool = await newKeyPool({
  async source() {
    const { value: keys } = await kv.get<string[]>(key);
    return keys!;
  },
  selector: makeLRUSelector(),
});

Deno.serve(async (req) => {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { pathname } = new URL(req.url);

  switch (pathname) {
    case "/":
      return new Response(keyPool.select());
    case "/new": {
      const { value: keys } = await kv.get<string[]>(key);

      const randomHex = Math.random().toString(16).slice(2);
      const newKeys = [...keys!, randomHex];

      await kv.set(key, newKeys);
      keyPool.setKeys(newKeys);

      return new Response(randomHex);
    }
    default:
      return new Response("Not Found", { status: 404 });
  }
});