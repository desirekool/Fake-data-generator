import type { LocaleData } from "../types";

export const currency: Partial<LocaleData> = {
  currencies: [["USD", "United States dollar"]],
  cryptocurrencyCodes: [["BTC", "Bitcoin"]],
  currencySymbols: { USD: "$" },
  priceFormats: ["#.##"],
};
