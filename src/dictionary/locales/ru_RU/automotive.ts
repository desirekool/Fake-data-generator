import type { LocaleData } from "../../types";

export const automotive: Partial<LocaleData> = {
  licensePlateFormats: ['{{plate_letter}}{{plate_number}}{{plate_letter}}{{plate_letter}} {{plate_suffix}}', '{{plate_letter}}{{plate_letter}}{{plate_number}} {{plate_suffix}}', '{{plate_letter}}{{plate_letter}}{{plate_number_extra}} {{plate_suffix}}', '{{plate_letter}}{{plate_number_extra}} {{plate_suffix}}', '{{plate_number_extra}}{{plate_letter}}{{plate_letter}} {{plate_suffix}}', '{{plate_number_special}} {{plate_suffix}}'],
  license_plate_letters: ['A', 'B', 'E', 'K', 'M', 'Н', 'О', 'Р', 'С', 'Т', 'У', 'Х'],
  license_plate_suffix: ['01', '02', '102', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '113', '14', '15', '16', '116', '716', '17', '18', '19', '20', '95', '21', '121', '22', '23', '93', '123', '24', '84', '88', '124', '25', '125', '26', '126', '27', '28', '29', '30', '31', '32', '33', '34', '134', '35', '36', '136', '37', '38', '85', '38', '39', '91', '40', '41', '82', '42', '142', '43', '44', '45', '46', '47', '48', '49', '50', '90', '150', '190', '750', '51', '52', '152', '53', '54', '154', '55', '56', '57', '58', '59', '81', '159', '60', '61', '161', '62', '63', '163', '763', '64', '164', '65', '66', '96', '196', '67', '68', '69', '70', '71', '72', '73', '173', '74', '174', '75', '80', '76', '77', '97', '99', '177', '197', '199', '777', '799', '78', '98', '178', '198', '79', '80', '81', '82', '82', '83', '84', '85', '86', '186', '87', '88', '89', '92', '94'],
  plate_extra_formats: ['####'],
  plate_number_formats: ['###'],
  plate_special_formats: ['00#CD#', '00#D###', '00#T###'],
  vehicle_categories: ['M', 'A', 'A1', 'B', 'B1', 'BE', 'C', 'C1', 'C1E', 'CE', 'D', 'D1', 'DE', 'Tm', 'Tb'],
};
