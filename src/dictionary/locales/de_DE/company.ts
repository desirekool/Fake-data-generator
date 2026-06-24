import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{last_name}} {{last_name}} {{company_suffix}}', '{{last_name}}'],
  companySuffixes: ['AG', 'AG', 'AG', 'AG', 'AG & Co. KG', 'AG & Co. KGaA', 'AG & Co. OHG', 'GbR', 'GbR', 'GmbH', 'GmbH', 'GmbH', 'GmbH', 'GmbH & Co. KG', 'GmbH & Co. KG', 'GmbH & Co. KGaA', 'GmbH & Co. OHG', 'KG', 'KG', 'KG', 'KGaA', 'OHG mbH', 'Stiftung & Co. KG', 'Stiftung & Co. KGaA', 'e.G.', 'e.V.'],
};
