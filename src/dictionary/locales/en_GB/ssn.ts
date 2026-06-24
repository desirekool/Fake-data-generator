import type { LocaleData } from "../../types";

export const ssn: Partial<LocaleData> = {
  nino_formats: ['ZZ ## ## ## T', 'ZZ######T', 'ZZ ###### T'],
  vatIdFormats: ['GB### #### ##', 'GB### #### ## ###', 'GBGD###', 'GBHA###'],
};
