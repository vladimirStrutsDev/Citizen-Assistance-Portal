import { type BaseEntity } from "../../../shared/types";
import {
  type RequestPriority,
  type RequestStatus,
} from "../../constants/const";
import type { MaritalStatus, HousingStatus, EmploymentStatus, FamilyFinancialStep } from "../components/family-financial/types";
import type { Gender, PersonalInfoStep } from "../components/personal-information/types";
import type { AssistanceType, DocumentCategory, UrgencyLevel, RequestDetailsStep } from "../components/request-details/types";

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

// Состояние для Redux store
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
