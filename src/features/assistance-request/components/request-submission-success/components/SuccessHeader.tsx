import type { FC } from "react";
import { useTranslation } from "react-i18next";

const SuccessHeader: FC = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default SuccessHeader;
