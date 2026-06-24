import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { bank } from "./bank";
import { color } from "./color";
import { company } from "./company";
import { currency } from "./currency";
import { internet } from "./internet";
import { job } from "./job";
import { lorem } from "./lorem";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const th_TH: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...bank,
  ...color,
  ...company,
  ...currency,
  ...internet,
  ...job,
  ...lorem,
  ...person,
  ...phone_number,
};
