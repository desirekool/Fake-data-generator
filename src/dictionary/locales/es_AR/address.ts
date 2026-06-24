import type { LocaleData } from "../../types";

export const address: Partial<LocaleData> = {
  buildingNumberFormats: {'%%': 0.2, '%%#': 0.2, '%#%': 0.2, '%#%#': 0.2},
  municipalities: [['1004', 'Constitución', 'CABA'], ['1900', 'La Plata', 'BA'], ['7600', 'Mar del Plata', 'BA'], ['8000', 'Bahía Blanca', 'BA'], ['4700', 'San Ferando del Valle de Catamarca', 'CA'], ['3500', 'Resistencia', 'CH'], ['9103', 'Rawson', 'CT'], ['9000', 'Comodoro Rivadavia', 'CT'], ['5000', 'Córdoba', 'CB'], ['3400', 'Corrientes', 'CR'], ['3100', 'Paraná', 'ER'], ['3600', 'Formosa', 'FO'], ['4600', 'San Salvador de Jujuy', 'JY'], ['6300', 'Santa Rosa', 'LP'], ['5300', 'La Rioja', 'LR'], ['5360', 'Chilecito', 'LR'], ['5500', 'Mendoza', 'MZ'], ['3300', 'Posadas', 'MI'], ['8300', 'Neuquén', 'NQN'], ['8500', 'Viedma', 'RN'], ['4400', 'Salta', 'SA'], ['5400', 'San Juan', 'SJ'], ['5700', 'San Luis', 'SL'], ['5881', 'Merlo', 'SL'], ['9400', 'Río Gallegos', 'SC'], ['3000', 'Santa Fe', 'SF'], ['2000', 'Rosario', 'SF'], ['4200', 'Santiago del Estero', 'SE'], ['9410', 'Ushuaia', 'TF'], ['4000', 'San Miguel de Tucumán', 'TU']],
  postcodeFormats: ['{{municipality_code}}####'],
  provinces: {'CABA': 'Ciudad Autónoma de Buenos Aires', 'BA': 'Buenos Aires', 'CA': 'Catamarca', 'CH': 'Chaco', 'CT': 'Chubut', 'CB': 'Córdoba', 'CR': 'Corrientes', 'ER': 'Entre Ríos', 'FO': 'Formosa', 'JY': 'Jujuy', 'LP': 'La Pampa', 'LR': 'La Rioja', 'MZ': 'Mendoza', 'MI': 'Misiones', 'NQN': 'Neuquén', 'RN': 'Río Negro', 'SA': 'Salta', 'SJ': 'San Juan', 'SL': 'San Luis', 'SC': 'Santa Cruz', 'SF': 'Santa Fe', 'SE': 'Santiago del Estero', 'TF': 'Tierra del Fuego', 'TU': 'Tucumán'},
  secondaryAddressFormats: ['Piso % Dto. %', 'Dto. %', 'Torre % Dto. %', 'Local %!', 'Oficina %!'],
  streetNameFormats: {'{{street_prefix}} %': 0.2, '{{street_prefix}} {{street_municipality}}': 0.2, '{{street_prefix}} {{street_province}}': 0.2, '{{street_prefix}} {{street_procer}}': 0.2, '{{street_prefix}} 1## {{street_suffix}}': 0.02},
  streetPrefixes: {'Calle': 0.2, 'Avenida': 0.2, 'Av.': 0.2, 'Diagonal': 0.2, 'Diag.': 0.05, 'Camino': 0.05, 'Boulevard': 0.05, 'Blv.': 0.05},
  streetSuffixes: ['A', 'B', 'Bis'],
  street_proceres: ['San Martin', 'Belgrano', 'Saavedra', 'Rivadavia', 'Güemes', 'G. Brown', 'J.B. Alberdi', 'J.M. de Rosas', 'J.J. Castelli', 'Mitre', 'Alem', 'Alvear', 'Malvinas Argentinas', 'Pte. Perón', 'Omar Nuñez'],
};
