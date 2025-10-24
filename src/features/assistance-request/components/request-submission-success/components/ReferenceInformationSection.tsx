import type { FC } from "react";
import { useTranslation } from "react-i18next";

const ReferenceInformationSection: FC = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default ReferenceInformationSection;
