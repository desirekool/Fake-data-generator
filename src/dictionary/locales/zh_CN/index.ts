import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { bank } from "./bank";
import { company } from "./company";
import { credit_card } from "./credit_card";
import { date_time } from "./date_time";
import { internet } from "./internet";
import { job } from "./job";
import { lorem } from "./lorem";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const zh_CN: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...bank,
  ...company,
  ...credit_card,
  ...date_time,
  ...internet,
  ...job,
  ...lorem,
  ...person,
  ...phone_number,
  ...ssn,
};
