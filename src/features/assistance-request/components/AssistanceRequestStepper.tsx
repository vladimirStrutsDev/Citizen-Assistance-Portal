import type { FC } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../core/store";
import ProgressIndicator from "../../../shared/components/ProgressIndicator/ProgressIndicator";
import Card from "./stepper/Card";
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
      <div className="mb-8">
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepLabels={stepLabels}
        />
      </div>

      <Card
        currentStep={currentStep}
        stepLabels={stepLabels}
        isLoading={isLoading}
      >
        <StepRenderer currentStep={currentStep} />
      </Card>

      <HelpSection />
    </div>
  );
};

export default AssistanceRequestStepper;
