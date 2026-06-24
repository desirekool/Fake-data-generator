import type { LocaleData } from "../../types";

export const phone_number: Partial<LocaleData> = {
  cellphone_blocks: ['2', '3', '4', '5', '6', '7', '8', '9'],
  landline_codes: ['32', '33', '34', '35', '41', '42', '43', '45', '51', '52', '53', '55', '57', '58', '61', '63', '64', '65', '67', '71', '72', '73', '75', '44'],
  phoneFormats: ['+56 2 2%## ####', '+56 2 3%## ####', '+56 {{ landline_code }} 2%# ####', '+56 {{ landline_code }} 3%# ####', '+56 9 {{ cellphone_block }}%## ####', '+56 {{ special_code }} %## ###'],
  special_codes: ['600', '800'],
};
