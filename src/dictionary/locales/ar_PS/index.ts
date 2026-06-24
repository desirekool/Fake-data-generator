import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { automotive } from "./automotive";
import { color } from "./color";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const ar_PS: LocaleData = {
  ...en_US,
  ...automotive,
  ...color,
  ...person,
  ...phone_number,
};
