import { Generator, BaseProvider } from "./generator";
import { PersonProvider } from "./providers/person";
import { InternetProvider } from "./providers/internet";
import { AddressProvider } from "./providers/address";
import { SeedType, FakerConfig } from "./typing";

const DEFAULT_LOCALE = "en_US";

function createFakerProxy(generator: Generator, locale: string): Faker {
  const handler: ProxyHandler<Faker> = {
    get(target, prop: string) {
      if (prop in target) {
        const value = (target as unknown as Record<string, unknown>)[prop];
        if (typeof value === "function") return value.bind(target);
        return value;
      }
      const value = (generator as unknown as Record<string, unknown>)[prop];
      if (typeof value === "function") return value.bind(generator);
      return value;
    }
  };
  return new Proxy({ _generator: generator, _locale: locale } as Faker, handler);
}

export class Faker {
  _generator: Generator;
  _locale: string;

  constructor(locale: string | FakerConfig = DEFAULT_LOCALE) {
    this._locale = typeof locale === "string" ? locale.replace("-", "_") : DEFAULT_LOCALE;
    this._generator = new Generator();
    this._generator.seedInstance();
    
    const providers = [
      new PersonProvider(this._generator),
      new InternetProvider(this._generator),
      new AddressProvider(this._generator),
    ];
    
    for (const provider of providers) {
      this._generator.addProvider(provider);
    }
  }

  static seed(seed?: SeedType): void {
    Generator.seed(seed);
  }

  seedInstance(seed?: SeedType): void {
    this._generator.seedInstance(seed);
  }

  get locale(): string {
    return this._locale;
  }
}

export const fake = createFakerProxy(new Faker()._generator, DEFAULT_LOCALE);

export { Generator, BaseProvider };
