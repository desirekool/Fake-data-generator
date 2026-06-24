import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { bank } from "./bank";
import { color } from "./color";
import { company } from "./company";
import { currency } from "./currency";
import { date_time } from "./date_time";
import { geo } from "./geo";
import { internet } from "./internet";
import { job } from "./job";
import { lorem } from "./lorem";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const bn_BD: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...bank,
  ...color,
  ...company,
  ...currency,
  ...date_time,
  ...geo,
  ...internet,
  ...job,
  ...lorem,
  ...person,
  ...phone_number,
  ...ssn,
};
