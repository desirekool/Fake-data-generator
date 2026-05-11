export interface LocaleData {
  // Person
  firstNames: string[];
  lastNames: string[];
  firstNamesMale?: string[];
  firstNamesFemale?: string[];
  lastNamesMale?: string[];
  lastNamesFemale?: string[];
  prefixes?: string[];
  prefixesMale?: string[];
  prefixesFemale?: string[];
  prefixesNonBinary?: string[];
  suffixes?: string[];
  suffixesMale?: string[];
  suffixesFemale?: string[];
  suffixesNonBinary?: string[];
  languageNames: string[];

  // Address
  cityPrefixes: string[];
  citySuffixes: string[];
  buildingNumberFormats: string[];
  streetSuffixes: string[];
  streetNames: string[];
  postcodeFormats: string[];
  countryCodes: string[];
  states?: string[];
  statesAbbr?: string[];

  // Internet
  domainWords: string[];
  tlds: string[];
  freeEmailDomains: string[];
  safeDomainNames?: string[];
  hostnamePrefixes?: string[];
  uriPages?: string[];
  uriPaths?: string[];
  uriExtensions?: string[];
  httpMethods?: string[];
  httpStatusCodes?: number[];
  imagePlaceholderServices?: string[];

  // Lorem
  words: string[];

  // Company
  companySuffixes?: string[];
  buzzAdjectives?: string[];
  buzzNouns?: string[];
  buzzVerbs?: string[];
  catchPhraseAdjectives?: string[];
  catchPhraseDescriptors?: string[];
  catchPhraseNouns?: string[];

  // Bank
  swiftCodes?: string[];
  bankNames?: string[];

  // Phone
  areaCodes?: string[];
  phoneFormats?: string[];

  // Color
  colorNames?: string[];
  safeColorNames?: string[];

  // Misc
  booleanValues?: boolean[];

  // Job
  jobTitles?: string[];
  jobAdjectives?: string[];
  jobPositions?: string[];
  jobFields?: string[];

  // Vehicle
  licensePlateFormats?: string[];

  // SSN
  ssnFormats?: string[];

  // Passport
  passportFormats?: string[];
}

export interface LocaleMap {
  [key: string]: LocaleData;
}

export declare const dictionary: LocaleMap;
export declare const locales: string[];
export declare function getLocale(locale: string): LocaleData;