import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { bank } from "./bank";
import { company } from "./company";
import { lorem } from "./lorem";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const nl_BE: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...bank,
  ...company,
  ...lorem,
  ...person,
  ...phone_number,
  ...ssn,
};
