import type { LocaleData } from "../../types";

export const bank: Partial<LocaleData> = {
  bankNames: ['Argenta Spaarbank', 'AXA Bank', 'Belfius Bank', 'BNP Paribas Fortis', 'Bpost Bank', 'Crelan', 'Deutsche Bank AG', 'ING België', 'KBC Bank'],
  bbanFormat: '############',
  countryCodes: 'BE',
  swift_bank_codes: ['ARSP', 'AXAB', 'BBRU', 'BPOT', 'DEUT', 'GEBA', 'GKCC', 'KRED', 'NICA'],
  swift_branch_codes: ['203', 'BTB', 'CIC', 'HCC', 'IDJ', 'IPC', 'MDC', 'RET', 'VOD', 'XXX'],
  swift_location_codes: ['BE', 'B2', '99', '21', '91', '23', '3X', '75', '2X', '22', '88', 'B1', 'BX', 'BB'],
};
