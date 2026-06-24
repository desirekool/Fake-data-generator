import type { LocaleData } from "../../types";

export const phone_number: Partial<LocaleData> = {
  areaCodes: ['012 3', '012 4', '012 5', '018 6', '020 2', '021 2', '021 4', '022 2', '022 3', '022 4', '023 3', '024 2', '025 2', '026 2', '026 3', '036 5'],
  cellphone_formats: ['+994{{provider_code}}{{start_digit}}######', '0{{provider_code}} {{start_digit}}## ## ##', '0{{provider_code}}-{{start_digit}}##-##-##'],
  phoneFormats: ['+994{{provider_code}}{{start_digit}}######', '0{{provider_code}} {{start_digit}}## ## ##', '0{{provider_code}}-{{start_digit}}##-##-##', '{{area_code}}## ## ##'],
  provider_codes: ['50', '51', '55', '60', '70', '77', '99'],
  start_digits: ['2', '3', '4', '5', '6', '7', '8', '9'],
  telephone_formats: ['{{area_code}}## ## ##'],
};
