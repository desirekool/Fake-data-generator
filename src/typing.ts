export type SeedType = string | number | bigint | Uint8Array | Array<unknown>;

export interface FakerConfig {
  locale?: string | string[] | Record<string, number>;
  providers?: string[];
  includes?: string[];
  useWeighting?: boolean;
  [key: string]: unknown;
}

export const DEFAULT_LOCALE = "en_US";