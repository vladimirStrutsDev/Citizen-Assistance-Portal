import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormInput from "../../../../../shared/components/FormInput/FormInput";
import { type PersonalInfoFormData } from "../../../schemas/validation";
import { GENDER } from "../types";

const PersonalDetailsSection: FC = () => {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext<PersonalInfoFormData>();

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("sections.personalDetails")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          name="fullName"
          label={t("fields.fullName")}
          type="text"
          isRequired
          register={register("fullName")}
          fieldError={errors.fullName}
        />

        <FormInput
          name="nationalId"
          label={t("fields.nationalId")}
          type="text"
          isRequired
          register={register("nationalId")}
          fieldError={errors.nationalId}
        />

        <FormInput
          name="dateOfBirth"
          label={t("fields.dateOfBirth")}
          type="date"
          isRequired
          register={register("dateOfBirth")}
          fieldError={errors.dateOfBirth}
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
          {errors.gender && (
            <p className="text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsSection;
