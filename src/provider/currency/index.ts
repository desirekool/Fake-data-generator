import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class CurrencyProvider extends BaseProvider {
  __provider__ = "currency";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  currency(): string {
    return this.randomElement([
      "USD", "EUR", "GBP", "JPY", "CNY", "INR", "BRL", "RUB",
      "KRW", "MXN", "CAD", "AUD", "CHF", "SEK", "NZD",
    ]);
  }

  currency_code(): string {
    return this.currency();
  }

  currency_name(): string {
    const codes: Record<string, string> = {
      USD: "United States Dollar",
      EUR: "Euro",
      GBP: "British Pound Sterling",
      JPY: "Japanese Yen",
      CNY: "Chinese Yuan",
      INR: "Indian Rupee",
      BRL: "Brazilian Real",
      RUB: "Russian Ruble",
      KRW: "South Korean Won",
      MXN: "Mexican Peso",
      CAD: "Canadian Dollar",
      AUD: "Australian Dollar",
      CHF: "Swiss Franc",
      SEK: "Swedish Krona",
      NZD: "New Zealand Dollar",
    };
    return codes[this.currency()] || "Unknown Currency";
  }

  cryptocurrency(): string {
    return this.randomElement(["BTC", "ETH", "LTC", "XRP", "ADA", "DOT", "SOL", "DOGE", "AVAX", "MATIC"]);
  }

  cryptocurrency_code(): string {
    return this.cryptocurrency();
  }

  cryptocurrency_name(): string {
    const codes: Record<string, string> = {
      BTC: "Bitcoin",
      ETH: "Ethereum",
      LTC: "Litecoin",
      XRP: "Ripple",
      ADA: "Cardano",
      DOT: "Polkadot",
      SOL: "Solana",
      DOGE: "Dogecoin",
      AVAX: "Avalanche",
      MATIC: "Polygon",
    };
    return codes[this.cryptocurrency()] || "Unknown Cryptocurrency";
  }

  pricetag(): string {
    const price = this.generator.randomInt(1, 9999);
    return `$${price.toFixed(2)}`;
  }
}