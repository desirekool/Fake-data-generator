import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { bank } from "./bank";
import { company } from "./company";
import { date_time } from "./date_time";
import { internet } from "./internet";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const no_NO: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...bank,
  ...company,
  ...date_time,
  ...internet,
  ...person,
  ...phone_number,
  ...ssn,
};
