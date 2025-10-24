import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../../../../../shared/components/Button/Button";
import { type RequestDetailsStep } from "../types";

interface IProps {
  validationErrors: Record<string, string>;
  onFieldChange: (field: string, value: any) => void;
  onOpenAIModal: () => void;
}

const DescriptionSection: FC<IProps> = ({
  validationErrors,
  onFieldChange,
  onOpenAIModal,
}) => {
  const { t } = useTranslation();
  const { register, watch } = useFormContext<RequestDetailsStep>();

  const watchedValues = watch();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {t("fields.description")}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <Button
          type="button"
          variant="info"
          size="sm"
          onClick={onOpenAIModal}
        >
          {t("actions.helpMeWrite")}
        </Button>
      </div>

      <textarea
        {...register("description")}
        rows={6}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={t("fields.descriptionPlaceholder")}
        value={watchedValues.description || ""}
        onChange={(e) =>
          onFieldChange("description", e.target.value)
        }
      />

      {validationErrors["requestDetails.description"] && (
        <p className="text-sm text-red-600">
          {validationErrors["requestDetails.description"]}
        </p>
      )}

      <p className="text-xs text-gray-500">
        {t("fields.descriptionHelp")}
      </p>
    </div>
  );
};

export default DescriptionSection;
