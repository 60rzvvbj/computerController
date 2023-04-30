export interface Subscription {
  unsubscribe: () => void;
}

export class Subject<T> {
  private map = new Map<Symbol, (value: T) => void>();
  next(value: T): void {
    const map = this.map;
    map.forEach((f) => {
      f(value);
    });
  }
  subscribe(f: (value: T) => void): Subscription {
    const map = this.map;
    const key = Symbol();
    map.set(key, f);

    return {
      unsubscribe: () => {
        map.delete(key);
      },
    };
  }
}
