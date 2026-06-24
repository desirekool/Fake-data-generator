import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { currency } from "./currency";
import { internet } from "./internet";
import { phone_number } from "./phone_number";

export const en_AU: LocaleData = {
  ...en_US,
  ...address,
  ...currency,
  ...internet,
  ...phone_number,
};
