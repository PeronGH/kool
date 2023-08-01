import type { MaybePromise } from "./utils.ts";

export type KvStorage<T> = {
  get: () => MaybePromise<T>;
  set: (value: T) => MaybePromise<void>;
};

export function cached<T>({ get, set }: KvStorage<T>): KvStorage<T> {
  let value: T | null = null;

  return {
    async get() {
      if (value === null) {
        value = await get();
      }

      return value;
    },
    async set(newValue) {
      value = newValue;
      await set(newValue);
    },
  };
}
