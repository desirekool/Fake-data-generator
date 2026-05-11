import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class ProfileProvider extends BaseProvider {
  __provider__ = "profile";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  simple_profile(sex?: "M" | "F"): {
    username: string;
    name: string;
    sex: string;
    address: string;
    mail: string;
    birthdate: Date;
  } {
    const s = sex ?? this.generator.randomElement(["M", "F"]);
    const birthYear = this.generator.randomInt(1970, 2005);
    const birthMonth = this.generator.randomInt(1, 12);
    const birthDay = this.generator.randomInt(1, 28);
    const name = this.generator.parse("{{first_name}} {{last_name}}");
    const username = name.toLowerCase().replace(/\s/g, "_") + this.generator.numerify("##");

    return {
      username,
      name,
      sex: s,
      address: this.generator.parse("{{street_address}} {{city}}, {{state}} {{postcode}}"),
      mail: `${username}@${this.generator.parse("{{domain_name}}")}`,
      birthdate: new Date(birthYear, birthMonth - 1, birthDay),
    };
  }

  profile(fields?: string[], sex?: "M" | "F"): Record<string, any> & { login: string } {
    const s = sex ?? this.generator.randomElement(["M", "F"]);
    const login = this.generator.parse("{{first_name}}").toLowerCase() + "." + this.generator.parse("{{last_name}}").toLowerCase() + this.generator.numerify("##");

    const defaultFields = ["job", "company", "ssn", "residence", "current_location", "blood_group", "website"];
    const selected = fields || defaultFields;

    const profile: Record<string, any> = { login };

    for (const field of selected) {
      switch (field) {
        case "job":
          if (this.data.jobTitles) profile.job = this.randomElement(this.data.jobTitles);
          break;
        case "company":
          profile.company = this.generator.parse("{{last_name}} {{company_suffix}}");
          break;
        case "ssn":
          profile.ssn = this.generator.numerify("###-##-####");
          break;
        case "residence":
          profile.residence = this.generator.parse("{{street_address}} {{city}}, {{state}}");
          break;
        case "current_location":
          profile.current_location = [this.generator.randomInt(-180, 180), this.generator.randomInt(-90, 90)];
          break;
        case "blood_group":
          profile.blood_group = this.randomElement(["A", "B", "AB", "O"]);
          break;
        case "website":
          profile.website = [this.generator.parse("{{domain_name}}"), this.generator.parse("{{domain_name}}")];
          break;
      }
    }

    return profile;
  }
}