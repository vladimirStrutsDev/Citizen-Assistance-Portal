import type { FC } from "react";
import { useTranslation } from "react-i18next";

const HelpSection: FC = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default HelpSection;
