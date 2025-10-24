import Button from "../../../shared/components/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const RequestSubmissionSuccess: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleViewRequests = () => {
    // This would navigate to a requests list page in a real app
    console.log("Navigate to requests list");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Success Header */}
        <div className="bg-linear-to-r from-emerald-600 to-green-600 px-6 py-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {t("messages.submissionSuccessTitle")}
          </h1>
          <p className="text-emerald-100 text-lg">
            {t("success.submissionSuccessSubtitle")}
          </p>
        </div>

        {/* Success Content */}
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <p className="text-gray-700 text-lg leading-relaxed">
              {t("messages.submissionSuccessMessage")}
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("success.whatHappensNext")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-600">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {t("success.initialReview")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t("success.initialReviewDescription")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-600">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {t("success.caseAssignment")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t("success.caseAssignmentDescription")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-600">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {t("success.contactFollowup")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t("success.contactFollowupDescription")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reference Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              {t("success.referenceInformation")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-900">{t("success.requestId")}</span>
                <span className="ml-2 text-blue-700 font-mono">
                  REQ-{Date.now().toString().slice(-8)}
                </span>
              </div>
              <div>
                <span className="font-medium text-blue-900">{t("success.submitted")}</span>
                <span className="ml-2 text-blue-700">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleGoHome} variant="primary" size="lg">
              {t("actions.continue")}
            </Button>

            <Button
              onClick={handleViewRequests}
              variant="secondary"
              size="lg"
            >
{t("success.viewMyRequests")}
            </Button>
          </div>
        </div>
      </div>

      {/* Support Information */}
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
