import { type BaseEntity } from "../../../shared/types";

export interface CitizenProfile extends BaseEntity {
  fullName: string;
  nationalId: string;
  dateOfBirth: Date;
  gender: Gender;
  contactInfo: ContactInformation;
  address: AddressInformation;
  familyInfo: FamilyInformation;
  financialInfo: FinancialInformation;
  employmentInfo: EmploymentInformation;
}

export interface ContactInformation {
  primaryPhone: string;
  secondaryPhone?: string;
  emailAddress: string;
  preferredContactMethod: "phone" | "email" | "sms";
}

export interface AddressInformation {
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isCurrentAddress: boolean;
}

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

export interface AssistanceRequest extends BaseEntity {
  citizenId: string;
  requestType: AssistanceType;
  priority: RequestPriority;
  status: RequestStatus;
  description: string;
  supportingDocuments: DocumentAttachment[];
  financialImpact: FinancialImpactAssessment;
  timeline: RequestTimeline;
  assignedCaseWorker?: string;
  reviewNotes: ReviewNote[];
}

export interface DocumentAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: Date;
  isVerified: boolean;
  category: DocumentCategory;
}

export interface FinancialImpactAssessment {
  estimatedMonthlyBenefit: number;
  currentFinancialStrain: number;
  urgencyLevel: UrgencyLevel;
  justification: string;
}

export interface RequestTimeline {
  submittedAt: Date;
  firstReviewAt?: Date;
  estimatedProcessingTime: number;
  expectedResolutionDate?: Date;
  actualResolutionDate?: Date;
}

export interface ReviewNote {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
  isInternal: boolean;
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
  PREFER_NOT_TO_SAY = "prefer_not_to_say",
}

export enum MaritalStatus {
  SINGLE = "single",
  MARRIED = "married",
  DIVORCED = "divorced",
  WIDOWED = "widowed",
  SEPARATED = "separated",
}

export enum HousingStatus {
  OWNED = "owned",
  RENTED = "rented",
  SHARED = "shared",
  TEMPORARY = "temporary",
  HOMELESS = "homeless",
}

export enum EmploymentStatus {
  EMPLOYED = "employed",
  UNEMPLOYED = "unemployed",
  SELF_EMPLOYED = "self_employed",
  STUDENT = "student",
  RETIRED = "retired",
  DISABLED = "disabled",
}

export enum AssistanceType {
  FINANCIAL_AID = "financial_aid",
  HOUSING_ASSISTANCE = "housing_assistance",
  MEDICAL_SUPPORT = "medical_support",
  FOOD_ASSISTANCE = "food_assistance",
  EDUCATION_SUPPORT = "education_support",
  EMPLOYMENT_SERVICES = "employment_services",
}

export enum RequestPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export enum RequestStatus {
  DRAFT = "draft",
  SUBMITTED = "submitted",
  UNDER_REVIEW = "under_review",
  APPROVED = "approved",
  REJECTED = "rejected",
  ON_HOLD = "on_hold",
  COMPLETED = "completed",
}

export enum UrgencyLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum DocumentCategory {
  IDENTITY = "identity",
  INCOME = "income",
  RESIDENCE = "residence",
  MEDICAL = "medical",
  EDUCATION = "education",
  OTHER = "other",
}

export interface PersonalInfoStep {
  fullName: string;
  nationalId: string;
  dateOfBirth: string;
  gender: Gender;
  contactInfo: ContactInformation;
  address: AddressInformation;
}

export interface FamilyFinancialStep {
  familyInfo: FamilyInformation;
  financialInfo: FinancialInformation;
  employmentInfo: EmploymentInformation;
}

export interface RequestDetailsStep {
  requestType: AssistanceType;
  description: string;
  urgencyLevel: UrgencyLevel;
  supportingDocuments: DocumentAttachment[];
}

export interface AssistanceRequestState {
  currentStep: number;
  totalSteps: number;
  formData: Partial<
    PersonalInfoStep & FamilyFinancialStep & RequestDetailsStep
  >;
  isLoading: boolean;
  error: string | null;
  validationErrors: Record<string, string>;
}

export interface CreateAssistanceRequestRequest {
  citizenProfile: CitizenProfile;
  requestDetails: RequestDetailsStep;
}

export interface UpdateAssistanceRequestRequest {
  requestId: string;
  updates: Partial<AssistanceRequest>;
}

export interface GetAssistanceRequestsRequest {
  citizenId?: string;
  status?: RequestStatus;
  requestType?: AssistanceType;
  page?: number;
  limit?: number;
}
