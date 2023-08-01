import { KeyPool, makeLRUSelector } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";

Deno.test("KeyPool", () => {
  const keyPool = new KeyPool(["a", "b", "c"], makeLRUSelector());

  assertEquals(keyPool.select(), "a");
  assertEquals(keyPool.select(), "b");
  assertEquals(keyPool.select(), "c");
  assertEquals(keyPool.select(), "a");

  keyPool.setKeys(["a", "b", "c", "d"]);

  assertEquals(keyPool.select(), "d");
  assertEquals(keyPool.select(), "b");
});
