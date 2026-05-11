import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class SsnProvider extends BaseProvider {
  __provider__ = "ssn";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  ssn(min_age = 0, max_age = 105): string {
    const age = this.generator.randomInt(min_age, max_age);
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - age;
    const year = String(birthYear % 100).padStart(2, "0");
    const month = String(this.generator.randomInt(1, 12)).padStart(2, "0");
    const day = String(this.generator.randomInt(1, 28)).padStart(2, "0");

    // Check if US format
    if (this.data.ssnFormats && this.data.ssnFormats.length > 0) {
      return this.generator.numerify(this.randomElement(this.data.ssnFormats));
    }

    const serial = this.generator.randomInt(0, 9999);
    return `${year}${month}${day}${String(serial).padStart(4, "0")}`;
  }
}