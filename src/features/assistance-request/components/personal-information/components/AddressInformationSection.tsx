import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormInput from "../../../../../shared/components/FormInput/FormInput";
import { type PersonalInfoFormData } from "../../../schemas/validation";

const AddressInformationSection: FC = () => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<PersonalInfoFormData>();

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("sections.addressInformation")}
      </h3>

      <div className="space-y-6">
        <FormInput
          name="address.streetAddress"
          label={t("fields.streetAddress")}
          type="text"
          isRequired
          register={register("address.streetAddress")}
          fieldError={errors.address?.streetAddress}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormInput
            name="address.city"
            label={t("fields.city")}
            type="text"
            isRequired
            register={register("address.city")}
            fieldError={errors.address?.city}
          />

          <FormInput
            isRequired
            name="address.state"
            label={t("fields.state")}
            type="text"
            register={register("address.state")}
            fieldError={errors.address?.state}
          />

          <FormInput
            name="address.country"
            label={t("fields.country")}
            type="text"
            isRequired
            register={register("address.country")}
            fieldError={errors.address?.country}
          />
        </div>

        <FormInput
          isRequired
          name="address.postalCode"
          label={t("fields.postalCode")}
          type="text"
          register={register("address.postalCode")}
          fieldError={errors.address?.postalCode}
        />
      </div>
    </div>
  );
};

export default AddressInformationSection;
