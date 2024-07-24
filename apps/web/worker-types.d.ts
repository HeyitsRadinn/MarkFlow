declare module "@cloudflare/workers-types" {
  interface D1Database {
    // Add any D1Database methods you'll use
    prepare(query: string): D1PreparedStatement;
    // ... other methods
  }

  interface D1PreparedStatement {
    // Add any D1PreparedStatement methods you'll use
    bind(...values: any[]): D1PreparedStatement;
    first<T = any>(column?: string): Promise<T | null>;
    run<T = any>(): Promise<D1Result<T>>;
    // ... other methods
  }

  interface D1Result<T = unknown> {
    // Add any D1Result properties you'll use
    results?: T[];
    success: boolean;
    // ... other properties
  }
}
