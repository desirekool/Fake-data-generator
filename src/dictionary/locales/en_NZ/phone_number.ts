import type { LocaleData } from "../../types";

export const phone_number: Partial<LocaleData> = {
  areaCodes: ['20', '21', '22', '27', '29', '3', '4', '6', '7', '9'],
  phoneFormats: ['%## ####', '%##-####', '%######', '0{{area_code}} %## ####', '0{{area_code}} %##-####', '0{{area_code}}-%##-####', '0{{area_code}} %######', '(0{{area_code}}) %## ####', '(0{{area_code}}) %##-####', '(0{{area_code}}) %######', '+64 {{area_code}} %## ####', '+64 {{area_code}} %##-####', '+64 {{area_code}} %######', '+64-{{area_code}}-%##-####', '+64{{area_code}}%######'],
};
