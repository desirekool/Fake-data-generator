import type { LocaleData } from "../types";

export const dateTime: Partial<LocaleData> = {
  dateFormats: ["Y-m-d"],
  timeFormats: ["H:i:s"],
  dayNames: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  centuryNames: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"],
  timezones: ["UTC"],
};
