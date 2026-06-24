import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { phone_number } from "./phone_number";

export const ar_AE: LocaleData = {
  ...en_US,
  ...phone_number,
};
