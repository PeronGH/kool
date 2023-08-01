import { KeyPool, makeLRUSelector } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";

Deno.test("KeyPool", async () => {
  const keys = ["a", "b", "c"];

  const keyPool = new KeyPool({
    keys: () => keys,
    selector: makeLRUSelector(),
  });

  assertEquals(await keyPool.select(), "a");
  assertEquals(await keyPool.select(), "b");
  assertEquals(await keyPool.select(), "c");
  assertEquals(await keyPool.select(), "a");

  keys.push("d");

  assertEquals(await keyPool.select(), "d");
  assertEquals(await keyPool.select(), "b");
});
