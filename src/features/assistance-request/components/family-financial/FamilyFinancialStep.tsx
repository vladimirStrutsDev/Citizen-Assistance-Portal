import type { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../../core/store";
import {
  updateFamilyFinancialInfo,
  nextStep,
  previousStep,
} from "../../../../core/store/slices/assistanceRequestSlice";
import Button from "../../../../shared/components/Button/Button";
import { 
  MARITAL_STATUS,
  HOUSING_STATUS,
  EMPLOYMENT_STATUS,
} from "./types";
import { familyFinancialSchema, type FamilyFinancialFormData } from "../../schemas/validation";
import FamilyInformationSection from "./components/FamilyInformationSection";
import FinancialInformationSection from "./components/FinancialInformationSection";
import EmploymentInformationSection from "./components/EmploymentInformationSection";

const FamilyFinancialStep: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formData = useSelector(
    (state: RootState) => state.assistanceRequest.formData
  );

  const methods = useForm<FamilyFinancialFormData>({
    resolver: zodResolver(familyFinancialSchema),
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

  const onSubmit = (data: FamilyFinancialFormData) => {
    dispatch(updateFamilyFinancialInfo(data));
    dispatch(nextStep());
  };

  const handleBack = () => {
    dispatch(previousStep());
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
          <FamilyInformationSection />

          <FinancialInformationSection />

          <EmploymentInformationSection />

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
