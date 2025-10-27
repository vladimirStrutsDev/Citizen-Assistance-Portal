import type { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../../core/store";
import {
  updatePersonalInfo,
  nextStep,
} from "../../../../core/store/slices/assistanceRequestSlice";
import Button from "../../../../shared/components/Button/Button";
import { GENDER } from "./types";
import { personalInfoSchema, type PersonalInfoFormData } from "../../schemas/validation";
import PersonalDetailsSection from "./components/PersonalDetailsSection";
import ContactInformationSection from "./components/ContactInformationSection";
import AddressInformationSection from "./components/AddressInformationSection";

const PersonalInformationStep: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formData = useSelector(
    (state: RootState) => state.assistanceRequest.formData
  );

  const methods = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: formData.fullName || "",
      nationalId: formData.nationalId || "",
      dateOfBirth: formData.dateOfBirth || "",
      gender: formData.gender || GENDER.MALE,
      contactInfo: {
        primaryPhone: formData.contactInfo?.primaryPhone || "",
        secondaryPhone: formData.contactInfo?.secondaryPhone || "",
        emailAddress: formData.contactInfo?.emailAddress || "",
        preferredContactMethod:
          formData.contactInfo?.preferredContactMethod || "phone",
      },
      address: {
        streetAddress: formData.address?.streetAddress || "",
        city: formData.address?.city || "",
        state: formData.address?.state || "",
        country: formData.address?.country || "",
        postalCode: formData.address?.postalCode || "",
        isCurrentAddress: formData.address?.isCurrentAddress ?? true,
      },
    },
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    dispatch(updatePersonalInfo(data));
    dispatch(nextStep());
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("steps.personalInformation.title")}
          </h2>
          <p className="text-gray-600">
            {t("steps.personalInformation.description")}
          </p>
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <PersonalDetailsSection />

          <ContactInformationSection />

          <AddressInformationSection />

          <div className="flex justify-end pt-6">
            <Button type="submit" size="lg">
              {t("actions.continue")}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default PersonalInformationStep;
