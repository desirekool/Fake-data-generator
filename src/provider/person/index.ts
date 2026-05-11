import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class PersonProvider extends BaseProvider {
  __provider__ = "person";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  name(): string {
    return this.generator.parse("{{first_name}} {{last_name}}");
  }

  first_name(): string {
    return this.randomElement(this.data.firstNames);
  }

  last_name(): string {
    return this.randomElement(this.data.lastNames);
  }

  name_male(): string {
    if (this.data.firstNamesMale) {
      const first = this.randomElement(this.data.firstNamesMale);
      const last = this.data.lastNamesMale
        ? this.randomElement(this.data.lastNamesMale)
        : this.last_name();
      return `${first} ${last}`;
    }
    return this.generator.parse("{{first_name}} {{last_name}}");
  }

  name_female(): string {
    if (this.data.firstNamesFemale) {
      const first = this.randomElement(this.data.firstNamesFemale);
      const last = this.data.lastNamesFemale
        ? this.randomElement(this.data.lastNamesFemale)
        : this.last_name();
      return `${first} ${last}`;
    }
    return this.generator.parse("{{first_name}} {{last_name}}");
  }

  name_nonbinary(): string {
    return this.generator.parse("{{first_name}} {{last_name}}");
  }

  first_name_male(): string {
    return this.data.firstNamesMale
      ? this.randomElement(this.data.firstNamesMale)
      : this.first_name();
  }

  first_name_female(): string {
    return this.data.firstNamesFemale
      ? this.randomElement(this.data.firstNamesFemale)
      : this.first_name();
  }

  first_name_nonbinary(): string {
    return this.first_name();
  }

  last_name_male(): string {
    return this.data.lastNamesMale
      ? this.randomElement(this.data.lastNamesMale)
      : this.last_name();
  }

  last_name_female(): string {
    return this.data.lastNamesFemale
      ? this.randomElement(this.data.lastNamesFemale)
      : this.last_name();
  }

  last_name_nonbinary(): string {
    return this.last_name();
  }

  prefix(): string {
    if (this.data.prefixes) return this.randomElement(this.data.prefixes);
    const prefixes: string[] = [];
    if (this.data.prefixesMale) prefixes.push(...this.data.prefixesMale);
    if (this.data.prefixesFemale) prefixes.push(...this.data.prefixesFemale);
    if (this.data.prefixesNonBinary) prefixes.push(...this.data.prefixesNonBinary);
    return prefixes.length > 0 ? this.randomElement(prefixes) : "";
  }

  prefix_male(): string {
    return this.data.prefixesMale
      ? this.randomElement(this.data.prefixesMale)
      : this.prefix();
  }

  prefix_female(): string {
    return this.data.prefixesFemale
      ? this.randomElement(this.data.prefixesFemale)
      : this.prefix();
  }

  prefix_nonbinary(): string {
    return this.data.prefixesNonBinary
      ? this.randomElement(this.data.prefixesNonBinary)
      : this.prefix();
  }

  suffix(): string {
    if (this.data.suffixes) return this.randomElement(this.data.suffixes);
    const suffixes: string[] = [];
    if (this.data.suffixesMale) suffixes.push(...this.data.suffixesMale);
    if (this.data.suffixesFemale) suffixes.push(...this.data.suffixesFemale);
    if (this.data.suffixesNonBinary) suffixes.push(...this.data.suffixesNonBinary);
    return suffixes.length > 0 ? this.randomElement(suffixes) : "";
  }

  suffix_male(): string {
    return this.data.suffixesMale
      ? this.randomElement(this.data.suffixesMale)
      : this.suffix();
  }

  suffix_female(): string {
    return this.data.suffixesFemale
      ? this.randomElement(this.data.suffixesFemale)
      : this.suffix();
  }

  suffix_nonbinary(): string {
    return this.data.suffixesNonBinary
      ? this.randomElement(this.data.suffixesNonBinary)
      : this.suffix();
  }

  language_name(): string {
    return this.randomElement(this.data.languageNames);
  }
}