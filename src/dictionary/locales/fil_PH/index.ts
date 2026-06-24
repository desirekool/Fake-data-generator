import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { company } from "./company";
import { date_time } from "./date_time";
import { lorem } from "./lorem";

export const fil_PH: LocaleData = {
  ...en_US,
  ...company,
  ...date_time,
  ...lorem,
};
