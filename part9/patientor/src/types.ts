export interface diagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface patientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  ssn: string;
}

export type NonSensitivePatientEntry = Omit<patientEntry, "ssn">;
