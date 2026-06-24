import type { LocaleData } from "../../types";

export const phone_number: Partial<LocaleData> = {
  cellphone_formats: ['+41 {{dialing_code}} ### ## ##', '0{{dialing_code}} ### ## ##'],
  dialing_codes: ['75', '76', '77', '78', '79'],
  landline_codes: ['21', '22', '24', '26', '27', '31', '32', '33', '34', '43', '41', '44', '52', '55', '56', '61', '62', '71', '81', '91'],
  landline_formats: ['+41 {{landline_code}} ### ## ##', '0{{landline_code}} ### ## ##'],
};
