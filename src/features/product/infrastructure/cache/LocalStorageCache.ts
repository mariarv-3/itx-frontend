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
      return null;
    }
  }


  set<T>(
    key: string,
    data: T
  ): void {
    try {
      const item: CacheItem<T> = {
        timestamp: Date.now(),
        data,
      };

      localStorage.setItem(
        key,
        JSON.stringify(item)
      );

    } catch {
      // Cache failures should not break the application.
    }
  }


  private isExpired(
    timestamp: number
  ): boolean {
    return (
      Date.now() - timestamp >= this.expirationTime
    );
  }
}