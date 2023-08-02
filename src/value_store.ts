import type { MaybePromise } from "./utils.ts";

export type ValueStore<T> = {
  get: () => MaybePromise<T>;
  set: (value: T) => MaybePromise<void>;
};

export type CallableValueStore<T> = ValueStore<T> & (() => MaybePromise<T>);

export function store<T>(value: T): ValueStore<T> {
  return {
    get() {
      return value;
    },
    set(newValue) {
      value = newValue;
    },
  };
}

export function cached<T>({ get, set }: ValueStore<T>): ValueStore<T> {
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

      value = newValue;
      await set(newValue);
    },
  };
}

export function callable<T>(store: ValueStore<T>): CallableValueStore<T> {
  return Object.assign(() => store.get(), store);
}
