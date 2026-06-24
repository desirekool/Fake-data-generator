import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { bank } from "./bank";
import { color } from "./color";
import { company } from "./company";
import { credit_card } from "./credit_card";
import { currency } from "./currency";
import { internet } from "./internet";
import { job } from "./job";
import { lorem } from "./lorem";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const fa_IR: LocaleData = {
  ...en_US,
  ...address,
  ...bank,
  ...color,
  ...company,
  ...credit_card,
  ...currency,
  ...internet,
  ...job,
  ...lorem,
  ...person,
  ...phone_number,
};
