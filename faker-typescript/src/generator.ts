import { SeedType } from "./typing";

const _re_token = /\{{2}\s*(\w+)(:\s*\w+)?\s*\}{2}/g;

let _random = Math.random;

export class Generator {
  private static _isSeeded = false;
  static _globalSeed: SeedType | undefined;

  providers: BaseProvider[] = [];
  private _randomFn: () => number = _random;

  constructor() { }

  get random(): () => number {
    return this._randomFn;
  }

  set random(value: () => number) {
    this._randomFn = value;
  }

  seedInstance(seed?: SeedType): this {
    const rng = seed !== undefined ? this.mulberry32(seed) : Math.random;
    this._randomFn = rng;
    Generator._isSeeded = true;
    Generator._globalSeed = seed;
    return this;
  }

  static seed(seed?: SeedType): void {
    Generator._isSeeded = true;
    Generator._globalSeed = seed;
  }

  addProvider(provider: BaseProvider | (new (generator: Generator) => BaseProvider)): void {
    const instance: BaseProvider = typeof provider === "function"
      ? new (provider as new (g: Generator) => BaseProvider)(this)
      : provider;
    this.providers.unshift(instance);
    const proto = Object.getPrototypeOf(instance);
    for (const name of Object.getOwnPropertyNames(proto)) {
      if (name.startsWith("_")) continue;
      const method = (instance as unknown as Record<string, unknown>)[name];
      if (typeof method === "function") {
        (this as unknown as Record<string, unknown>)[name] = (method as (...args: unknown[]) => unknown).bind(instance);
      }
    }
  }

  parse(text: string): string {
    return text.replace(_re_token, (_, formatter) => {
      const fn = (this as unknown as Record<string, unknown>)[formatter];
      const fn = (this as any)[formatter];
      if (typeof fn === "function") {
        return String(fn.call(this));
        return String(fn());
      }
      return "";
    });
  }

  private mulberry32(seed: SeedType): () => number {
    let h = typeof seed === "string" ? this.stringHash(seed) : Number(seed) || 0;
    let h = 0;
    if (typeof seed === "string") h = this.stringHash(seed);
    else if (typeof seed === "bigint") h = Number(seed & 0xffffffffn);
    else h = Number(seed) || 0;

    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
    };
  }

  private stringHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }
}

export class BaseProvider {
  protected generator: Generator;

  constructor(generator: Generator) {
    this.generator = generator;
  }

  randomElement<T>(elements: T[] | Record<string, number>): T {
    const arr = Array.isArray(elements) ? elements : Object.keys(elements);
    return arr[Math.floor(this.generator.random() * arr.length)] as T;
  }

  randomElements<T>(elements: T[] | Record<string, number>, length = 1, unique = false): T[] {
    const arr = Array.isArray(elements) ? elements : Object.keys(elements) as T[];
    if (unique && length > arr.length) {
      throw new Error("Unique sample length cannot exceed population size");
    }
    if (unique) {
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(this.generator.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, length);
    }
    const result: T[] = [];
    for (let i = 0; i < length; i++) {
      result.push(arr[Math.floor(this.generator.random() * arr.length)]);
    }
    return result;
  }
}
