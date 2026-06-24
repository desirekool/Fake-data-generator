import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { color } from "./color";
import { currency } from "./currency";
import { date_time } from "./date_time";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const uz_UZ: LocaleData = {
  ...en_US,
  ...color,
  ...currency,
  ...date_time,
  ...person,
  ...phone_number,
};
