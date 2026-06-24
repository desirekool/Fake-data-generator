import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class PassportProvider extends BaseProvider {
  __provider__ = "passport";
  protected data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  passport_number(): string {
    return this.bothify(this.randomElement(this.data.passportFormats));
  }

  passport_owner(gender: string = "X"): [string, string] {
    let givenName: string;
    if (gender === "M") {
      givenName = this.generator.parse("{{first_name_male}}");
    } else if (gender === "F") {
      givenName = this.generator.parse("{{first_name_female}}");
    } else {
      givenName = this.generator.parse("{{first_name_nonbinary}}");
    }
    const surname = this.generator.parse("{{last_name}}");
    return [givenName, surname];
  }

  passport_dob(): string {
    const year = this.randomInt(1950, 2005);
    const month = String(this.randomInt(1, 12)).padStart(2, "0");
    const day = String(this.randomInt(1, 28)).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}
