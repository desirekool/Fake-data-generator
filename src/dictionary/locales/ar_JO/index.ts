import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { automotive } from "./automotive";
import { phone_number } from "./phone_number";

export const ar_JO: LocaleData = {
  ...en_US,
  ...automotive,
  ...phone_number,
};
