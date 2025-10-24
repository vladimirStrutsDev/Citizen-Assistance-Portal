import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormInput from "../../../../../shared/components/FormInput";
import { EMPLOYMENT_STATUS } from "../../../../constants/const";
import { type FamilyFinancialStep } from "../../../types";

interface EmploymentInformationSectionProps {
  validationErrors: Record<string, string>;
  onFieldChange: (field: string, value: any) => void;
}

const EmploymentInformationSection: FC<EmploymentInformationSectionProps> = ({
  validationErrors,
  onFieldChange,
}) => {
  const { t } = useTranslation();
  const { register, watch } = useFormContext<FamilyFinancialStep>();

  const watchedValues = watch();

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("sections.employmentInformation")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {t("fields.employmentStatus")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            {...register("employmentInfo.employmentStatus")}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value={EMPLOYMENT_STATUS.EMPLOYED}>
              {t("options.employmentStatus.employed")}
            </option>
            <option value={EMPLOYMENT_STATUS.UNEMPLOYED}>
              {t("options.employmentStatus.unemployed")}
            </option>
            <option value={EMPLOYMENT_STATUS.SELF_EMPLOYED}>
              {t("options.employmentStatus.selfEmployed")}
            </option>
            <option value={EMPLOYMENT_STATUS.STUDENT}>
              {t("options.employmentStatus.student")}
            </option>
            <option value={EMPLOYMENT_STATUS.RETIRED}>
              {t("options.employmentStatus.retired")}
            </option>
            <option value={EMPLOYMENT_STATUS.DISABLED}>
              {t("options.employmentStatus.disabled")}
            </option>
          </select>
        </div>

        <FormInput
          name="employmentInfo.workExperience"
          label={t("fields.workExperience")}
          type="number"
          value={String(watchedValues.employmentInfo?.workExperience || 0)}
          onChange={(value) =>
            onFieldChange("employmentInfo.workExperience", parseInt(value) || 0)
          }
          error={validationErrors["familyFinancial.employmentInfo.workExperience"]}
        />

        <FormInput
          name="employmentInfo.employerName"
          label={t("fields.employerName")}
          value={watchedValues.employmentInfo?.employerName || ""}
          onChange={(value) =>
            onFieldChange("employmentInfo.employerName", value)
          }
        />

        <FormInput
          name="employmentInfo.jobTitle"
          label={t("fields.jobTitle")}
          value={watchedValues.employmentInfo?.jobTitle || ""}
          onChange={(value) =>
            onFieldChange("employmentInfo.jobTitle", value)
          }
        />
      </div>
    </div>
  );
};

export default EmploymentInformationSection;
