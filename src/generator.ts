import { SeedType } from "./typing";

const _re_token = /\{\{(\w+)(?::(\w+))?\}\}/g;
const _re_hash = /#/g;
const _re_perc = /%/g;
const _re_dol = /\$/g;
const _re_excl = /!/g;
const _re_at = /@/g;
const _re_qm = /\?/g;
const _re_cir = /\^/g;

let _random = Math.random;

export class Generator {
  static _isSeeded = false;
  static _globalSeed: SeedType | undefined;

  providers: BaseProvider[] = [];
  private _randomFn: () => number = _random;

  constructor() {
    if (Generator._isSeeded) {
      this._randomFn = this.mulberry32(Generator._globalSeed);
    }
  }

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
    // Propagate seed to all providers
    for (const provider of this.providers) {
      provider.generator._randomFn = rng;
    }
    return this;
  }

  static seed(seed?: SeedType): void {
    Generator._isSeeded = true;
    Generator._globalSeed = seed;
  }

  addProvider(provider: BaseProvider | (new (generator: Generator, data?: any) => BaseProvider)): void {
    const instance: BaseProvider =
      typeof provider === "function"
        ? new (provider as new (g: Generator) => BaseProvider)(this)
        : provider;
    this.providers.unshift(instance);
    const proto = Object.getPrototypeOf(instance);
    for (const name of Object.getOwnPropertyNames(proto)) {
      if (name.startsWith("_")) continue;
      const method = (instance as unknown as Record<string, unknown>)[name];
      if (typeof method === "function") {
        (this as unknown as Record<string, unknown>)[name] = (
          method as (...args: unknown[]) => unknown
        ).bind(instance);
      }
    }
  }

  parse(text: string): string {
    return text.replace(_re_token, (_, formatter) => {
      const fn = (this as any)[formatter];
      if (typeof fn === "function") {
        return String(fn.call(this));
      }
      return "";
    });
  }

  private mulberry32(seed: SeedType): () => number {
    let h: number;
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

  randomInt(min = 0, max = 9999, step = 1): number {
    if (step > 1) {
      const range = Math.floor((max - min) / step) + 1;
      return min + step * Math.floor(this._randomFn() * range);
    }
    return min + Math.floor(this._randomFn() * (max - min + 1));
  }
}

export class BaseProvider {
  protected generator: Generator;

  constructor(generator: Generator) {
    this.generator = generator;
  }

  randomElement<T>(elements: T[] | Record<string, number>): T {
    if (!Array.isArray(elements)) {
      // Weighted selection
      const keys = Object.keys(elements);
      const weights = Object.values(elements as Record<string, number>);
      const total = weights.reduce((a, b) => a + b, 0);
      let r = this.generator.random() * total;
      for (let i = 0; i < keys.length; i++) {
        r -= weights[i];
        if (r <= 0) return keys[i] as unknown as T;
      }
      return keys[keys.length - 1] as unknown as T;
    }
    return elements[Math.floor(this.generator.random() * elements.length)] as T;
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

  randomChoices<T>(elements: T[], length?: number): T[] {
    return this.randomElements(elements, length, false);
  }

  randomSample<T>(elements: T[], length?: number): T[] {
    return this.randomElements(elements, length, true);
  }

  randomInt(min = 0, max = 9999, step = 1): number {
    if (step > 1) {
      const range = Math.floor((max - min) / step) + 1;
      return min + step * Math.floor(this.generator.random() * range);
    }
    return min + Math.floor(this.generator.random() * (max - min + 1));
  }

  randomDigit(): number {
    return Math.floor(this.generator.random() * 10);
  }

  randomDigitNotNull(): number {
    return Math.floor(this.generator.random() * 9) + 1;
  }

  randomDigitAboveTwo(): number {
    return Math.floor(this.generator.random() * 8) + 2;
  }

  randomDigitOrEmpty(): number | string {
    return this.generator.random() < 0.5 ? this.randomDigit() : "";
  }

  randomDigitNotNullOrEmpty(): number | string {
    return this.generator.random() < 0.5 ? this.randomDigitNotNull() : "";
  }

  randomNumber(digits?: number, fixLen = false): number {
    if (digits === undefined) {
      digits = this.randomDigitNotNull();
    }
    if (digits < 0) {
      throw new Error("The digit parameter must be greater than or equal to 0.");
    }
    if (fixLen) {
      if (digits > 0) {
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        return this.generator.randomInt(min, max);
      }
      throw new Error("A number of fixed length cannot have less than 1 digit in it.");
    } else {
      return this.generator.randomInt(0, Math.pow(10, digits) - 1);
    }
  }

  randomLetter(): string {
    const code = Math.floor(this.generator.random() * 52);
    return String.fromCharCode(code < 26 ? 65 + code : 97 + code - 26);
  }

  randomLetters(length = 16): string[] {
    return this.randomChoices(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      length
    );
  }

  randomLowercaseLetter(): string {
    return String.fromCharCode(97 + Math.floor(this.generator.random() * 26));
  }

  randomUppercaseLetter(): string {
    return String.fromCharCode(65 + Math.floor(this.generator.random() * 26));
  }

  randomizeNbElements(number = 10, le = false, ge = false, min?: number, max?: number): number {
    if (le && ge) return number;
    const _min = ge ? 100 : 60;
    const _max = le ? 100 : 140;
    let nb = Math.floor((number * (this.generator.randomInt(_min, _max))) / 100);
    if (min !== undefined && nb < min) nb = min;
    if (max !== undefined && nb > max) nb = max;
    return nb;
  }

  numerify(text = "###"): string {
    text = text.replace(_re_hash, () => String(this.randomDigit()));
    text = text.replace(_re_perc, () => String(this.randomDigitNotNull()));
    text = text.replace(_re_dol, () => String(this.randomDigitAboveTwo()));
    text = text.replace(_re_excl, () => String(this.randomDigitOrEmpty()));
    text = text.replace(_re_at, () => String(this.randomDigitNotNullOrEmpty()));
    return text;
  }

  lexify(text = "????", letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"): string {
    return text.replace(_re_qm, () => this.randomElement(letters.split("")));
  }

  bothify(text = "## ??", letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"): string {
    return this.lexify(this.numerify(text), letters);
  }

  hexify(text = "^^^^", upper = false): string {
    const hex = upper ? "0123456789ABCDEF" : "0123456789abcdef";
    return text.replace(_re_cir, () => this.randomElement(hex.split("")));
  }

  locale(): string {
    return this.languageCode() + "_" + this.randomElement(
      (this.constructor as any).languageLocaleCodes?.[this.languageCode()] || ["US"]
    );
  }

  languageCode(): string {
    return this.randomElement(Object.keys((this.constructor as any).languageLocaleCodes || {}));
  }
}

// Static property on BaseProvider for locale codes
BaseProvider.languageLocaleCodes = {
  en: ["US", "GB", "AU", "CA", "NZ"],
  es: ["ES", "MX", "AR", "CO"],
  fr: ["FR", "CA", "CH"],
  de: ["DE", "AT", "CH"],
  ja: ["JP"],
  zh: ["CN", "TW", "HK"],
  ko: ["KR"],
};