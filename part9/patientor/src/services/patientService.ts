import patients from "../../data/patients";
import { NonSensitivePatientEntry, patientEntry } from "../types";

const getPatients = (): Array<patientEntry> => {
  return patients;
};

const getNonSensitiveData = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
  getNonSensitiveData,
};
