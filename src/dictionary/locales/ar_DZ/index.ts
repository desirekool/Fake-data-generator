import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { company } from "./company";
import { currency } from "./currency";
import { date_time } from "./date_time";
import { geo } from "./geo";
import { job } from "./job";
import { person } from "./person";

export const ar_DZ: LocaleData = {
  ...en_US,
  ...address,
  ...company,
  ...currency,
  ...date_time,
  ...geo,
  ...job,
  ...person,
};
