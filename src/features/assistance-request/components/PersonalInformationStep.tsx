import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../core/store";
import {
  clearValidationError,
  setValidationError,
  updatePersonalInfo,
  nextStep,
} from "../../../core/store/slices/assistanceRequestSlice";
import FormInput from "../../../shared/components/FormInput";
import Button from "../../../shared/components/Button";
import { type PersonalInfoStep } from "../types";
import { GENDER } from "../../constants/const";

const PersonalInformationStep: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formData = useSelector(
    (state: RootState) => state.assistanceRequest.formData
  );
  const validationErrors = useSelector(
    (state: RootState) => state.assistanceRequest.validationErrors
  );

  const { register, handleSubmit, watch, setValue } = useForm<PersonalInfoStep>(
    {
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
    }
  );

  const watchedValues = watch();

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
    setValue(field as keyof PersonalInfoStep, value);

    const errorField = `personalInfo.${field}`;
    if (validationErrors[errorField]) {
      dispatch(clearValidationError(errorField));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("steps.personalInformation.title")}
        </h2>
        <p className="text-gray-600">
          {t("steps.personalInformation.description")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("sections.personalDetails")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              name="fullName"
              label={t("fields.fullName")}
              value={watchedValues.fullName}
              onChange={(value) => handleFieldChange("fullName", value)}
              error={validationErrors["personalInfo.fullName"]}
              isRequired
            />

            <FormInput
              name="nationalId"
              label={t("fields.nationalId")}
              value={watchedValues.nationalId}
              onChange={(value) => handleFieldChange("nationalId", value)}
              error={validationErrors["personalInfo.nationalId"]}
              isRequired
            />

            <FormInput
              name="dateOfBirth"
              label={t("fields.dateOfBirth")}
              type="date"
              value={watchedValues.dateOfBirth}
              onChange={(value) => handleFieldChange("dateOfBirth", value)}
              error={validationErrors["personalInfo.dateOfBirth"]}
              isRequired
            />

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {t("fields.gender")}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                {...register("gender")}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={GENDER.MALE}>{t("options.gender.male")}</option>
                <option value={GENDER.FEMALE}>
                  {t("options.gender.female")}
                </option>
                <option value={GENDER.OTHER}>
                  {t("options.gender.other")}
                </option>
                <option value={GENDER.PREFER_NOT_TO_SAY}>
                  {t("options.gender.preferNotToSay")}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("sections.contactInformation")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              name="contactInfo.primaryPhone"
              label={t("fields.primaryPhone")}
              type="tel"
              value={watchedValues.contactInfo?.primaryPhone || ""}
              onChange={(value) =>
                handleFieldChange("contactInfo.primaryPhone", value)
              }
              error={validationErrors["personalInfo.contactInfo.primaryPhone"]}
              isRequired
            />

            <FormInput
              name="contactInfo.emailAddress"
              label={t("fields.emailAddress")}
              type="email"
              value={watchedValues.contactInfo?.emailAddress || ""}
              onChange={(value) =>
                handleFieldChange("contactInfo.emailAddress", value)
              }
              error={validationErrors["personalInfo.contactInfo.emailAddress"]}
              isRequired
            />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("sections.addressInformation")}
          </h3>

          <div className="space-y-6">
            <FormInput
              name="address.streetAddress"
              label={t("fields.streetAddress")}
              value={watchedValues.address?.streetAddress || ""}
              onChange={(value) =>
                handleFieldChange("address.streetAddress", value)
              }
              error={validationErrors["personalInfo.address.streetAddress"]}
              isRequired
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput
                name="address.city"
                label={t("fields.city")}
                value={watchedValues.address?.city || ""}
                onChange={(value) => handleFieldChange("address.city", value)}
                error={validationErrors["personalInfo.address.city"]}
                isRequired
              />

              <FormInput
                name="address.state"
                label={t("fields.state")}
                value={watchedValues.address?.state || ""}
                onChange={(value) => handleFieldChange("address.state", value)}
              />

              <FormInput
                name="address.country"
                label={t("fields.country")}
                value={watchedValues.address?.country || ""}
                onChange={(value) =>
                  handleFieldChange("address.country", value)
                }
                error={validationErrors["personalInfo.address.country"]}
                isRequired
              />
            </div>

            <FormInput
              name="address.postalCode"
              label={t("fields.postalCode")}
              value={watchedValues.address?.postalCode || ""}
              onChange={(value) =>
                handleFieldChange("address.postalCode", value)
              }
            />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button type="submit" size="lg">
            {t("actions.continue")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformationStep;
