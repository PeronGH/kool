import { callable, makeKeyGetter, makeLRUSelector, store } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";

Deno.test("GetKey", async () => {
  const keys = callable(store(["a", "b", "c"]));

  const getKey = makeKeyGetter(keys, makeLRUSelector());

  assertEquals(await getKey(), "a");
  assertEquals(await getKey(), "b");
  assertEquals(await getKey(), "c");
  assertEquals(await getKey(), "a");

  keys.set([...await keys(), "d"]);

  assertEquals(await getKey(), "d");
  assertEquals(await getKey(), "b");
});
