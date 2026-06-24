import type { LocaleData } from "../types";
import { person } from "./person";
import { address } from "./address";
import { company } from "./company";
import { internet } from "./internet";
import { bank } from "./bank";
import { phoneNumber } from "./phone-number";
import { color } from "./color";
import { job } from "./job";
import { automotive } from "./automotive";
import { lorem } from "./lorem";
import { geo } from "./geo";
import { currency } from "./currency";
import { creditCard } from "./credit-card";
import { passport } from "./passport";
import { ssn } from "./ssn";
import { profile } from "./profile";
import { userAgent } from "./user-agent";
import { dateTime } from "./date-time";

export const base: LocaleData = {
  ...person,
  ...address,
  ...company,
  ...internet,
  ...bank,
  ...phoneNumber,
  ...color,
  ...job,
  ...automotive,
  ...lorem,
  ...geo,
  ...currency,
  ...creditCard,
  ...passport,
  ...ssn,
  ...profile,
  ...userAgent,
  ...dateTime,
};
