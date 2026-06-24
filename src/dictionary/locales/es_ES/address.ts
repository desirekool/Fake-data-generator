import type { LocaleData } from "../../types";

export const address: Partial<LocaleData> = {
  addressFormats: ['{{street_address}}\n{{city}}, {{postcode}}'],
  buildingNumberFormats: ['%', '%#', '%#', '%#', '%##'],
  cityFormats: ['{{state_name}}'],
  regions: ['Andalucía', 'Aragón', 'Principado de Asturias', 'Illes Balears', 'Canarias', 'Cantabria', 'Castilla y León', 'Castilla-La Mancha', 'Cataluña', 'Comunitat Valenciana', 'Extremadura', 'Galicia', 'Comunidad de Madrid', 'Región de Murcia', 'Comunidad Foral de Navarra', 'País Vasco', 'La Rioja', 'Ciudad Autónoma de Ceuta', 'Ciudad Autónoma de Melilla'],
  secondaryAddressFormats: ['Apt. ##', 'Piso #', 'Puerta #'],
  states: ['Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Baleares', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ceuta', 'Ciudad', 'Córdoba', 'Cuenca', 'Girona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Jaén', 'La Coruña', 'La Rioja', 'Las Palmas', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Melilla', 'Murcia', 'Navarra', 'Ourense', 'Palencia', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'],
  streetAddressFormats: ['{{street_name}} {{building_number}}', '{{street_name}} {{building_number}} {{secondary_address}} '],
  streetNameFormats: ['{{street_prefix}} {{first_name}} {{last_name}}', '{{street_prefix}} de {{first_name}} {{last_name}}'],
  streetPrefixes: ['Plaza', 'Calle', 'Avenida', 'Via', 'Vial', 'Rambla', 'Glorieta', 'Urbanización', 'Callejón', 'Cañada', 'Alameda', 'Acceso', 'C.', 'Ronda', 'Pasaje', 'Cuesta', 'Pasadizo', 'Paseo', 'Camino'],
};
