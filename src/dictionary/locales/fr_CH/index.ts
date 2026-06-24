import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { company } from "./company";
import { internet } from "./internet";
import { job } from "./job";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const fr_CH: LocaleData = {
  ...en_US,
  ...address,
  ...company,
  ...internet,
  ...job,
  ...person,
  ...phone_number,
  ...ssn,
};
