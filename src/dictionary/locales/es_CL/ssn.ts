import type { LocaleData } from "../../types";

export const ssn: Partial<LocaleData> = {
  maximum_rut_company: 99999999,
  maximum_rut_person: 31999999,
  minimum_rut_company: 60000000,
  minimum_rut_person: 10,
  rut_format: '{:,d}-{:s}',
};
