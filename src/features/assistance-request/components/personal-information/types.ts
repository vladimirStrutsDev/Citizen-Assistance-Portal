export const GENDER = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
  PREFER_NOT_TO_SAY: "prefer_not_to_say",
} as const;

export type Gender = typeof GENDER[keyof typeof GENDER];

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

export interface PersonalInfoStep {
  fullName: string;
  nationalId: string;
  dateOfBirth: string;
  gender: Gender;
  contactInfo: ContactInformation;
  address: AddressInformation;
}
