import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PersonalInformationStep from "./PersonalInformationStep";
import type { RootState } from "../../../core/store";
import ProgressIndicator from "../../../shared/components/ProgressIndicator";

const FamilyFinancialStep = lazy(() => import("./FamilyFinancialStep"));
const RequestDetailsStep = lazy(() => import("./RequestDetailsStep"));

const AssistanceRequestWizard: React.FC = () => {
  const { t } = useTranslation();
  const { currentStep, totalSteps, isLoading } = useSelector(
    (state: RootState) => state.assistanceRequest
  );

  const stepLabels = [
    t("steps.personalInformation.title"),
    t("steps.familyFinancial.title"),
    t("steps.requestDetails.title"),
  ];

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
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="bg-linear-to-r from-indigo-600 to-blue-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">
            {stepLabels[currentStep - 1]}
          </h2>
          <p className="text-indigo-100 mt-1">
            {currentStep === 1 && t("steps.personalInformation.description")}
            {currentStep === 2 && t("steps.familyFinancial.description")}
            {currentStep === 3 && t("steps.requestDetails.description")}
          </p>
        </div>

        {/* Card Content */}
        <div className="p-6 sm:p-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
                  <svg
                    className="w-6 h-6 text-indigo-600 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600">{t("messages.processing")}</p>
              </div>
            </div>
          ) : (
            renderCurrentStep()
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="shrink-0">
            <svg
              className="w-5 h-5 text-blue-600 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-1">
              {t("success.needHelp")}
            </h3>
            <p className="text-sm text-blue-700">
              {t("success.needHelpDescription")}{" "}
              <a
                href="tel:+1234567890"
                className="font-medium underline hover:text-blue-900"
              >
                +1 (234) 567-890
              </a>{" "}
              {t("success.orEmailUs")}{" "}
              <a
                href="mailto:support@citizenassistance.gov"
                className="font-medium underline hover:text-blue-900"
              >
                support@citizenassistance.gov
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistanceRequestWizard;
