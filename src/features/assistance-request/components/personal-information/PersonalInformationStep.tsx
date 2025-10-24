import type { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../../core/store";
import {
  clearValidationError,
  setValidationError,
  updatePersonalInfo,
  nextStep,
} from "../../../../core/store/slices/assistanceRequestSlice";
import Button from "../../../../shared/components/Button";
import { type PersonalInfoStep } from "../../types";
import { GENDER } from "../../../constants/const";
import PersonalDetailsSection from "./components/PersonalDetailsSection";
import ContactInformationSection from "./components/ContactInformationSection";
import AddressInformationSection from "./components/AddressInformationSection";

const PersonalInformationStep: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formData = useSelector(
    (state: RootState) => state.assistanceRequest.formData
  );
  const validationErrors = useSelector(
    (state: RootState) => state.assistanceRequest.validationErrors
  );

  const methods = useForm<PersonalInfoStep>({
    defaultValues: {
      fullName: formData.fullName || "",
      nationalId: formData.nationalId || "",
      dateOfBirth: formData.dateOfBirth || "",
      gender: formData.gender || GENDER.MALE,
      contactInfo: {
        primaryPhone: formData.contactInfo?.primaryPhone || "",
        emailAddress: formData.contactInfo?.emailAddress || "",
        preferredContactMethod:
          formData.contactInfo?.preferredContactMethod || "phone",
      },
      address: {
        streetAddress: formData.address?.streetAddress || "",
        city: formData.address?.city || "",
        state: formData.address?.state || "",
        country: formData.address?.country || "",
        postalCode: formData.address?.postalCode || "",
        isCurrentAddress: formData.address?.isCurrentAddress ?? true,
      },
    },
  });

  const validateForm = (data: PersonalInfoStep): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    Object.keys(validationErrors).forEach((field) => {
      if (field.startsWith("personalInfo.")) {
        dispatch(clearValidationError(field));
      }
    });

    if (!data.fullName.trim()) {
      newErrors["personalInfo.fullName"] = t("validation.fullNameRequired");
      isValid = false;
    }

    if (!data.nationalId.trim()) {
      newErrors["personalInfo.nationalId"] = t("validation.nationalIdRequired");
      isValid = false;
    }

    if (!data.dateOfBirth) {
      newErrors["personalInfo.dateOfBirth"] = t(
        "validation.dateOfBirthRequired"
      );
      isValid = false;
    }

    if (!data.contactInfo.primaryPhone.trim()) {
      newErrors["personalInfo.contactInfo.primaryPhone"] = t(
        "validation.phoneRequired"
      );
      isValid = false;
    }

    if (!data.contactInfo.emailAddress.trim()) {
      newErrors["personalInfo.contactInfo.emailAddress"] = t(
        "validation.emailRequired"
      );
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactInfo.emailAddress)
    ) {
      newErrors["personalInfo.contactInfo.emailAddress"] = t(
        "validation.emailInvalid"
      );
      isValid = false;
    }

    if (!data.address.streetAddress.trim()) {
      newErrors["personalInfo.address.streetAddress"] = t(
        "validation.addressRequired"
      );
      isValid = false;
    }

    if (!data.address.city.trim()) {
      newErrors["personalInfo.address.city"] = t("validation.cityRequired");
      isValid = false;
    }

    if (!data.address.country.trim()) {
      newErrors["personalInfo.address.country"] = t(
        "validation.countryRequired"
      );
      isValid = false;
    }

    Object.entries(newErrors).forEach(([field, error]) => {
      dispatch(setValidationError({ field, error }));
    });

    return isValid;
  };

  const onSubmit = (data: PersonalInfoStep) => {
    if (validateForm(data)) {
      dispatch(updatePersonalInfo(data));
      dispatch(nextStep());
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    methods.setValue(field as keyof PersonalInfoStep, value);

    const errorField = `personalInfo.${field}`;
    if (validationErrors[errorField]) {
      dispatch(clearValidationError(errorField));
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("steps.personalInformation.title")}
          </h2>
          <p className="text-gray-600">
            {t("steps.personalInformation.description")}
          </p>
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <PersonalDetailsSection
            validationErrors={validationErrors}
            onFieldChange={handleFieldChange}
          />

          <ContactInformationSection
            validationErrors={validationErrors}
            onFieldChange={handleFieldChange}
          />

          <AddressInformationSection
            validationErrors={validationErrors}
            onFieldChange={handleFieldChange}
          />

          <div className="flex justify-end pt-6">
            <Button type="submit" size="lg">
              {t("actions.continue")}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default PersonalInformationStep;
