import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class PassportProvider extends BaseProvider {
  __provider__ = "passport";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  passport_number(): string {
    if (this.data.passportFormats && this.data.passportFormats.length > 0) {
      return this.generator.bothify(this.randomElement(this.data.passportFormats));
    }
    return this.generator.bothify("##########");
  }

  passport_owner(): string {
    return this.generator.parse("{{first_name}} {{last_name}}");
  }

  passport_dob(): string {
    const year = this.generator.randomInt(1950, 2005);
    const month = String(this.generator.randomInt(1, 12)).padStart(2, "0");
    const day = String(this.generator.randomInt(1, 28)).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}