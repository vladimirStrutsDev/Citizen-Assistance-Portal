export const MARITAL_STATUS = {
  SINGLE: "single",
  MARRIED: "married",
  DIVORCED: "divorced",
  WIDOWED: "widowed",
  SEPARATED: "separated",
} as const;

export type MaritalStatus = typeof MARITAL_STATUS[keyof typeof MARITAL_STATUS];

export const HOUSING_STATUS = {
  OWNED: "owned",
  RENTED: "rented",
  SHARED: "shared",
  TEMPORARY: "temporary",
  HOMELESS: "homeless",
} as const;

export type HousingStatus = typeof HOUSING_STATUS[keyof typeof HOUSING_STATUS];

export const EMPLOYMENT_STATUS = {
  EMPLOYED: "employed",
  UNEMPLOYED: "unemployed",
  SELF_EMPLOYED: "self_employed",
  STUDENT: "student",
  RETIRED: "retired",
  DISABLED: "disabled",
} as const;

export type EmploymentStatus = typeof EMPLOYMENT_STATUS[keyof typeof EMPLOYMENT_STATUS];

export interface FamilyInformation {
  maritalStatus: MaritalStatus;
  numberOfDependents: number;
  dependentDetails: DependentInfo[];
}

export interface DependentInfo {
  name: string;
  relationship: string;
  age: number;
  isStudent: boolean;
}

export interface FinancialInformation {
  monthlyIncome: number;
  currency: string;
  hasSavings: boolean;
  savingsAmount?: number;
  hasDebts: boolean;
  debtAmount?: number;
  housingStatus: HousingStatus;
  otherIncomeSources: string[];
}

export interface EmploymentInformation {
  employmentStatus: EmploymentStatus;
  employerName?: string;
  jobTitle?: string;
  workExperience: number;
  isSelfEmployed: boolean;
  businessType?: string;
}

export interface FamilyFinancialStep {
  familyInfo: FamilyInformation;
  financialInfo: FinancialInformation;
  employmentInfo: EmploymentInformation;
}
