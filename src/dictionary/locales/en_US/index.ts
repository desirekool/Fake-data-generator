import { en } from "../en";
import type { LocaleData } from "../../types";
import { color } from "./color";
import { company } from "./company";
import { currency } from "./currency";
import { dateTime } from "./date-time";
import { address } from "./address";
import { lorem } from "./lorem";
import { passport } from "./passport";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const en_US: LocaleData = {
  ...en,
  ...color,
  ...company,
  ...currency,
  ...dateTime,
  ...address,
  ...lorem,
  ...passport,
  ...phone_number,
  ...ssn,
};
