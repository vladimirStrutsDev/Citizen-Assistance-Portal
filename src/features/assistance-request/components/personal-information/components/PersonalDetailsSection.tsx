import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormInput from "../../../../../shared/components/FormInput/FormInput";
import { type PersonalInfoStep, GENDER } from "../types";

interface IProps {
  validationErrors: Record<string, string>;
  onFieldChange: (field: string, value: any) => void;
}

const PersonalDetailsSection: FC<IProps> = ({
  validationErrors,
  onFieldChange,
}) => {
  const { t } = useTranslation();
  const { register, watch } = useFormContext<PersonalInfoStep>();

  const watchedValues = watch();

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("sections.personalDetails")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          name="fullName"
          label={t("fields.fullName")}
          value={watchedValues.fullName}
          onChange={(value) => onFieldChange("fullName", value)}
          error={validationErrors["personalInfo.fullName"]}
          isRequired
        />

        <FormInput
          name="nationalId"
          label={t("fields.nationalId")}
          value={watchedValues.nationalId}
          onChange={(value) => onFieldChange("nationalId", value)}
          error={validationErrors["personalInfo.nationalId"]}
          isRequired
        />

        <FormInput
          name="dateOfBirth"
          label={t("fields.dateOfBirth")}
          type="date"
          value={watchedValues.dateOfBirth}
          onChange={(value) => onFieldChange("dateOfBirth", value)}
          error={validationErrors["personalInfo.dateOfBirth"]}
          isRequired
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {t("fields.gender")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            {...register("gender")}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value={GENDER.MALE}>{t("options.gender.male")}</option>
            <option value={GENDER.FEMALE}>
              {t("options.gender.female")}
            </option>
            <option value={GENDER.OTHER}>
              {t("options.gender.other")}
            </option>
            <option value={GENDER.PREFER_NOT_TO_SAY}>
              {t("options.gender.preferNotToSay")}
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsSection;
