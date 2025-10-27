import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SuccessHeader from "./components/SuccessHeader";
import NextStepsSection from "./components/NextStepsSection";
import ReferenceInformationSection from "./components/ReferenceInformationSection";
import ActionButtonsSection from "./components/ActionButtonsSection";

const RequestSubmissionSuccess: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleViewRequests = () => {
    console.log("Navigate to requests list");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <SuccessHeader />

        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <p className="text-gray-700 text-lg leading-relaxed">
              {t("messages.submissionSuccessMessage")}
            </p>
          </div>

          <NextStepsSection />

          <ReferenceInformationSection />

          <ActionButtonsSection
            onGoHome={handleGoHome}
            onViewRequests={handleViewRequests}
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          {t("success.needImmediateAssistance")}{" "}
          <a
            href="tel:+1234567890"
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            +1 (234) 567-890
          </a>
        </p>
      </div>
    </div>
  );
};

export default RequestSubmissionSuccess;
