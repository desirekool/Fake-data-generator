import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { internet } from "./internet";
import { job } from "./job";
import { phone_number } from "./phone_number";

export const bs_BA: LocaleData = {
  ...en_US,
  ...internet,
  ...job,
  ...phone_number,
};
