import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { color } from "./color";
import { company } from "./company";
import { date_time } from "./date_time";
import { job } from "./job";
import { lorem } from "./lorem";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const hy_AM: LocaleData = {
  ...en_US,
  ...address,
  ...color,
  ...company,
  ...date_time,
  ...job,
  ...lorem,
  ...person,
  ...phone_number,
};
