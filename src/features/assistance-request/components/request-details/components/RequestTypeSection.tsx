import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ASSISTANCE_TYPE, URGENCY_LEVEL } from "../../../../constants/const";
import { type RequestDetailsStep } from "../../../types";

const RequestTypeSection: FC = () => {
  const { t } = useTranslation();
  const { register } = useFormContext<RequestDetailsStep>();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {t("fields.requestType")}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          {...register("requestType")}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value={ASSISTANCE_TYPE.FINANCIAL_AID}>
            {t("options.assistanceType.financialAid")}
          </option>
          <option value={ASSISTANCE_TYPE.HOUSING_ASSISTANCE}>
            {t("options.assistanceType.housingAssistance")}
          </option>
          <option value={ASSISTANCE_TYPE.MEDICAL_SUPPORT}>
            {t("options.assistanceType.medicalSupport")}
          </option>
          <option value={ASSISTANCE_TYPE.FOOD_ASSISTANCE}>
            {t("options.assistanceType.foodAssistance")}
          </option>
          <option value={ASSISTANCE_TYPE.EDUCATION_SUPPORT}>
            {t("options.assistanceType.educationSupport")}
          </option>
          <option value={ASSISTANCE_TYPE.EMPLOYMENT_SERVICES}>
            {t("options.assistanceType.employmentServices")}
          </option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {t("fields.urgencyLevel")}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          {...register("urgencyLevel")}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value={URGENCY_LEVEL.LOW}>
            {t("options.urgencyLevel.low")}
          </option>
          <option value={URGENCY_LEVEL.MEDIUM}>
            {t("options.urgencyLevel.medium")}
          </option>
          <option value={URGENCY_LEVEL.HIGH}>
            {t("options.urgencyLevel.high")}
          </option>
          <option value={URGENCY_LEVEL.CRITICAL}>
            {t("options.urgencyLevel.critical")}
          </option>
        </select>
      </div>
    </div>
  );
};

export default RequestTypeSection;
