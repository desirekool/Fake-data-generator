import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class AddressProvider extends BaseProvider {
  __provider__ = "address";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  city_suffix(): string {
    return this.randomElement(this.data.citySuffixes);
  }

  street_suffix(): string {
    return this.randomElement(this.data.streetSuffixes);
  }

  building_number(): string {
    return this.numerify(
      this.randomElement(this.data.buildingNumberFormats)
    );
  }

  city(): string {
    const pattern = this.randomElement(this.data.cityFormats || [
      "{{city_prefix}} {{city_suffix}}",
      "{{city_prefix}} {{first_name}}",
      "{{city_suffix}}",
    ]);
    return this.generator.parse(pattern);
  }

  street_name(): string {
    if (this.data.streetNames && this.data.streetNames.length > 0) {
      return this.randomElement(this.data.streetNames);
    }
    return this.generator.parse("{{last_name}} {{street_suffix}}");
  }

  street_address(): string {
    const pattern = this.randomElement(this.data.streetAddressFormats || [
      "{{building_number}} {{street_name}}",
    ]);
    return this.generator.parse(pattern);
  }

  postcode(): string {
    return this.bothify(
      this.randomElement(this.data.postcodeFormats)
    ).toUpperCase();
  }

  address(): string {
    const pattern = this.randomElement(this.data.addressFormats || [
      "{{street_address}} {{city}}, {{state}} {{postcode}}",
    ]);
    return this.generator.parse(pattern);
  }

  country(): string {
    // Use alpha-2 codes as country names placeholder
    return this.randomElement(this.data.countryCodes);
  }

  country_code(representation = "alpha-2"): string {
    if (representation === "alpha-2") {
      return this.randomElement(this.data.countryCodes);
    }
    // Alpha-3 would need separate data; fallback to alpha-2
    return this.randomElement(this.data.countryCodes);
  }

  current_country_code(): string {
    return (this as any).__lang__?.split("_")[1] || "US";
  }

  state(): string {
    if (this.data.states && this.data.states.length > 0) {
      return this.randomElement(this.data.states);
    }
    if (this.data.statesAbbr && this.data.statesAbbr.length > 0) {
      return this.randomElement(this.data.statesAbbr);
    }
    return this.randomElement(this.data.countryCodes);
  }

  zipcode(): string {
    return this.postcode();
  }
}