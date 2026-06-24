import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { company } from "./company";
import { internet } from "./internet";
import { job } from "./job";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const ko_KR: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...company,
  ...internet,
  ...job,
  ...person,
  ...phone_number,
  ...ssn,
};
