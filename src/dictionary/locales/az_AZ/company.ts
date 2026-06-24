import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{last_name}} {{last_name}} {{company_suffix}}', '{{large_company}}'],
  companySuffixes: ['ASC', 'QSC', 'MMC'],
  large_companies: ['AZAL', 'Azergold', 'SOCAR', 'Socar Polymer', 'Global Export Fruits', 'Baku Steel Company', 'Azersun', 'Sun Food', 'Azərbaycan Şəkər İstehsalat Birliyi', 'Azərsu', 'Xəzər Dəniz Gəmiçiliyi', 'Azərenerji', 'Bakıelektrikşəbəkə', 'Azəralüminium', 'Bravo', 'Azərpambıq Aqrar Sənaye Kompleksi', 'CTS-Agro', 'Azərtütün Aqrar Sənaye Kompleksi', 'Azəripək', 'Azfruittrade', 'AF Holding', 'Azinko Holding', 'Gilan Holding', 'Azpetrol', 'Azərtexnolayn', 'Bakı Gəmiqayırma Zavodu', 'Gəncə Tekstil Fabriki', 'Mətanət A', 'İrşad Electronics'],
};
