import type { LocaleData } from "../../types";

export const person: Partial<LocaleData> = {
  firstNamesFemale: ['Ngọc', 'Hương', 'Lan', 'Mai', 'Thảo', 'Linh', 'Hồng', 'Chi', 'Vân', 'Duyên', 'Dương', 'Yến', 'Vi', 'Ánh', 'Xuân'],
  firstNamesMale: ['Nam', 'Hưng', 'Vũ', 'Tú', 'Hoàng', 'Phúc', 'Trung', 'Quang', 'Anh', 'Khoa', 'Dũng', 'Quang', 'Thành', 'Huy', 'Bảo', 'Châu', 'Minh', 'Tùng', 'Nhiên', 'Trọng'],
  first_names_unisex: ['An', 'Hà', 'Bảo', 'Lâm', 'Hạnh', 'Thành', 'Kim', 'Nhật', 'Phương', 'Khoa', 'Hải', 'Nhật'],
  formatsFemale: ['{{first_name_female}} {{last_name}}', '{{first_name_unisex}} {{last_name}}', '{{prefix_female}} {{first_name_unisex}} {{last_name}}', '{{prefix_female}} {{first_name_female}} {{last_name}}'],
  formatsMale: ['{{first_name_male}} {{last_name}}', '{{first_name_male}} {{middle_name}} {{last_name}}', '{{first_name_unisex}} {{middle_name}} {{last_name}}', '{{prefix_male}} {{first_name_male}} {{last_name}}'],
  lastNames: ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Vũ', 'Đặng', 'Bùi', 'Dương', 'Mai', 'Hoàng'],
  middle_names: ['Văn', 'Thị', 'Quang', 'Đức', 'Trí', 'Xuân', 'Hoàng', 'Hải', 'Đức', 'Thế', 'Tấn', 'Phú', 'Hữu', 'Bảo', 'Mai', 'Mai Bảo'],
  nameFormats: ['{{first_name_female}} {{last_name}}', '{{first_name_unisex}} {{last_name}}', '{{prefix_female}} {{first_name_unisex}} {{last_name}}', '{{prefix_female}} {{first_name_female}} {{last_name}}', '{{first_name_male}} {{last_name}}', '{{first_name_male}} {{middle_name}} {{last_name}}', '{{first_name_unisex}} {{middle_name}} {{last_name}}', '{{prefix_male}} {{first_name_male}} {{last_name}}'],
  prefixesFemale: ['Cô', 'Chị', 'Bà', 'Quý cô'],
  prefixesMale: ['Ông', 'Anh', 'Bác', 'Quý ông'],
};
