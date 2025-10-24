import type { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../../core/store";
import {
  clearValidationError,
  setValidationError,
  updateFamilyFinancialInfo,
  nextStep,
  previousStep,
} from "../../../../core/store/slices/assistanceRequestSlice";
import Button from "../../../../shared/components/Button";
import { type FamilyFinancialStep } from "../../types";
import {
  MARITAL_STATUS,
  HOUSING_STATUS,
  EMPLOYMENT_STATUS,
} from "../../../constants/const";
import FamilyInformationSection from "./components/FamilyInformationSection";
import FinancialInformationSection from "./components/FinancialInformationSection";
import EmploymentInformationSection from "./components/EmploymentInformationSection";

const FamilyFinancialStep: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formData = useSelector(
    (state: RootState) => state.assistanceRequest.formData
  );
  const validationErrors = useSelector(
    (state: RootState) => state.assistanceRequest.validationErrors
  );

  const methods = useForm<FamilyFinancialStep>({
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
    methods.setValue(field as keyof FamilyFinancialStep, value);
    // Clear validation error when user starts typing
    const errorField = `familyFinancial.${field}`;
    if (validationErrors[errorField]) {
      dispatch(clearValidationError(errorField));
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("steps.familyFinancial.title")}
          </h2>
          <p className="text-gray-600">
            {t("steps.familyFinancial.description")}
          </p>
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <FamilyInformationSection
            validationErrors={validationErrors}
            onFieldChange={handleFieldChange}
          />

          <FinancialInformationSection
            validationErrors={validationErrors}
            onFieldChange={handleFieldChange}
          />

          <EmploymentInformationSection
            validationErrors={validationErrors}
            onFieldChange={handleFieldChange}
          />

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
    </FormProvider>
  );
};

export default FamilyFinancialStep;
