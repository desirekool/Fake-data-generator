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
import { DateTimeProvider } from "./provider/date-time";
import { getLocale } from "./dictionary";
import { en_US } from "./dictionary/locales/en_US";
import { SeedType, FakerConfig, DEFAULT_LOCALE } from "./typing";

export class Faker {
  _generator: Generator;
  _locale: string;
  _initialized: boolean;

  constructor(locale: string | FakerConfig = DEFAULT_LOCALE) {
    this._generator = new Generator();
    this._initialized = false;
    
    // Initialize synchronously for backward compatibility
    const _locale = typeof locale === "string" ? locale.replace("-", "_") : DEFAULT_LOCALE;
    this._locale = _locale;
    
    // Seed the generator
    if (Generator._isSeeded) {
      this._generator.seedInstance(Generator._globalSeed);
    } else {
      this._generator.seedInstance();
    }
    
    // Set locale data on the generator so providers can access via this.data
    this._generator.localeData = en_US;
    this._generator.locale = this._locale;

    // Copy the generator's prototype methods to the instance as own properties
    // so that providers can access them as own properties (e.g., this.generator.numerify)
    const generatorProto = Object.getPrototypeOf(this._generator);
    const propNames = Object.getOwnPropertyNames(generatorProto);
    for (const name of propNames) {
      if (name === "constructor" || name.startsWith("_")) continue;
      const descriptor = Object.getOwnPropertyDescriptor(generatorProto, name);
      if (descriptor) {
        Object.defineProperty(this._generator, name, descriptor);
      }
    }
    
    // Initialize providers with default locale data
    const providers = [
      new PersonProvider(this._generator, en_US),
      new InternetProvider(this._generator, en_US),
      new AddressProvider(this._generator, en_US),
      new CompanyProvider(this._generator, en_US),
      new LoremProvider(this._generator, en_US),
      new BankProvider(this._generator, en_US),
      new PhoneNumberProvider(this._generator, en_US),
      new ColorProvider(this._generator, en_US),
      new MiscProvider(this._generator),
      new CreditCardProvider(this._generator, en_US),
      new BarcodeProvider(this._generator),
      new CurrencyProvider(this._generator, en_US),
      new AutomotiveProvider(this._generator, en_US),
      new FileProvider(this._generator),
      new GeoProvider(this._generator, en_US),
      new JobProvider(this._generator, en_US),
      new IsbnProvider(this._generator),
      new SbnProvider(this._generator),
      new SsnProvider(this._generator, en_US),
      new PassportProvider(this._generator, en_US),
      new ProfileProvider(this._generator, en_US),
      new PythonProvider(this._generator),
      new DoiProvider(this._generator),
      new EmojiProvider(this._generator),
      new UserAgentProvider(this._generator, en_US),
      new DateTimeProvider(this._generator, en_US),
    ];

    for (const provider of providers) {
      this._generator.addProvider(provider);
      // Store provider instance on Faker for property access (e.g., faker.person)
      (this as any)[provider.__provider__] = provider;
    }
    
    // Copy provider methods from generator to Faker instance for direct access
    // (e.g., faker.name() instead of faker.person.name())
    // Note: Methods are added directly to the generator instance in addProvider, not its prototype
    const propNameList = Object.getOwnPropertyNames(this._generator);
    for (const name of propNameList) {
        // Skip constructor and private methods
        if (name === "constructor" || name.startsWith("_")) continue;
        const method = (this._generator as unknown as Record<string, unknown>)[name];
        if (typeof method === "function") {
            // Bind the method to the generator instance so it works correctly
            (this as unknown as Record<string, unknown>)[name] = method.bind(this._generator);
        }
    }
    
    this._initialized = true;
  }

  // Async initialization method
  async initialize(locale: string | FakerConfig = DEFAULT_LOCALE): Promise<void> {
    let _locale = typeof locale === "string" ? locale.replace("-", "_") : DEFAULT_LOCALE;
    // Normalize 2-letter codes (e.g., "fr" -> "fr_FR", "de" -> "de_DE")
    if (_locale.length === 2) {
      _locale = _locale === "en" ? "en_US"
        : _locale === "fr" ? "fr_FR"
        : _locale === "ar" ? "ar_DZ"
        : `${_locale}_${_locale.toUpperCase()}`;
    }
    const localeData = await getLocale(_locale);
    this._locale = _locale;
    this._generator.locale = this._locale;
    
    // Update all providers with the new locale data
    const personProvider = this._generator.getProvider("person") as PersonProvider;
    const internetProvider = this._generator.getProvider("internet") as InternetProvider;
    const addressProvider = this._generator.getProvider("address") as AddressProvider;
    const companyProvider = this._generator.getProvider("company") as CompanyProvider;
    const loremProvider = this._generator.getProvider("lorem") as LoremProvider;
    const bankProvider = this._generator.getProvider("bank") as BankProvider;
    const phoneProvider = this._generator.getProvider("phone_number") as PhoneNumberProvider;
    const colorProvider = this._generator.getProvider("color") as ColorProvider;
    const creditCardProvider = this._generator.getProvider("credit_card") as CreditCardProvider;
    const barcodeProvider = this._generator.getProvider("barcode") as BarcodeProvider;
    const currencyProvider = this._generator.getProvider("currency") as CurrencyProvider;
    const automotiveProvider = this._generator.getProvider("automotive") as AutomotiveProvider;
    const jobProvider = this._generator.getProvider("job") as JobProvider;
    const ssnProvider = this._generator.getProvider("ssn") as SsnProvider;
    const passportProvider = this._generator.getProvider("passport") as PassportProvider;
    const profileProvider = this._generator.getProvider("profile") as ProfileProvider;
    const userAgentProvider = this._generator.getProvider("user_agent") as UserAgentProvider;
    const dateTimeProvider = this._generator.getProvider("date-time") as DateTimeProvider;
    const geoProvider = this._generator.getProvider("geo") as GeoProvider;
    
    if (personProvider) (personProvider as any).data = localeData;
    if (internetProvider) (internetProvider as any).data = localeData;
    if (addressProvider) (addressProvider as any).data = localeData;
    if (companyProvider) (companyProvider as any).data = localeData;
    if (bankProvider) (bankProvider as any).data = localeData;
    if (creditCardProvider) (creditCardProvider as any).data = localeData;
    if (jobProvider) (jobProvider as any).data = localeData;
    if (profileProvider) (profileProvider as any).data = localeData;
    if (userAgentProvider) (userAgentProvider as any).data = localeData;
    if (loremProvider) (loremProvider as any).data = localeData;
    if (ssnProvider) (ssnProvider as any).data = localeData;
    if (passportProvider) (passportProvider as any).data = localeData;
    if (phoneProvider) (phoneProvider as any).data = localeData;
    if (automotiveProvider) (automotiveProvider as any).data = localeData;
    if (dateTimeProvider) (dateTimeProvider as any).data = localeData;
    if (geoProvider) (geoProvider as any).data = localeData;
    if (colorProvider) (colorProvider as any).data = localeData;
    if (currencyProvider) (currencyProvider as any).data = localeData;
  }

  static seed(seed?: SeedType): void {
    Generator.seed(seed);
  }

  static async create(locale: string | FakerConfig = DEFAULT_LOCALE): Promise<Faker> {
    const faker = new Faker(locale);
    await faker.initialize(locale);
    return faker;
  }

  seedInstance(seed?: SeedType): void {
    this._generator.seedInstance(seed);
  }

  get locale(): string {
    return this._locale;
  }
}

const handler: ProxyHandler<Faker> = {
  get(target, prop: string) {
    if (prop in target) {
      const value = (target as unknown as Record<string, unknown>)[prop];
      if (typeof value === "function") return value;
      return value;
    }
    // Delegate to generator methods/properties - don't rebind as they're already bound
    return (target._generator as unknown as Record<string, unknown>)[prop];
  },
};

// Create the proxy instance
const fakerProxy = new Faker();
export const faker = new Proxy(fakerProxy, handler);

// Also export the proxy for direct access if needed
export { fakerProxy };

export { Generator, BaseProvider };