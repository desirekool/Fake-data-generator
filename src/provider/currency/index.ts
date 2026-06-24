import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class CurrencyProvider extends BaseProvider {
  __provider__ = "currency";
  protected data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  currency(): [string, string] {
    return this.randomElement(this.data.currencies);
  }

  currency_code(): string {
    return this.currency()[0];
  }

  currency_name(): string {
    return this.currency()[1];
  }

  currency_symbol(code?: string): string {
    if (code === undefined) {
      code = this.randomElement(Object.keys(this.data.currencySymbols));
    }
    return this.data.currencySymbols[code] || "\u00a4";
  }

  cryptocurrency(): [string, string] {
    return this.randomElement(this.data.cryptocurrencyCodes);
  }

  cryptocurrency_code(): string {
    return this.cryptocurrency()[0];
  }

  cryptocurrency_name(): string {
    return this.cryptocurrency()[1];
  }

  pricetag(): string {
    const [code] = this.currency();
    return code + "\u00a0" + this.numerify(this.randomElement(this.data.priceFormats));
  }
}
