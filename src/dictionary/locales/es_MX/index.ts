import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { bank } from "./bank";
import { company } from "./company";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const es_MX: LocaleData = {
  ...en_US,
  ...address,
  ...bank,
  ...company,
  ...person,
  ...phone_number,
  ...ssn,
};
