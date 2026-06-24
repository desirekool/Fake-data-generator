import type { LocaleData } from "../../types";

export const address: Partial<LocaleData> = {
  addressFormats: ['{{street_address}}, {{city}}, {{postcode}}'],
  buildingNumberFormats: ['%#', '%##', '%###'],
  cities: ['eGoli', 'eThekwini', 'iBhayi', 'iKapa', 'uMgungundlovu', 'Polokwane', 'Mbombela', 'Mahikeng', 'Kimberley', 'Bloemfontein', 'Rustenburg', 'Soweto', 'Benoni', 'Tembisa', 'Welkom', 'Vereeniging', 'Chatsworth', 'Uitenhage', 'Middelburg', 'Springs', 'Randfontein', 'Boksburg', 'Witbank', 'Klerksdorp', 'Bethlehem', 'George', 'Upington', 'Musina', 'Vanderbijlpark', 'Stellenbosch', 'Krugersdorp', 'Sasolburg', 'Centurion', 'Newcastle', 'Thohoyandou', 'Potchefstroom', 'Kathu', 'Paarl'],
  cityFormats: ['{{city_name}}'],
  citySuffixes: [''],
  countries: ['iNingizimu Afrika', 'Botswana', 'Lesotho', 'Namibia', 'Eswatini', 'Zimbabwe', 'Mozambique', 'Angola', 'Zambia', 'Malawi', 'Madagascar', 'Tanzania', 'Kenya', 'Nigeria', 'Ghana', 'Egypt', 'Morocco', 'Tunisia', 'Algeria', 'Ethiopia', 'Sudan', 'Somalia', 'Uganda', 'Cameroon', 'DR Congo', 'Rwanda', 'Burundi', 'Senegal', 'Mali', 'Ivory Coast', 'Niger', 'Chad', 'Mauritania', 'Eritrea', 'Djibouti', 'Cape Verde', 'Seychelles', 'Mauritius', 'Comoros', 'Gambia', 'Liberia', 'Sierra Leone', 'Benin', 'Togo', 'Equatorial Guinea', 'Gabon', 'Congo', 'Central African Republic', 'Sao Tome and Principe', 'Guinea', 'Guinea-Bissau', 'Burkina Faso'],
  postcodeFormats: ['%###'],
  provinces: ['iMpuma-Kapa', 'Freistata', 'eGoli', 'iKwaZulu-Natali', 'Limpopo', 'iMpumalanga', 'Bokone Bophirima', 'Noord-Kaap', 'Wes-Kaap'],
  secondaryAddressFormats: ['Flat #%#', 'Unit #%#', 'Suite #%#'],
  section_formats: [''],
  streetAddressFormats: ['{{building_number}} {{street_name}} {{street_suffix}}'],
  streetNames: ['Main', 'Church', 'President', 'Voortrekker', 'Nelson Mandela', 'Albertina Sisulu', 'Rivonia', 'Jan Smuts', 'Commissioner', 'Long', 'High', 'Short', 'Victoria', 'Queen', 'King', 'Oxford', 'George', 'William', 'York', 'Smith', 'Adelaide', 'Charles', 'Churchill', 'Cecil', 'Clarence', 'Edward', 'Elizabeth', 'Frere', 'Gandhi', 'Grey', 'James', 'Joseph', 'Milner', 'Napier', 'Paul Kruger', 'Prince', 'Somerset', 'Stanley', 'Thomas', 'Walter Sisulu', 'West'],
  streetSuffixes: ['Umgwaqo', 'Indlela', 'Isitaladi', 'Ithafa', 'Indawo'],
};
