import { BaseProvider } from "../../generator";

export class BarcodeProvider extends BaseProvider {
  __provider__ = "barcode";

  constructor(generator: import("../../generator").Generator) {
    super(generator);
  }

  private _ean(length: number = 13, prefixes: string[] = []): string {
    if (length !== 8 && length !== 13) {
      throw new Error("EAN can only be 8 or 13 digits");
    }
    const digits: number[] = [];
    for (let i = 0; i < length - 1; i++) {
      digits.push(this.randomDigit());
    }
    if (prefixes.length > 0) {
      const prefix = this.randomElement(prefixes);
      for (let i = 0; i < prefix.length; i++) {
        digits[i] = parseInt(prefix[i]);
      }
    }
    const weights = length === 8
      ? [3, 1, 3, 1, 3, 1, 3]
      : [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3];
    const weightedSum = digits.reduce((sum, d, i) => sum + d * weights[i], 0);
    const checkDigit = (10 - (weightedSum % 10)) % 10;
    digits.push(checkDigit);
    return digits.join("");
  }

  ean(length: number = 13, prefixes: string[] = []): string {
    return this._ean(length, prefixes);
  }

  ean8(prefixes: string[] = []): string {
    return this._ean(8, prefixes);
  }

  ean13(prefixes: string[] = []): string {
    return this._ean(13, prefixes);
  }

  localized_ean(length: number = 13): string {
    return this._ean(length);
  }

  localized_ean8(): string {
    return this._ean(8);
  }

  localized_ean13(): string {
    return this._ean(13);
  }
}
