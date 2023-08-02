import type { MaybePromise } from "./utils.ts";

export type KeyPoolSelector = (
  keys: string[],
) => MaybePromise<string | null | undefined>;

export type KeyPoolKeys = () => MaybePromise<string[]>;

export function makeKeyGetter(keys: KeyPoolKeys, selector: KeyPoolSelector) {
  return async () => await selector(await keys()) ?? null;
}
