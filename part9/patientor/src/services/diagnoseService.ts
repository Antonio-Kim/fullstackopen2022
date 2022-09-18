import diagnoseData from "../../data/diagnoses";
import { diagnoseEntry } from "../types";

const getDiagnoses = (): Array<diagnoseEntry> => {
  return diagnoseData;
};

export default {
  getDiagnoses,
};
