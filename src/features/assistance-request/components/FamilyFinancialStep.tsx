import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../core/store";
import {
  clearValidationError,
  setValidationError,
  updateFamilyFinancialInfo,
  nextStep,
  previousStep,
} from "../../../core/store/slices/assistanceRequestSlice";
import FormInput from "../../../shared/components/FormInput";
import Button from "../../../shared/components/Button";
import { type FamilyFinancialStep } from "../types";
import {
  MARITAL_STATUS,
  HOUSING_STATUS,
  EMPLOYMENT_STATUS,
} from "../../constants/const";

const FamilyFinancialStep: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formData = useSelector(
    (state: RootState) => state.assistanceRequest.formData
  );
  const validationErrors = useSelector(
    (state: RootState) => state.assistanceRequest.validationErrors
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<FamilyFinancialStep>({
    defaultValues: {
      familyInfo: {
        maritalStatus: formData.familyInfo?.maritalStatus || MARITAL_STATUS.SINGLE,
        numberOfDependents: formData.familyInfo?.numberOfDependents || 0,
        dependentDetails: formData.familyInfo?.dependentDetails || [],
      },
      financialInfo: {
        monthlyIncome: formData.financialInfo?.monthlyIncome || 0,
        currency: formData.financialInfo?.currency || "USD",
        hasSavings: formData.financialInfo?.hasSavings || false,
        savingsAmount: formData.financialInfo?.savingsAmount || 0,
        hasDebts: formData.financialInfo?.hasDebts || false,
        debtAmount: formData.financialInfo?.debtAmount || 0,
        housingStatus: formData.financialInfo?.housingStatus || HOUSING_STATUS.RENTED,
        otherIncomeSources: formData.financialInfo?.otherIncomeSources || [],
      },
      employmentInfo: {
        employmentStatus: formData.employmentInfo?.employmentStatus || EMPLOYMENT_STATUS.UNEMPLOYED,
        employerName: formData.employmentInfo?.employerName || "",
        jobTitle: formData.employmentInfo?.jobTitle || "",
        workExperience: formData.employmentInfo?.workExperience || 0,
        isSelfEmployed: formData.employmentInfo?.isSelfEmployed || false,
        businessType: formData.employmentInfo?.businessType || "",
      },
    },
  });

  const watchedValues = watch();

  const validateForm = (data: FamilyFinancialStep): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    // Clear previous validation errors
    Object.keys(validationErrors).forEach((field) => {
      if (field.startsWith("familyFinancial.")) {
        dispatch(clearValidationError(field));
      }
    });

    // Validate required fields
    if (data.financialInfo.monthlyIncome < 0) {
      newErrors["familyFinancial.financialInfo.monthlyIncome"] = t(
        "validation.mustBeNumber"
      );
      isValid = false;
    }

    if (data.employmentInfo.workExperience < 0) {
      newErrors["familyFinancial.employmentInfo.workExperience"] = t(
        "validation.mustBeNumber"
      );
      isValid = false;
    }

    // Set validation errors
    Object.entries(newErrors).forEach(([field, error]) => {
      dispatch(setValidationError({ field, error }));
    });

    return isValid;
  };

  const onSubmit = (data: FamilyFinancialStep) => {
    if (validateForm(data)) {
      dispatch(updateFamilyFinancialInfo(data));
      dispatch(nextStep());
    }
  };

  const handleBack = () => {
    dispatch(previousStep());
  };

  const handleFieldChange = (field: string, value: any) => {
    setValue(field as keyof FamilyFinancialStep, value);
    // Clear validation error when user starts typing
    const errorField = `familyFinancial.${field}`;
    if (validationErrors[errorField]) {
      dispatch(clearValidationError(errorField));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("steps.familyFinancial.title")}
        </h2>
        <p className="text-gray-600">
          {t("steps.familyFinancial.description")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Family Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("sections.familyInformation")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {t("fields.maritalStatus")}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                {...register("familyInfo.maritalStatus")}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={MARITAL_STATUS.SINGLE}>
                  {t("options.maritalStatus.single")}
                </option>
                <option value={MARITAL_STATUS.MARRIED}>
                  {t("options.maritalStatus.married")}
                </option>
                <option value={MARITAL_STATUS.DIVORCED}>
                  {t("options.maritalStatus.divorced")}
                </option>
                <option value={MARITAL_STATUS.WIDOWED}>
                  {t("options.maritalStatus.widowed")}
                </option>
                <option value={MARITAL_STATUS.SEPARATED}>
                  {t("options.maritalStatus.separated")}
                </option>
              </select>
            </div>

            <FormInput
              name="familyInfo.numberOfDependents"
              label={t("fields.numberOfDependents")}
              type="number"
              value={String(watchedValues.familyInfo?.numberOfDependents || 0)}
              onChange={(value) =>
                handleFieldChange("familyInfo.numberOfDependents", parseInt(value) || 0)
              }
              error={validationErrors["familyFinancial.familyInfo.numberOfDependents"]}
            />
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("sections.financialInformation")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              name="financialInfo.monthlyIncome"
              label={t("fields.monthlyIncome")}
              type="number"
              value={String(watchedValues.financialInfo?.monthlyIncome || 0)}
              onChange={(value) =>
                handleFieldChange("financialInfo.monthlyIncome", parseFloat(value) || 0)
              }
              error={validationErrors["familyFinancial.financialInfo.monthlyIncome"]}
            />

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {t("fields.currency")}
              </label>
              <select
                {...register("financialInfo.currency")}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="AED">AED</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {t("fields.housingStatus")}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                {...register("financialInfo.housingStatus")}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={HOUSING_STATUS.OWNED}>
                  {t("options.housingStatus.owned")}
                </option>
                <option value={HOUSING_STATUS.RENTED}>
                  {t("options.housingStatus.rented")}
                </option>
                <option value={HOUSING_STATUS.SHARED}>
                  {t("options.housingStatus.shared")}
                </option>
                <option value={HOUSING_STATUS.TEMPORARY}>
                  {t("options.housingStatus.temporary")}
                </option>
                <option value={HOUSING_STATUS.HOMELESS}>
                  {t("options.housingStatus.homeless")}
                </option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  {...register("financialInfo.hasSavings")}
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  {t("common.yes")} {t("fields.hasSavings")}
                </label>
              </div>

              <div className="flex items-center">
                <input
                  {...register("financialInfo.hasDebts")}
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  {t("common.yes")} {t("fields.hasDebts")}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Employment Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("sections.employmentInformation")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {t("fields.employmentStatus")}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                {...register("employmentInfo.employmentStatus")}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={EMPLOYMENT_STATUS.EMPLOYED}>
                  {t("options.employmentStatus.employed")}
                </option>
                <option value={EMPLOYMENT_STATUS.UNEMPLOYED}>
                  {t("options.employmentStatus.unemployed")}
                </option>
                <option value={EMPLOYMENT_STATUS.SELF_EMPLOYED}>
                  {t("options.employmentStatus.selfEmployed")}
                </option>
                <option value={EMPLOYMENT_STATUS.STUDENT}>
                  {t("options.employmentStatus.student")}
                </option>
                <option value={EMPLOYMENT_STATUS.RETIRED}>
                  {t("options.employmentStatus.retired")}
                </option>
                <option value={EMPLOYMENT_STATUS.DISABLED}>
                  {t("options.employmentStatus.disabled")}
                </option>
              </select>
            </div>

            <FormInput
              name="employmentInfo.workExperience"
              label={t("fields.workExperience")}
              type="number"
              value={String(watchedValues.employmentInfo?.workExperience || 0)}
              onChange={(value) =>
                handleFieldChange("employmentInfo.workExperience", parseInt(value) || 0)
              }
              error={validationErrors["familyFinancial.employmentInfo.workExperience"]}
            />

            <FormInput
              name="employmentInfo.employerName"
              label={t("fields.employerName")}
              value={watchedValues.employmentInfo?.employerName || ""}
              onChange={(value) =>
                handleFieldChange("employmentInfo.employerName", value)
              }
            />

            <FormInput
              name="employmentInfo.jobTitle"
              label={t("fields.jobTitle")}
              value={watchedValues.employmentInfo?.jobTitle || ""}
              onChange={(value) =>
                handleFieldChange("employmentInfo.jobTitle", value)
              }
            />
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleBack}
          >
            {t("actions.back")}
          </Button>

          <Button type="submit" size="lg">
            {t("actions.continue")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FamilyFinancialStep;
