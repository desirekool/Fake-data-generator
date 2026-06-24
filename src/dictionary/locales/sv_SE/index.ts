import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { company } from "./company";
import { currency } from "./currency";
import { internet } from "./internet";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const sv_SE: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...company,
  ...currency,
  ...internet,
  ...person,
  ...phone_number,
  ...ssn,
};
