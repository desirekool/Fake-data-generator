import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { company } from "./company";
import { currency } from "./currency";
import { geo } from "./geo";
import { job } from "./job";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const fr_DZ: LocaleData = {
  ...en_US,
  ...address,
  ...company,
  ...currency,
  ...geo,
  ...job,
  ...person,
  ...phone_number,
};
