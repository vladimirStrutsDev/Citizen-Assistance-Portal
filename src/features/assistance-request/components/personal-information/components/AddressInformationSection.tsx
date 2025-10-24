import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormInput from "../../../../../shared/components/FormInput";
import { type PersonalInfoStep } from "../../../types";

interface AddressInformationSectionProps {
  validationErrors: Record<string, string>;
  onFieldChange: (field: string, value: any) => void;
}

const AddressInformationSection: FC<AddressInformationSectionProps> = ({
  validationErrors,
  onFieldChange,
}) => {
  const { t } = useTranslation();
  const { watch } = useFormContext<PersonalInfoStep>();

  const watchedValues = watch();

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("sections.addressInformation")}
      </h3>

      <div className="space-y-6">
        <FormInput
          name="address.streetAddress"
          label={t("fields.streetAddress")}
          value={watchedValues.address?.streetAddress || ""}
          onChange={(value) =>
            onFieldChange("address.streetAddress", value)
          }
          error={validationErrors["personalInfo.address.streetAddress"]}
          isRequired
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormInput
            name="address.city"
            label={t("fields.city")}
            value={watchedValues.address?.city || ""}
            onChange={(value) => onFieldChange("address.city", value)}
            error={validationErrors["personalInfo.address.city"]}
            isRequired
          />

          <FormInput
            name="address.state"
            label={t("fields.state")}
            value={watchedValues.address?.state || ""}
            onChange={(value) => onFieldChange("address.state", value)}
          />

          <FormInput
            name="address.country"
            label={t("fields.country")}
            value={watchedValues.address?.country || ""}
            onChange={(value) =>
              onFieldChange("address.country", value)
            }
            error={validationErrors["personalInfo.address.country"]}
            isRequired
          />
        </div>

        <FormInput
          name="address.postalCode"
          label={t("fields.postalCode")}
          value={watchedValues.address?.postalCode || ""}
          onChange={(value) =>
            onFieldChange("address.postalCode", value)
          }
        />
      </div>
    </div>
  );
};

export default AddressInformationSection;
