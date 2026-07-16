interface CacheItem<T> {
  timestamp: number;
  data: T;
}

export class LocalStorageCache {

  constructor(
    private readonly expirationTime = 60 * 60 * 1000
  ) {}

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);

      if (!item) {
        return null;
      }

      const parsed: CacheItem<T> = JSON.parse(item);

      if (this.isExpired(parsed.timestamp)) {
        localStorage.removeItem(key);
        return null;
      }

      return parsed.data;

    } catch {
      // Invalid cache entries are ignored and treated as cache misses.
      return null;
    }
  }

  set<T>(key: string, data: T): void {
    const item: CacheItem<T> = {
      timestamp: Date.now(),
      data,
    };

    localStorage.setItem(
      key,
      JSON.stringify(item)
    );
  }

  private isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.expirationTime;
  }
}