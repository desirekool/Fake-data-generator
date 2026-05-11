import { Generator, BaseProvider } from "./generator";
import { PersonProvider } from "./provider/person";
import { InternetProvider } from "./provider/internet";
import { AddressProvider } from "./provider/address";
import { CompanyProvider } from "./provider/company";
import { LoremProvider } from "./provider/lorem";
import { BankProvider } from "./provider/bank";
import { PhoneNumberProvider } from "./provider/phone-number";
import { ColorProvider } from "./provider/color";
import { MiscProvider } from "./provider/misc";
import { CreditCardProvider } from "./provider/credit-card";
import { BarcodeProvider } from "./provider/barcode";
import { CurrencyProvider } from "./provider/currency";
import { AutomotiveProvider } from "./provider/automotive";
import { FileProvider } from "./provider/file";
import { GeoProvider } from "./provider/geo";
import { JobProvider } from "./provider/job";
import { IsbnProvider } from "./provider/isbn";
import { SbnProvider } from "./provider/sbn";
import { SsnProvider } from "./provider/ssn";
import { PassportProvider } from "./provider/passport";
import { ProfileProvider } from "./provider/profile";
import { PythonProvider } from "./provider/python";
import { DoiProvider } from "./provider/doi";
import { EmojiProvider } from "./provider/emoji";
import { UserAgentProvider } from "./provider/user-agent";
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