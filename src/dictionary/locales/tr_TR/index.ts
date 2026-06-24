import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { automotive } from "./automotive";
import { bank } from "./bank";
import { company } from "./company";
import { currency } from "./currency";
import { date_time } from "./date_time";
import { geo } from "./geo";
import { internet } from "./internet";
import { job } from "./job";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const tr_TR: LocaleData = {
  ...en_US,
  ...automotive,
  ...bank,
  ...company,
  ...currency,
  ...date_time,
  ...geo,
  ...internet,
  ...job,
  ...person,
  ...phone_number,
};
