import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormInput from "../../../../../shared/components/FormInput";
import { MARITAL_STATUS } from "../../../../constants/const";
import { type FamilyFinancialStep } from "../../../types";

interface FamilyInformationSectionProps {
  validationErrors: Record<string, string>;
  onFieldChange: (field: string, value: any) => void;
}

const FamilyInformationSection: FC<FamilyInformationSectionProps> = ({
  validationErrors,
  onFieldChange,
}) => {
  const { t } = useTranslation();
  const { register, watch } = useFormContext<FamilyFinancialStep>();

  const watchedValues = watch();

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("sections.familyInformation")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {t("fields.maritalStatus")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            {...register("familyInfo.maritalStatus")}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value={MARITAL_STATUS.SINGLE}>
              {t("options.maritalStatus.single")}
            </option>
            <option value={MARITAL_STATUS.MARRIED}>
              {t("options.maritalStatus.married")}
            </option>
            <option value={MARITAL_STATUS.DIVORCED}>
              {t("options.maritalStatus.divorced")}
            </option>
            <option value={MARITAL_STATUS.WIDOWED}>
              {t("options.maritalStatus.widowed")}
            </option>
            <option value={MARITAL_STATUS.SEPARATED}>
              {t("options.maritalStatus.separated")}
            </option>
          </select>
        </div>

        <FormInput
          name="familyInfo.numberOfDependents"
          label={t("fields.numberOfDependents")}
          type="number"
          value={String(watchedValues.familyInfo?.numberOfDependents || 0)}
          onChange={(value) =>
            onFieldChange("familyInfo.numberOfDependents", parseInt(value) || 0)
          }
          error={validationErrors["familyFinancial.familyInfo.numberOfDependents"]}
        />
      </div>
    </div>
  );
};

export default FamilyInformationSection;
