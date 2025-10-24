import { Suspense, lazy } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import PersonalInformationStep from "../personal-information/PersonalInformationStep";

const FamilyFinancialStep = lazy(() => import("../family-financial/FamilyFinancialStep"));
const RequestDetailsStep = lazy(() => import("../request-details/RequestDetailsStep"));

interface IProps {
  currentStep: number;
}

const StepRenderer: FC<IProps> = ({ currentStep }) => {
  const { t } = useTranslation();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInformationStep />;
      case 2:
        return (
          <Suspense fallback={<div>{t("success.loading")}</div>}>
            <FamilyFinancialStep />
          </Suspense>
        );
      case 3:
        return (
          <Suspense fallback={<div>{t("success.loading")}</div>}>
            <RequestDetailsStep />
          </Suspense>
        );
      default:
        return <PersonalInformationStep />;
    }
  };

  return <>{renderCurrentStep()}</>;
};

export default StepRenderer;
