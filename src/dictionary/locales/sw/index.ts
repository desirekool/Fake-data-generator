import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { person } from "./person";

export const sw: LocaleData = {
  ...en_US,
  ...person,
};
