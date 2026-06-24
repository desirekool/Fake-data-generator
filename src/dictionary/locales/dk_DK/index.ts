import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { ssn } from "./ssn";

export const dk_DK: LocaleData = {
  ...en_US,
  ...ssn,
};
