export type MaybePromise<T> = T | Promise<T>;

export function lazy<T>(fn: () => MaybePromise<T>): () => Promise<T> {
  let value: T | undefined;
  return async () => {
    if (value === undefined) {
      value = await fn();
    }
    return value;
  };
}
