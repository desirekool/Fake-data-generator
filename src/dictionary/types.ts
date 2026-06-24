// Weighted name data used by en_US, zh_CN, ko_KR etc.
export type NameList = string[] | Record<string, number>;
export type FormatList = string[] | Record<string, number>;

export interface LocaleData {
  // Person
  firstNames?: NameList;
  lastNames?: NameList;
  firstNamesMale?: NameList;
  firstNamesFemale?: NameList;
  firstNamesNonbinary?: NameList;
  firstNamesUnisex?: NameList;
  lastNamesMale?: NameList;
  lastNamesFemale?: NameList;
  lastNamesNonbinary?: NameList;
  lastNamesUnisex?: NameList;
  prefixes?: NameList;
  prefixesMale?: NameList;
  prefixesFemale?: NameList;
  prefixesNonBinary?: NameList;
  suffixes?: NameList;
  suffixesMale?: NameList;
  suffixesFemale?: NameList;
  suffixesNonBinary?: NameList;
  languageNames?: string[];
  nameFormats?: FormatList;
  nameFormatsFemale?: FormatList;
  nameFormatsMale?: FormatList;
  nameFormatsNonbinary?: FormatList;
  formatsFemale?: FormatList;
  formatsMale?: FormatList;
  formatsNonBinary?: FormatList;
  middleNames?: NameList;
  academicPrefixes?: string[];
  academicSuffixes?: string[];
  jobsMale?: string[];
  jobsFemale?: string[];

  // Address
  cityPrefixes?: string[];
  citySuffixes?: string[];
  cityFormats?: string[];
  buildingNumberFormats?: string[];
  streetSuffixes?: string[];
  streetSuffixesLong?: string[];
  streetSuffixesShort?: string[];
  streetNames?: string[];
  streetNameFormats?: string[];
  streetPrefixes?: string[];
  streetPrefixesFeminine?: string[];
  streetPrefixesMasculine?: string[];
  streetAddressFormats?: string[];
  postcodeFormats?: string[];
  postcodePattern?: string;
  addressFormats?: string[];
  countryCodes?: string[];
  states?: string[];
  statesAbbr?: string[];
  statesPostcode?: Record<string, number[]>;
  countries?: string[];
  regions?: string[];
  provinces?: string[];
  provincesAbbr?: string[];
  departments?: string[];
  secondaryAddressFormats?: string[];
  buildingNames?: string[];
  districts?: string[];
  cityNames?: string[];
  cityWithPostcodeFormats?: FormatList;
  counties?: string[];
  streetTitles?: string[];
  towns?: string[];
  streets?: string[];
  freelyAssociatedStatesAbbr?: string[];
  knownUspsAbbr?: string[];
  territoriesAbbr?: string[];
  militaryApoFormat?: string;
  militaryDpoFormat?: string;
  militaryShipPrefix?: string[];
  militaryStateAbbr?: string[];
  landAddressFormats?: FormatList;
  roadAddressFormats?: FormatList;

  // Company
  companySuffixes?: string[];
  companyPrefixes?: string[];
  companyCategories?: string[];
  largeCompanies?: string[];
  companyFormats?: FormatList;
  nameComplements?: string[];
  catchPhraseFormats?: string[];
  bsWords?: string[][];
  catchPhraseWords?: string[][];
  buzzAdjectives?: string[];
  buzzNouns?: string[];
  buzzVerbs?: string[];
  catchPhraseAdjectives?: string[];
  catchPhraseDescriptors?: string[];
  catchPhraseNouns?: string[];
  nouns?: string[];
  verbs?: string[];
  attributes?: string[];

  // Lorem
  words?: string[];
  wordConnector?: string;
  partsOfSpeech?: Record<string, string[]>;
  sentencePunctuation?: string;

  // Internet
  domainWords?: string[];
  tlds?: string[];
  freeEmailDomains?: string[];
  safeDomainNames?: string[];
  hostnamePrefixes?: string[];
  uriPages?: string[];
  uriPaths?: string[];
  uriExtensions?: string[];
  httpMethods?: string[];
  httpStatusCodes?: number[];
  imagePlaceholderServices?: string[];
  replacements?: [string, string][];
  userNameFormats?: string[];
  emailFormats?: string[];
  safeEmailTlds?: string[];

  // Bank
  swiftCodes?: string[];
  bankNames?: string[];
  banks?: string[];
  bankCountryCodes?: string[];
  bbanFormat?: string;
  swiftLocationCodes?: string[];
  swiftBankCodes?: string[];
  swiftBranchCodes?: string[];

  // Phone Number
  areaCodes?: string[];
  areaCodeFormats?: string[];
  cellphoneFormats?: string[];
  telephoneFormats?: string[];
  servicesPhonesFormats?: string[];
  landlineCodes?: string[];
  landlineFormats?: string[];
  basicFormats?: string[];
  phoneFormats?: FormatList;
  countryCallingCodes?: string[];
  msisdnFormats?: string[];
  mobileNumberFormats?: string[];
  tollFormats?: string[];

  // Color
  colorNames?: Record<string, string>;
  safeColorNames?: string[];

  // Job
  jobTitles?: string[];

  // Automotive
  licensePlateFormats?: string[];

  // SSN
  ssnFormats?: string[];
  vatIdFormats?: string[];
  aadhaarIdFormats?: string[];
  ninoFormats?: string[];
  gsisFormats?: string[];
  pagibigFormats?: string[];
  philhealthFormats?: string[];
  sssFormats?: string[];
  umidFormats?: string[];
  rutFormat?: string;
  policeIdFormat?: string;
  nuipFormats?: FormatList;
  legalPersonNitFormats?: string[];
  nationalIdMonths?: string[];

  // Passport
  passportFormats?: string[];

  // Geo
  cities?: string[] | GeoCity[];
  landCoords?: string[][];
  poly?: number[][];

  // Currency
  currencies?: [string, string][];
  cryptocurrencyCodes?: [string, string][];
  currencySymbols?: Record<string, string>;
  priceFormats?: string[];

  // Credit Card
  creditCardTypes?: string[];

  // Date Time
  dateFormats?: string[];
  timeFormats?: string[];
  dayNames?: string[];
  monthNames?: string[];
  DAY_NAMES?: Record<string, string>;
  MONTH_NAMES?: Record<string, string>;
  AM_PM?: Record<string, string>;
  centuryNames?: string[];
  timezones?: string[];

  // Misc
  gemstoneNames?: string[];
  mountainNames?: string[];
  plantNames?: string[];
  randomObjectNames?: string[];
  spaceObjectNames?: string[];
}

export interface GeoCity {
  name: string;
  lat: number;
  lng: number;
}

export interface LocaleMap {
  [key: string]: LocaleData;
}
