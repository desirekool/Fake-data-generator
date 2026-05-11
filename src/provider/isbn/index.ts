import { BaseProvider } from "../../generator";

export class IsbnProvider extends BaseProvider {
  __provider__ = "isbn";

  constructor(generator: import("../../generator").Generator) {
    super(generator);
  }

  private _body(): string {
    const group = this.generator.randomInt(0, 99);
    const publisher = this.generator.randomInt(0, 999);
    const title = this.generator.randomInt(0, 99999);
    return `${String(group).padStart(2, "0")}-${String(publisher).padStart(4, "0")}-${String(title).padStart(5, "0")}`;
  }

  private _registrant_publication(length: number): string {
    return Array.from({ length }, () => this.generator.randomDigit()).join("");
  }

  private _isbn_check_digit(body: string): string {
    const digits = body.replace(/-/g, "").split("").map(Number);
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      sum += digits[i] * (i % 2 === 0 ? 1 : 3);
    }
    const remainder = sum % 10;
    return remainder === 0 ? "0" : String(10 - remainder);
  }

  isbn13(separator = "-"): string {
    const prefix = "978";
    const body = this._body();
    const bodyNoDash = body.replace(/-/g, "");
    const check = this._isbn_check_digit(prefix + bodyNoDash);
    return `${prefix}${separator}${body}${separator}${check}`;
  }

  isbn10(separator = "-"): string {
    const body = this._body();
    const bodyStr = body.replace(/-/g, "");
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += Number(bodyStr[i]) * (10 - i);
    }
    const check = sum % 11;
    const checkChar = check === 10 ? "X" : String(check);
    return `${body}${separator}${checkChar}`;
  }
}