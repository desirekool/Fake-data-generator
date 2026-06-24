import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { automotive } from "./automotive";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const lt_LT: LocaleData = {
  ...en_US,
  ...automotive,
  ...person,
  ...phone_number,
  ...ssn,
};
