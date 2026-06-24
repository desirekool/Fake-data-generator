import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { color } from "./color";
import { company } from "./company";
import { currency } from "./currency";
import { date_time } from "./date_time";
import { internet } from "./internet";
import { job } from "./job";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const pt_BR: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...color,
  ...company,
  ...currency,
  ...date_time,
  ...internet,
  ...job,
  ...person,
  ...phone_number,
};
