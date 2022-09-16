import diagnoseData from "./data/diagnoses";
import { diagnoseEntry } from "./src/types";

const getDiagnoses = (): Array<diagnoseEntry> => {
  return diagnoseData;
};

export default {
  getDiagnoses,
};
