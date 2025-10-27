import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormInput from "../../../../../shared/components/FormInput/FormInput";
import { type PersonalInfoFormData } from "../../../schemas/validation";

const ContactInformationSection: FC = () => {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext<PersonalInfoFormData>();

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
          isRequired
          register={register("contactInfo.primaryPhone")}
          fieldError={errors.contactInfo?.primaryPhone}
        />

        <FormInput
          name="contactInfo.emailAddress"
          label={t("fields.emailAddress")}
          type="email"
          isRequired
          register={register("contactInfo.emailAddress")}
          fieldError={errors.contactInfo?.emailAddress}
        />
      </div>
    </div>
  );
};

export default ContactInformationSection;
