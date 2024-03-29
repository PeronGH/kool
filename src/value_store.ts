import type { MaybePromise } from "./utils.ts";

export type ValueStore<T> = {
  get(): MaybePromise<T>;
  set(value: T): MaybePromise<void>;
};

export interface ValueStoreSync<T> extends ValueStore<T> {
  get(): T;
  set(value: T): void;
}

export interface CachedValueStore<T> extends ValueStore<T> {
  expire(): void;
}

export type Callable<V> = V extends ValueStore<unknown> ? (V & (V["get"]))
  : never;

export function store<T>(value: T): ValueStoreSync<T> {
  return {
    get() {
      return value;
    },
    set(newValue) {
      value = newValue;
    },
  };
}

export function cached<T>({ get, set }: ValueStore<T>): CachedValueStore<T> {
  let value: T | null = null;

  return {
    async get() {
      if (value === null) {
        value = await get();
      }

      return value;
    },

    async set(newValue) {
      if (value === newValue) return;

      await set(newValue);
      value = newValue;
    },

    expire() {
      value = null;
    },
  };
}

export function callable<V extends ValueStore<unknown>>(store: V): Callable<V> {
  return Object.assign(() => store.get(), store) as Callable<V>;
}
