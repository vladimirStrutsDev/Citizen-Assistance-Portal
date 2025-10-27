import { useEffect } from "react";
import type { FC } from "react";

import PersonalInformationStep from "../personal-information/PersonalInformationStep";
import FamilyFinancialStep from "../family-financial/FamilyFinancialStep";
import RequestDetailsStep from "../request-details/RequestDetailsStep";

interface IProps {
  currentStep: number;
}

const StepRenderer: FC<IProps> = ({ currentStep }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInformationStep />;
      case 2:
        return <FamilyFinancialStep />;
      case 3:
        return <RequestDetailsStep />;
      default:
        return <PersonalInformationStep />;
    }
  };

  return <>{renderCurrentStep()}</>;
};

export default StepRenderer;
