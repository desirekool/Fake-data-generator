import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { color } from "./color";
import { currency } from "./currency";
import { date_time } from "./date_time";
import { job } from "./job";
import { person } from "./person";

export const es: LocaleData = {
  ...en_US,
  ...address,
  ...color,
  ...currency,
  ...date_time,
  ...job,
  ...person,
};
