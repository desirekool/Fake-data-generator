import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: {'{{random_company_adjective}} {{random_company_noun_chain}} {{company_type}} {{company_suffix}}': 0.24, '{{random_company_acronym}} {{random_company_noun_chain}} {{company_type}} {{company_suffix}}': 0.24, '{{last_name}} {{random_company_noun_chain}} {{company_type}} {{company_suffix}}': 0.16, '{{random_company_adjective}} {{company_type}} {{company_suffix}}': 0.12, '{{random_company_acronym}} {{company_type}} {{company_suffix}}': 0.12, '{{last_name}} {{company_type}} {{company_suffix}}': 0.09, 'National {{random_company_product}} Corporation of the Philippines': 0.03},
  companySuffixes: {'Inc.': 0.45, 'Corporation': 0.45, 'Limited': 0.1},
  company_adjectives: ['Advanced', 'Rising', 'Double', 'Triple', 'Quad', 'Allied', 'Cyber', 'Sovereign', 'Great', 'Far', 'Northern', 'Southern', 'Eastern', 'Western', 'First', 'Filipino', 'Grand', 'Manila', 'Mega', 'Metro', 'Global', 'Pacific', 'Oriental', 'Philippine', 'Prime'],
  company_nouns: ['Century', 'City', 'Crown', 'Dragon', 'Empire', 'Genesis', 'Gold', 'King', 'Liberty', 'Millennium', 'Morning', 'Silver', 'Star', 'State', 'Summit', 'Sun', 'Union', 'World'],
  company_products: ['Bottle', 'Coconut', 'Computer', 'Electricity', 'Flour', 'Furniture', 'Glass', 'Newspaper', 'Pillow', 'Water'],
  company_types: ['Bank', 'Banking', 'Capital', 'Company', 'Construction', 'Development', 'Enterprise', 'Equities', 'Finance', 'Foods', 'Group', 'Holdings', 'Hotel', 'Manufacturing', 'Mining', 'Properties', 'Resorts', 'Resources', 'Services', 'Shipping', 'Solutions', 'Technologies', 'Trust', 'Ventures'],
};
