# Kool

Minimalistic **K**ey P**ool** Implementation with Utilities for Deno

## Usage

```typescript
import { callable, makeLRUSelector, makeSyncKeyGetter, store } from "https://deno.land/x/kool/mod.ts";
import { assertEquals } from "https://deno.land/std@0.196.0/assert/assert_equals.ts";

const keys = callable(store(["a", "b", "c"]));

const getKey = makeSyncKeyGetter(keys, makeLRUSelector());

assertEquals(getKey(), "a");
assertEquals(getKey(), "b");
assertEquals(getKey(), "c");
assertEquals(getKey(), "a");

keys.set([...keys(), "d"]);

assertEquals(getKey(), "d");
assertEquals(getKey(), "b");
```

For more, check the [example](./example.ts).
