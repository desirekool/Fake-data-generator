import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class BankProvider extends BaseProvider {
  __provider__ = "bank";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  bank_country(): string {
    return this.randomElement(this.data.countryCodes || ["US", "GB", "DE"]);
  }

  bank(): string {
    if (this.data.bankNames && this.data.bankNames.length > 0) {
      return this.randomElement(this.data.bankNames);
    }
    return this.randomElement(["First National", "Citizens Bank", "Unity Trust"]);
  }

   aba(): string {
     return this.numerify("################");
   }

   bban(): string {
     return this.bothify("????##############");
   }

   iban(): string {
     const country = this.randomElement(this.data.countryCodes || ["GB", "DE", "FR"]);
     const checkDigits = this.numerify("##");
     const bban = this.bban();
     return `${country}${checkDigits}${bban}`;
   }

   swift(length?: number, primary = false, use_dataset = false): string {
     if (this.data.swiftCodes && this.data.swiftCodes.length > 0 && use_dataset) {
       return this.randomElement(this.data.swiftCodes);
     }
     length = length ?? 11;
     if (primary) {
       return `${this.randomLetter()}${this.randomLetter()}${this.randomLetter()}${this.randomLetter()}${this.randomLetter()}${this.randomLetter()}`.toUpperCase() +
         this.bothify(`##${length > 8 ? "???" : ""}`);
     }
     return this.bothify("??????##" + (length > 8 ? "???" : "")).toUpperCase();
   }

  swift8(use_dataset = false): string {
    return this.swift(8, false, use_dataset);
  }

  swift11(use_dataset = false, primary = false): string {
    return this.swift(11, primary, use_dataset);
  }

  private randomLetter(): string {
    return String.fromCharCode(65 + Math.floor(this.generator.random() * 26));
  }
}