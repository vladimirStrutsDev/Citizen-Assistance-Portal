import type { FC } from "react";
import { useTranslation } from "react-i18next";

const NextStepsSection: FC = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default NextStepsSection;
