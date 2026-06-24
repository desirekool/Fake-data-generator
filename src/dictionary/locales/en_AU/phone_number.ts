import type { LocaleData } from "../../types";

export const phone_number: Partial<LocaleData> = {
  phoneFormats: ['#### ####', '####-####', '####.####', '########', '0{{area_code}} #### ####', '0{{area_code}}-####-####', '0{{area_code}}.####.####', '0{{area_code}}########', '(0{{area_code}}) #### ####', '(0{{area_code}})-####-####', '(0{{area_code}}).####.####', '(0{{area_code}})########', '+61 {{area_code}} #### ####', '+61-{{area_code}}-####-####', '+61.{{area_code}}.####.####', '+61{{area_code}}########', '04## ### ###', '04##-###-###', '04##.###.###', '+61 4## ### ###', '+61-4##-###-###', '+61.4##.###.###'],
};
