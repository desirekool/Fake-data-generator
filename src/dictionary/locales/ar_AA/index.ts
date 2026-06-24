import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { date_time } from "./date_time";
import { internet } from "./internet";
import { job } from "./job";
import { lorem } from "./lorem";
import { person } from "./person";

export const ar_AA: LocaleData = {
  ...en_US,
  ...date_time,
  ...internet,
  ...job,
  ...lorem,
  ...person,
};
