import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class PhoneNumberProvider extends BaseProvider {
  __provider__ = "phone_number";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  phone_number(): string {
    if (this.data.phoneFormats && this.data.phoneFormats.length > 0) {
      return this.generator.numerify(
        this.randomElement(this.data.phoneFormats)
      );
    }
    return this.generator.numerify("(###) ###-####");
  }

  country_calling_code(): string {
    if (this.data.areaCodes && this.data.areaCodes.length > 0) {
      return "+" + this.randomElement(this.data.areaCodes);
    }
    return "+" + this.generator.randomInt(1, 999);
  }

  msisdn(): string {
    return this.generator.numerify("#############");
  }
}