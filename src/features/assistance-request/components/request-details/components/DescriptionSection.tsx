import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../../../../../shared/components/Button/Button";
import FormInput from "../../../../../shared/components/FormInput/FormInput";
import { type RequestDetailsFormData } from "../../../schemas/validation";

interface IProps {
  onOpenAIModal: () => void;
}

const DescriptionSection: FC<IProps> = ({
  onOpenAIModal,
}) => {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext<RequestDetailsFormData>();

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

      <FormInput
        name="description"
        label=""
        type="textarea"
        rows={6}
        placeholder={t("fields.descriptionPlaceholder")}
        isRequired
        register={register("description")}
        fieldError={errors.description}
      />

      <p className="text-xs text-gray-500">
        {t("fields.descriptionHelp")}
      </p>
    </div>
  );
};

export default DescriptionSection;
