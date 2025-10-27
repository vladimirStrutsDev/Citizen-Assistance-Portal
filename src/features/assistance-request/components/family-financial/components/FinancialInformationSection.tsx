import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormInput from "../../../../../shared/components/FormInput/FormInput";
import { type FamilyFinancialFormData } from "../../../schemas/validation";
import { HOUSING_STATUS } from "../types";

const FinancialInformationSection: FC = () => {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext<FamilyFinancialFormData>();

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("sections.financialInformation")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          name="financialInfo.monthlyIncome"
          label={t("fields.monthlyIncome")}
          type="number"
          min={0}
          register={register("financialInfo.monthlyIncome", { valueAsNumber: true })}
          fieldError={errors.financialInfo?.monthlyIncome}
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {t("fields.currency")}
          </label>
          <select
            {...register("financialInfo.currency")}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="AED">AED</option>
          </select>
          {errors.financialInfo?.currency && (
            <p className="text-sm text-red-600">{errors.financialInfo.currency.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {t("fields.housingStatus")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            {...register("financialInfo.housingStatus")}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value={HOUSING_STATUS.OWNED}>
              {t("options.housingStatus.owned")}
            </option>
            <option value={HOUSING_STATUS.RENTED}>
              {t("options.housingStatus.rented")}
            </option>
            <option value={HOUSING_STATUS.SHARED}>
              {t("options.housingStatus.shared")}
            </option>
            <option value={HOUSING_STATUS.TEMPORARY}>
              {t("options.housingStatus.temporary")}
            </option>
            <option value={HOUSING_STATUS.HOMELESS}>
              {t("options.housingStatus.homeless")}
            </option>
          </select>
          {errors.financialInfo?.housingStatus && (
            <p className="text-sm text-red-600">{errors.financialInfo.housingStatus.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              {...register("financialInfo.hasSavings")}
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              {t("common.yes")} {t("fields.hasSavings")}
            </label>
          </div>

          <div className="flex items-center">
            <input
              {...register("financialInfo.hasDebts")}
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              {t("common.yes")} {t("fields.hasDebts")}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialInformationSection;
