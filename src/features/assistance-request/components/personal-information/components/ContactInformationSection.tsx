import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormInput from "../../../../../shared/components/FormInput";
import { type PersonalInfoStep } from "../../../types";

interface ContactInformationSectionProps {
  validationErrors: Record<string, string>;
  onFieldChange: (field: string, value: any) => void;
}

const ContactInformationSection: FC<ContactInformationSectionProps> = ({
  validationErrors,
  onFieldChange,
}) => {
  const { t } = useTranslation();
  const { watch } = useFormContext<PersonalInfoStep>();

  const watchedValues = watch();

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("sections.contactInformation")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          name="contactInfo.primaryPhone"
          label={t("fields.primaryPhone")}
          type="tel"
          value={watchedValues.contactInfo?.primaryPhone || ""}
          onChange={(value) =>
            onFieldChange("contactInfo.primaryPhone", value)
          }
          error={validationErrors["personalInfo.contactInfo.primaryPhone"]}
          isRequired
        />

        <FormInput
          name="contactInfo.emailAddress"
          label={t("fields.emailAddress")}
          type="email"
          value={watchedValues.contactInfo?.emailAddress || ""}
          onChange={(value) =>
            onFieldChange("contactInfo.emailAddress", value)
          }
          error={validationErrors["personalInfo.contactInfo.emailAddress"]}
          isRequired
        />
      </div>
    </div>
  );
};

export default ContactInformationSection;
