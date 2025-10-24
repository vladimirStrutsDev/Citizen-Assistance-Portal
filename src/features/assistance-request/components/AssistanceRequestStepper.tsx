import type { FC } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../core/store";
import ProgressIndicator from "../../../shared/components/ProgressIndicator/ProgressIndicator";
import WizardCard from "./stepper/Card";
import HelpSection from "./stepper/HelpSection";
import StepRenderer from "./stepper/StepRenderer";

const AssistanceRequestStepper: FC = () => {
  const { t } = useTranslation();
  const { currentStep, totalSteps, isLoading } = useSelector(
    (state: RootState) => state.assistanceRequest
  );

  const stepLabels = [
    t("steps.personalInformation.title"),
    t("steps.familyFinancial.title"),
    t("steps.requestDetails.title"),
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepLabels={stepLabels}
        />
      </div>

      {/* Main Content Card */}
      <WizardCard
        currentStep={currentStep}
        stepLabels={stepLabels}
        isLoading={isLoading}
      >
        <StepRenderer currentStep={currentStep} />
      </WizardCard>

      {/* Help Section */}
      <HelpSection />
    </div>
  );
};

export default AssistanceRequestStepper;
