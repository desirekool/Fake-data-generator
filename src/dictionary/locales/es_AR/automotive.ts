import type { LocaleData } from "../../types";

export const automotive: Partial<LocaleData> = {
  licensePlateFormats: {'{{license_plate_old}}': 0.6, '{{license_plate_mercosur}}': 0.4},
  license_plate_new_first_letter: {'A': 0.99, 'B': 0.001, 'C': 0.0001, 'D': 1e-05, 'E': 1e-10},
  license_plate_new_second_letter: {'A': 0.1, 'B': 0.1, 'C': 0.1, 'D': 0.1, 'E': 0.1, 'F': 0.1, 'G': 0.09, 'H': 0.08, 'I': 0.07, 'J': 0.06, 'K': 0.04, 'L': 0.03, 'M': 0.009, 'N': 0.007, 'O': 0.005, 'P': 0.004, 'Q': 0.001, 'R': 0.0009, 'S': 0.0008, 'T': 0.0007, 'U': 0.0006, 'V': 0.0005, 'W': 0.0003, 'X': 0.0002, 'Y': 0.0001, 'Z': 5e-05},
  license_plate_old_format_first_letter: 'ABCDEFGHIJKLMNOPQRSTUVWX',
};
