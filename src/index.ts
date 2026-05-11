import { Generator, BaseProvider } from "./generator";
import { PersonProvider } from "./providers/person";
import { InternetProvider } from "./providers/internet";
import { AddressProvider } from "./providers/address";
import { CompanyProvider } from "./providers/company";
import { LoremProvider } from "./providers/lorem";
import { BankProvider } from "./providers/bank";
import { PhoneNumberProvider } from "./providers/phone-number";
import { ColorProvider } from "./providers/color";
import { MiscProvider } from "./providers/misc";
import { CreditCardProvider } from "./providers/credit-card";
import { BarcodeProvider } from "./providers/barcode";
import { CurrencyProvider } from "./providers/currency";
import { AutomotiveProvider } from "./providers/automotive";
import { FileProvider } from "./providers/file";
import { GeoProvider } from "./providers/geo";
import { JobProvider } from "./providers/job";
import { IsbnProvider } from "./providers/isbn";
import { SbnProvider } from "./providers/sbn";
import { SsnProvider } from "./providers/ssn";
import { PassportProvider } from "./providers/passport";
import { ProfileProvider } from "./providers/profile";
import { PythonProvider } from "./providers/python";
import { DoiProvider } from "./providers/doi";
import { EmojiProvider } from "./providers/emoji";
import { UserAgentProvider } from "./providers/user-agent";
import { getLocale } from "./dictionary";
import { SeedType, FakerConfig, DEFAULT_LOCALE } from "./typing";

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
    },
  };
  return new Proxy({ _generator: generator, _locale: locale } as Faker, handler);
}

export class Faker {
  _generator: Generator;
  _locale: string;

  constructor(locale: string | FakerConfig = DEFAULT_LOCALE) {
    const _locale = typeof locale === "string" ? locale.replace("-", "_") : DEFAULT_LOCALE;
    const localeData = getLocale(_locale);

    this._generator = new Generator();
    if (Generator._isSeeded) {
      this._generator.seedInstance(Generator._globalSeed);
    } else {
      this._generator.seedInstance();
    }
    this._locale = _locale;

    const providers = [
      new PersonProvider(this._generator, localeData),
      new InternetProvider(this._generator, localeData),
      new AddressProvider(this._generator, localeData),
      new CompanyProvider(this._generator, localeData),
      new LoremProvider(this._generator, localeData),
      new BankProvider(this._generator, localeData),
      new PhoneNumberProvider(this._generator, localeData),
      new ColorProvider(this._generator, localeData),
      new MiscProvider(this._generator),
      new CreditCardProvider(this._generator, localeData),
      new BarcodeProvider(this._generator, localeData),
      new CurrencyProvider(this._generator, localeData),
      new AutomotiveProvider(this._generator, localeData),
      new FileProvider(this._generator),
      new GeoProvider(this._generator),
      new JobProvider(this._generator, localeData),
      new IsbnProvider(this._generator),
      new SbnProvider(this._generator),
      new SsnProvider(this._generator, localeData),
      new PassportProvider(this._generator, localeData),
      new ProfileProvider(this._generator, localeData),
      new PythonProvider(this._generator),
      new DoiProvider(this._generator),
      new EmojiProvider(this._generator),
      new UserAgentProvider(this._generator, localeData),
    ];

    for (const provider of providers) {
      this._generator.addProvider(provider);
    }

    const handler: ProxyHandler<Faker> = {
      get(target, prop: string) {
        if (prop in target) {
          const value = (target as unknown as Record<string, unknown>)[prop];
          if (typeof value === "function") return value.bind(target);
          return value;
        }
        const value = (target._generator as unknown as Record<string, unknown>)[prop];
        if (typeof value === "function") return value.bind(target._generator);
        return value;
      },
    };
    return new Proxy(this, handler);
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

export const fake = new Faker();

export { Generator, BaseProvider };