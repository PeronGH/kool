import { makeLRUSelector, newKeyPool } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";

Deno.test("KeyPool", async () => {
  const keyPool = await newKeyPool({
    source: () => ["a", "b", "c"],
    selector: makeLRUSelector(),
  });

  assertEquals(keyPool.select(), "a");
  assertEquals(keyPool.select(), "b");
  assertEquals(keyPool.select(), "c");
  assertEquals(keyPool.select(), "a");

  keyPool.setKeys(["a", "b", "c", "d"]);

  assertEquals(keyPool.select(), "d");
  assertEquals(keyPool.select(), "b");
});
