import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class SsnProvider extends BaseProvider {
  __provider__ = "ssn";
  protected data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  ssn(): string {
    return this.bothify(this.randomElement(this.data.ssnFormats));
  }
}
