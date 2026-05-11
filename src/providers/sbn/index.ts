import { BaseProvider } from "../../generator";

export class SbnProvider extends BaseProvider {
  __provider__ = "sbn";

  constructor(generator: import("../../generator").Generator) {
    super(generator);
  }

  private _body(): string {
    const group = this.generator.randomInt(0, 9);
    const publisher = this.generator.randomInt(0, 99);
    const title = this.generator.randomInt(0, 99999);
    return `${group}-${String(publisher).padStart(2, "0")}-${String(title).padStart(5, "0")}`;
  }

  private _registrant_publication(): string {
    return Array.from({ length: 6 }, () => this.generator.randomDigit()).join("");
  }

  sbn9(): string {
    const body = this._body();
    const digits = body.replace(/-/g, "").split("").map(Number);
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      sum += digits[i] * (i + 1);
    }
    const check = sum % 11;
    const checkChar = check === 10 ? "X" : String(check);
    return `${body}-${checkChar}`;
  }
}