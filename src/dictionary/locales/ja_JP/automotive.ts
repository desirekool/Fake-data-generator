import type { LocaleData } from "../../types";

export const automotive: Partial<LocaleData> = {
  DELIMITER: '-',
  MIDDLE_DOT: '・',
  classification_numbers: ['###', '##'],
  licensePlateFormats: ['{{area_name}} {{classification_number}} {{kana}} {{serial_number}}'],
  license_plate_area_names: ['品川', '足立', '練馬', '横浜', '川崎', '名古屋', '大阪', '神戸', '福岡', '札幌', '尾張小牧', '伊勢志摩'],
  license_plate_kana: ['あ', 'い', 'う', 'え', 'か', 'き', 'く', 'け', 'こ', 'さ', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を'],
  serial_number_formats: ['#', '##', '###', '####'],
};
