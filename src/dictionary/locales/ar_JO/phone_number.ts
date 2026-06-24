import type { LocaleData } from "../../types";

export const phone_number: Partial<LocaleData> = {
  cellphone_formats: ['+9627{{operator_id}}#######', '+962 7 {{operator_id}}### ####', '07{{operator_id}}#######', '07{{operator_id}} ### ####'],
  phoneFormats: ['+9627{{operator_id}}#######', '+962 7 {{operator_id}}### ####', '07{{operator_id}}#######', '07{{operator_id}} ### ####', '+962{{area_code}}#######', '+962 {{area_code}} ### ####', '0{{area_code}}#######', '0{{area_code}} ### ####', '9##', '12##', '13##', '14##'],
  services_phones_formats: ['9##', '12##', '13##', '14##'],
  telephone_formats: ['+962{{area_code}}#######', '+962 {{area_code}} ### ####', '0{{area_code}}#######', '0{{area_code}} ### ####'],
};
