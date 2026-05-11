import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class BarcodeProvider extends BaseProvider {
  __provider__ = "barcode";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  ean(length = 13): string {
    if (length !== 8 && length !== 13) {
      throw new Error("EAN can only be 8 or 13 digits");
    }
    const code = this.generator.numerify(
      length === 13 ? "#############" : "########"
    );
    return code + this._calculateEanCheckDigit(code);
  }

  ean8(): string {
    return this.ean(8);
  }

  ean13(): string {
    return this.ean(13);
  }

  localized_ean(length: number): string {
    return this.ean(length);
  }

  localized_ean8(): string {
    return this.ean8();
  }

  localized_ean13(): string {
    return this.ean13();
  }

  private _calculateEanCheckDigit(code: string): string {
    const digits = code.split("").map(Number);
    const len = digits.length;
    let sum = 0;
    for (let i = 0; i < len; i++) {
      sum += digits[i] * (len % 2 === 0 ? (i % 2 === 0 ? 3 : 1) : (i % 2 === 0 ? 1 : 3));
    }
    const check = (10 - (sum % 10)) % 10;
    return String(check);
  }
}