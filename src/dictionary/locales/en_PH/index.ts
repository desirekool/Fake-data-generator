import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { bank } from "./bank";
import { company } from "./company";
import { internet } from "./internet";
import { lorem } from "./lorem";
import { misc } from "./misc";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const en_PH: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...bank,
  ...company,
  ...internet,
  ...lorem,
  ...misc,
  ...phone_number,
  ...ssn,
};
