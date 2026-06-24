import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class CreditCardProvider extends BaseProvider {
  __provider__ = "credit_card";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

   creditCardNumber(): string {
     const issuer = this.creditCardProvider();
     switch (issuer) {
       case "maestro":
         return this._generateNumber("5[0-5]" + "#".repeat(13), "#".repeat(15));
       case "visa":
         return this._generateNumber("4", "#".repeat(12));
       case "mastercard":
         return this._generateNumber("5[1-5]", "#".repeat(10));
       case "amex":
         return this._generateNumber("3[47]", "#".repeat(13));
       case "discover":
         return this._generateNumber("6(?:011|5)", "#".repeat(12));
       case "diners":
         return this._generateNumber("3(?:0[0-5]|[68])", "#".repeat(12));
       case "jcb":
         return this._generateNumber("35[2-8]", "#".repeat(12));
       default:
         return this._generateNumber("#", "#".repeat(15));
     }
   }

   creditCardProvider(): string {
     const providers = ["visa", "mastercard", "amex", "discover", "maestro", "diners", "jcb"];
     return this.randomElement(providers);
   }

   creditCardExpire(start = "now", end = "+10y", date_format = "%m/%y"): string {
     // Simplified - generates future date
     const year = this.randomInt(2025, 2035);
     const month = this.randomInt(1, 12);
     return `${String(month).padStart(2, "0")}/${String(year).slice(-2)}`;
   }

   creditCardFull(): string {
      const name = this.generator.parse("{{first_name}} {{last_name}}");
     return `${name}\n${this.creditCardNumber()}\n${this.creditCardExpire()}`;
   }

   creditCardSecurityCode(): string {
     return this.numerify("###");
   }

  _credit_card_type(card_number: string): string {
    return this.creditCardProvider();
  }

  _resolvePrefix(prefix: string): string {
    return prefix
      .replace(/\((?:\?:)?(\d+(?:\|\d+)*)\)/g, (_, group) => {
        const parts = group.split("|");
        return this.randomElement(parts);
      })
      .replace(/\[(\d+)-(\d+)\]/g, (_, a, b) => String(this.randomInt(Number(a), Number(b))));
  }

  _generateNumber(prefix: string, length: string): string {
    const prefixNum = this._resolvePrefix(prefix);
    const number = (prefixNum + this.numerify(length)).replace(/[^0-9]/g, "");
    // Luhn check digit
    const digits = number.split("").map(Number);
    let sum = 0;
    let isEven = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    const checkDigit = ((10 - (sum % 10)) % 10);
    return number + checkDigit;
  }
}