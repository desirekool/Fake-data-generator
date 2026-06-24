import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { bank } from "./bank";
import { company } from "./company";
import { currency } from "./currency";
import { date_time } from "./date_time";
import { internet } from "./internet";
import { lorem } from "./lorem";
import { passport } from "./passport";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const it_IT: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...bank,
  ...company,
  ...currency,
  ...date_time,
  ...internet,
  ...lorem,
  ...passport,
  ...person,
  ...phone_number,
  ...ssn,
};
