export const ASSISTANCE_TYPE = {
  FINANCIAL_AID: "financial_aid",
  HOUSING_ASSISTANCE: "housing_assistance",
  MEDICAL_SUPPORT: "medical_support",
  FOOD_ASSISTANCE: "food_assistance",
  EDUCATION_SUPPORT: "education_support",
  EMPLOYMENT_SERVICES: "employment_services",
} as const;

export type AssistanceType = typeof ASSISTANCE_TYPE[keyof typeof ASSISTANCE_TYPE];

export const URGENCY_LEVEL = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
} as const;

export type UrgencyLevel = typeof URGENCY_LEVEL[keyof typeof URGENCY_LEVEL];

export const DOCUMENT_CATEGORY = {
  IDENTITY: "identity",
  INCOME: "income",
  RESIDENCE: "residence",
  MEDICAL: "medical",
  EDUCATION: "education",
  OTHER: "other",
} as const;

export type DocumentCategory = typeof DOCUMENT_CATEGORY[keyof typeof DOCUMENT_CATEGORY];

export interface DocumentAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: Date;
  isVerified: boolean;
  category: DocumentCategory;
}

export interface RequestDetailsStep {
  requestType: AssistanceType;
  description: string;
  urgencyLevel: UrgencyLevel;
  supportingDocuments: DocumentAttachment[];
}
