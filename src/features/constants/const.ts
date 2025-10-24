// Gender constants
export const GENDER = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
  PREFER_NOT_TO_SAY: "prefer_not_to_say",
} as const;

export type Gender = typeof GENDER[keyof typeof GENDER];

// Marital Status constants
export const MARITAL_STATUS = {
  SINGLE: "single",
  MARRIED: "married",
  DIVORCED: "divorced",
  WIDOWED: "widowed",
  SEPARATED: "separated",
} as const;

export type MaritalStatus = typeof MARITAL_STATUS[keyof typeof MARITAL_STATUS];

// Housing Status constants
export const HOUSING_STATUS = {
  OWNED: "owned",
  RENTED: "rented",
  SHARED: "shared",
  TEMPORARY: "temporary",
  HOMELESS: "homeless",
} as const;

export type HousingStatus = typeof HOUSING_STATUS[keyof typeof HOUSING_STATUS];

// Employment Status constants
export const EMPLOYMENT_STATUS = {
  EMPLOYED: "employed",
  UNEMPLOYED: "unemployed",
  SELF_EMPLOYED: "self_employed",
  STUDENT: "student",
  RETIRED: "retired",
  DISABLED: "disabled",
} as const;

export type EmploymentStatus = typeof EMPLOYMENT_STATUS[keyof typeof EMPLOYMENT_STATUS];

// Assistance Type constants
export const ASSISTANCE_TYPE = {
  FINANCIAL_AID: "financial_aid",
  HOUSING_ASSISTANCE: "housing_assistance",
  MEDICAL_SUPPORT: "medical_support",
  FOOD_ASSISTANCE: "food_assistance",
  EDUCATION_SUPPORT: "education_support",
  EMPLOYMENT_SERVICES: "employment_services",
} as const;

export type AssistanceType = typeof ASSISTANCE_TYPE[keyof typeof ASSISTANCE_TYPE];

// Request Priority constants
export const REQUEST_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
} as const;

export type RequestPriority = typeof REQUEST_PRIORITY[keyof typeof REQUEST_PRIORITY];

// Request Status constants
export const REQUEST_STATUS = {
  DRAFT: "draft",
  SUBMITTED: "submitted",
  UNDER_REVIEW: "under_review",
  APPROVED: "approved",
  REJECTED: "rejected",
  ON_HOLD: "on_hold",
  COMPLETED: "completed",
} as const;

export type RequestStatus = typeof REQUEST_STATUS[keyof typeof REQUEST_STATUS];

// Urgency Level constants
export const URGENCY_LEVEL = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
} as const;

export type UrgencyLevel = typeof URGENCY_LEVEL[keyof typeof URGENCY_LEVEL];

// Document Category constants
export const DOCUMENT_CATEGORY = {
  IDENTITY: "identity",
  INCOME: "income",
  RESIDENCE: "residence",
  MEDICAL: "medical",
  EDUCATION: "education",
  OTHER: "other",
} as const;

export type DocumentCategory = typeof DOCUMENT_CATEGORY[keyof typeof DOCUMENT_CATEGORY];
