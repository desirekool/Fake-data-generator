import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { bank } from "./bank";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const en_IN: LocaleData = {
  ...en_US,
  ...address,
  ...bank,
  ...person,
  ...phone_number,
  ...ssn,
};
