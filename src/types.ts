import type { MaybePromise } from "./utils.ts";

export type KeyPoolSelector = (
  keys: string[],
) => MaybePromise<string | null | undefined>;

export type KeyPoolKeys = () => MaybePromise<string[]>;

export type KeyPoolInitializer = {
  selector: KeyPoolSelector;
  keys: KeyPoolKeys;
};
