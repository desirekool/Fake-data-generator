import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { bank } from "./bank";
import { color } from "./color";
import { company } from "./company";
import { credit_card } from "./credit_card";
import { currency } from "./currency";
import { date_time } from "./date_time";
import { internet } from "./internet";
import { job } from "./job";
import { lorem } from "./lorem";
import { passport } from "./passport";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const ru_RU: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...bank,
  ...color,
  ...company,
  ...credit_card,
  ...currency,
  ...date_time,
  ...internet,
  ...job,
  ...lorem,
  ...passport,
  ...person,
  ...phone_number,
  ...ssn,
};
