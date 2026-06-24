import type { LocaleData } from "../../types";

export const ssn: Partial<LocaleData> = {
  legal_person_nit_formats: ['8########', '9########'],
  nuip_formats: {'10########': 0.25, '11########': 0.25, '12########': 0.1, '%!######': 0.4},
};
