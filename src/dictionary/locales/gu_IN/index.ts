import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { date_time } from "./date_time";
import { person } from "./person";

export const gu_IN: LocaleData = {
  ...en_US,
  ...date_time,
  ...person,
};
