import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { date_time } from "./date_time";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const ta_IN: LocaleData = {
  ...en_US,
  ...address,
  ...date_time,
  ...person,
  ...phone_number,
};
