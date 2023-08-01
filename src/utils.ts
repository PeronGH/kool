import { KeyPool } from "./core.ts";

export type MaybePromise<T> = T | Promise<T>;

export function unreachable(): never {
  throw new Error("unreachable code");
}

export const newKeyPool = KeyPool.new;
