import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

const countryCodeToName: Record<string, string> = {
  US: "United States", GB: "United Kingdom", DE: "Germany", FR: "France",
  IT: "Italy", ES: "Spain", AU: "Australia", JP: "Japan", CN: "China",
  IN: "India", BR: "Brazil", RU: "Russia", KR: "South Korea", MX: "Mexico",
  NL: "Netherlands", SE: "Sweden", NO: "Norway", DK: "Denmark", FI: "Finland",
  SG: "Singapore", HK: "Hong Kong", TW: "Taiwan", AE: "United Arab Emirates",
  SA: "Saudi Arabia", ZA: "South Africa", NG: "Nigeria", EG: "Egypt",
  TR: "Turkey", PL: "Poland", CH: "Switzerland", AT: "Austria", BE: "Belgium",
  GR: "Greece", PT: "Portugal", CZ: "Czech Republic", HU: "Hungary",
  RO: "Romania", UA: "Ukraine", IL: "Israel", MY: "Malaysia", TH: "Thailand",
  VN: "Vietnam", PH: "Philippines", ID: "Indonesia", NZ: "New Zealand",
  AR: "Argentina", CL: "Chile", CO: "Colombia", PE: "Peru", BO: "Bolivia",
  IE: "Ireland", PK: "Pakistan", BD: "Bangladesh", KE: "Kenya", CA: "Canada",
};

export class AddressProvider extends BaseProvider {
  __provider__ = "address";
  protected data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  city_prefix(): string {
    return this.randomElement(this.data.cityPrefixes);
  }

  city_suffix(): string {
    return this.randomElement(this.data.citySuffixes);
  }

  street_suffix(): string {
    return this.randomElement(this.data.streetSuffixes);
  }

  street_prefix(): string {
    if (this.data.streetPrefixes) {
      return this.randomElement(this.data.streetPrefixes);
    }
    return "";
  }

  building_number(): string {
    return this.numerify(this.randomElement(this.data.buildingNumberFormats));
  }

  city(): string {
    const pattern = this.randomElement(this.data.cityFormats);
    return this.generator.parse(pattern);
  }

  street_name(): string {
    if (this.data.streetNames && this.data.streetNames.length > 0) {
      return this.randomElement(this.data.streetNames);
    }
    return this.generator.parse("{{last_name}} {{street_suffix}}");
  }

  street_address(): string {
    const pattern = this.randomElement(this.data.streetAddressFormats);
    return this.generator.parse(pattern);
  }

  secondary_address(): string {
    return this.numerify(this.randomElement(this.data.secondaryAddressFormats));
  }

  postcode(): string {
    return this.bothify(this.randomElement(this.data.postcodeFormats)).toUpperCase();
  }

  address(): string {
    const pattern = this.randomElement(this.data.addressFormats);
    return this.generator.parse(pattern);
  }

  country(): string {
    return this.randomElement(this.data.countryCodes);
  }

  country_code(representation = "alpha-2"): string {
    if (representation === "alpha-2") {
      return this.randomElement(this.data.countryCodes);
    }
    return this.randomElement(this.data.countryCodes);
  }

  current_country_code(): string {
    const parts = this.generator.locale.split("_");
    return parts.length > 1 ? parts[1] : "US";
  }

  current_country(): string {
    const code = this.current_country_code();
    return countryCodeToName[code] || code;
  }

  state(): string {
    return this.randomElement(this.data.states);
  }

  state_abbr(): string {
    return this.randomElement(this.data.statesAbbr);
  }

  zipcode(): string {
    return this.postcode();
  }
}
