import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { color } from "./color";
import { company } from "./company";
import { internet } from "./internet";
import { job } from "./job";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const hu_HU: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...color,
  ...company,
  ...internet,
  ...job,
  ...person,
  ...phone_number,
  ...ssn,
};
