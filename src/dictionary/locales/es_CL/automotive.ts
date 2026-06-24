import type { LocaleData } from "../../types";

export const automotive: Partial<LocaleData> = {
  licensePlateFormats: {'{{license_plate_new}}': 0.7, '{{license_plate_old}}': 0.2, '{{license_plate_police}}': 0.05, '{{license_plate_temporary}}': 0.04, '{{license_plate_diplomatic}}': 0.01},
  license_plate_new_format_letters: 'BCDFGHJKLPRSTVWXYZ',
  license_plate_old_format_first_letters: 'ABCDFGHJKLPRSTVWXYZ',
  license_plate_old_format_second_letters: 'ABCDFGHIJKLPRSTVWXYZ',
};
