import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class PhoneNumberProvider extends BaseProvider {
  __provider__ = "phone_number";
  protected data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  phone_number(): string {
    return this.numerify(this.randomElement(this.data.phoneFormats));
  }

  country_calling_code(): string {
    return this.randomElement(this.data.countryCallingCodes);
  }

  msisdn(): string {
    return this.numerify(this.randomElement(this.data.msisdnFormats));
  }
}
