import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { bank } from "./bank";
import { color } from "./color";
import { credit_card } from "./credit_card";
import { currency } from "./currency";
import { internet } from "./internet";
import { job } from "./job";
import { lorem } from "./lorem";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const uk_UA: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...bank,
  ...color,
  ...credit_card,
  ...currency,
  ...internet,
  ...job,
  ...lorem,
  ...person,
  ...phone_number,
};
