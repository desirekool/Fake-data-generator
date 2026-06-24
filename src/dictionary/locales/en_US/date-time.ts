import type { LocaleData } from "../../types";

export const dateTime: Partial<LocaleData> = {
  dateFormats: [
    "Y-m-d", "m/d/Y", "m/d/y", "F j, Y", "j F Y", "d/m/Y", "d/m/y",
    "D M j Y", "l, F j, Y",
  ],
  timeFormats: [
    "H:i:s", "g:i:s A", "h:i:s A", "g:i A", "h:i A", "H:i",
  ],
  dayNames: [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  ],
  monthNames: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
  centuryNames: [
    "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
    "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX",
    "XX", "XXI",
  ],
  timezones: [
    "America/New_York", "America/Chicago", "America/Denver",
    "America/Los_Angeles", "America/Anchorage", "Pacific/Honolulu",
    "Europe/London", "Europe/Paris", "Europe/Berlin",
    "Europe/Moscow", "Asia/Tokyo", "Asia/Shanghai",
    "Asia/Kolkata", "Australia/Sydney", "Pacific/Auckland",
    "UTC", "America/Toronto", "America/Vancouver",
    "Europe/Amsterdam", "Europe/Madrid", "Europe/Rome",
    "Europe/Stockholm", "Europe/Zurich", "Asia/Dubai",
    "Asia/Singapore", "Asia/Hong_Kong", "Asia/Seoul",
    "Africa/Cairo", "Africa/Johannesburg", "Africa/Lagos",
    "America/Sao_Paulo", "America/Argentina/Buenos_Aires",
    "America/Mexico_City", "Pacific/Fiji",
  ],
};
