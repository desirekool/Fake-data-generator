import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { color } from "./color";
import { date_time } from "./date_time";
import { job } from "./job";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const ka_GE: LocaleData = {
  ...en_US,
  ...address,
  ...color,
  ...date_time,
  ...job,
  ...person,
  ...phone_number,
};
