import { z } from "zod";
import { GENDER } from "../components/personal-information/types";
import { MARITAL_STATUS, HOUSING_STATUS, EMPLOYMENT_STATUS } from "../components/family-financial/types";
import { ASSISTANCE_TYPE, URGENCY_LEVEL, DOCUMENT_CATEGORY } from "../components/request-details/types";

export const personalInfoSchema = z.object({
  fullName: z.string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),
  nationalId: z.string()
    .min(10, "National ID must be at least 10 characters")
    .max(20, "National ID must be less than 20 characters"),
  dateOfBirth: z.string()
    .min(1, "Date of birth is required"),
  gender: z.enum([GENDER.MALE, GENDER.FEMALE, GENDER.OTHER, GENDER.PREFER_NOT_TO_SAY]),
  contactInfo: z.object({
    primaryPhone: z.string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
    secondaryPhone: z.string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format")
      .optional()
      .or(z.literal("")),
    emailAddress: z.string()
      .email("Invalid email address"),
    preferredContactMethod: z.enum(["phone", "email", "sms"]),
  }),
  address: z.object({
    streetAddress: z.string()
      .min(5, "Street address must be at least 5 characters")
      .max(200, "Street address must be less than 200 characters"),
    city: z.string()
      .min(2, "City must be at least 2 characters")
      .max(50, "City must be less than 50 characters"),
    state: z.string()
      .min(2, "State must be at least 2 characters")
      .max(50, "State must be less than 50 characters"),
    country: z.string()
      .min(2, "Country must be at least 2 characters")
      .max(50, "Country must be less than 50 characters"),
    postalCode: z.string()
      .min(3, "Postal code must be at least 3 characters")
      .max(20, "Postal code must be less than 20 characters"),
    isCurrentAddress: z.boolean(),
  }),
});

export const familyFinancialSchema = z.object({
  familyInfo: z.object({
    maritalStatus: z.enum([
      MARITAL_STATUS.SINGLE,
      MARITAL_STATUS.MARRIED,
      MARITAL_STATUS.DIVORCED,
      MARITAL_STATUS.WIDOWED,
      MARITAL_STATUS.SEPARATED,
    ]),
    numberOfDependents: z.number()
      .min(0, "Number of dependents cannot be negative")
      .max(20, "Number of dependents cannot exceed 20"),
    dependentDetails: z.array(z.object({
      name: z.string()
        .min(2, "Dependent name must be at least 2 characters")
        .max(100, "Dependent name must be less than 100 characters"),
      relationship: z.string()
        .min(2, "Relationship must be at least 2 characters")
        .max(50, "Relationship must be less than 50 characters"),
      age: z.number()
        .min(0, "Age cannot be negative")
        .max(120, "Age cannot exceed 120"),
      isStudent: z.boolean(),
    })).optional(),
  }),
  financialInfo: z.object({
    monthlyIncome: z.number()
      .min(0, "Monthly income cannot be negative")
      .max(1000000, "Monthly income seems too high"),
    currency: z.string()
      .min(3, "Currency must be at least 3 characters")
      .max(10, "Currency must be less than 10 characters"),
    hasSavings: z.boolean(),
    savingsAmount: z.number()
      .min(0, "Savings amount cannot be negative")
      .optional(),
    hasDebts: z.boolean(),
    debtAmount: z.number()
      .min(0, "Debt amount cannot be negative")
      .optional(),
    housingStatus: z.enum([
      HOUSING_STATUS.OWNED,
      HOUSING_STATUS.RENTED,
      HOUSING_STATUS.SHARED,
      HOUSING_STATUS.TEMPORARY,
      HOUSING_STATUS.HOMELESS,
    ]),
    otherIncomeSources: z.array(z.string()).optional(),
  }),
  employmentInfo: z.object({
    employmentStatus: z.enum([
      EMPLOYMENT_STATUS.EMPLOYED,
      EMPLOYMENT_STATUS.UNEMPLOYED,
      EMPLOYMENT_STATUS.SELF_EMPLOYED,
      EMPLOYMENT_STATUS.STUDENT,
      EMPLOYMENT_STATUS.RETIRED,
      EMPLOYMENT_STATUS.DISABLED,
    ]),
    employerName: z.string()
      .min(2, "Employer name must be at least 2 characters")
      .max(100, "Employer name must be less than 100 characters")
      .optional()
      .or(z.literal("")),
    jobTitle: z.string()
      .min(2, "Job title must be at least 2 characters")
      .max(100, "Job title must be less than 100 characters")
      .optional()
      .or(z.literal("")),
    workExperience: z.number()
      .min(0, "Work experience cannot be negative")
      .max(60, "Work experience cannot exceed 60 years"),
    isSelfEmployed: z.boolean(),
    businessType: z.string()
      .min(2, "Business type must be at least 2 characters")
      .max(100, "Business type must be less than 100 characters")
      .optional()
      .or(z.literal("")),
  }),
});

export const requestDetailsSchema = z.object({
  requestType: z.enum([
    ASSISTANCE_TYPE.FINANCIAL_AID,
    ASSISTANCE_TYPE.HOUSING_ASSISTANCE,
    ASSISTANCE_TYPE.MEDICAL_SUPPORT,
    ASSISTANCE_TYPE.FOOD_ASSISTANCE,
    ASSISTANCE_TYPE.EDUCATION_SUPPORT,
    ASSISTANCE_TYPE.EMPLOYMENT_SERVICES,
  ]),
  description: z.string()
    .min(50, "Description must be at least 50 characters")
    .max(2000, "Description must be less than 2000 characters"),
  urgencyLevel: z.enum([
    URGENCY_LEVEL.LOW,
    URGENCY_LEVEL.MEDIUM,
    URGENCY_LEVEL.HIGH,
    URGENCY_LEVEL.CRITICAL,
  ]),
  supportingDocuments: z.array(z.object({
    id: z.string(),
    fileName: z.string(),
    fileType: z.string(),
    fileSize: z.number(),
    uploadDate: z.date(),
    isVerified: z.boolean(),
    category: z.enum([
      DOCUMENT_CATEGORY.IDENTITY,
      DOCUMENT_CATEGORY.INCOME,
      DOCUMENT_CATEGORY.RESIDENCE,
      DOCUMENT_CATEGORY.MEDICAL,
      DOCUMENT_CATEGORY.EDUCATION,
      DOCUMENT_CATEGORY.OTHER,
    ]),
  })).optional(),
});

export const assistanceRequestSchema = z.object({
  personalInfo: personalInfoSchema,
  familyFinancial: familyFinancialSchema,
  requestDetails: requestDetailsSchema,
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type FamilyFinancialFormData = z.infer<typeof familyFinancialSchema>;
export type RequestDetailsFormData = z.infer<typeof requestDetailsSchema>;
export type AssistanceRequestFormData = z.infer<typeof assistanceRequestSchema>;
