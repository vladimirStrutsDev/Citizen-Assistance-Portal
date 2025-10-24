import type { FC } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  currentStep: number;
  stepLabels: string[];
}

const CardHeader: FC<IProps> = ({ currentStep, stepLabels }) => {
  const { t } = useTranslation();

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return t("steps.personalInformation.description");
      case 2:
        return t("steps.familyFinancial.description");
      case 3:
        return t("steps.requestDetails.description");
      default:
        return "";
    }
  };

  return (
    <div className="bg-linear-to-r from-indigo-600 to-blue-600 px-6 py-4">
      <h2 className="text-2xl font-bold text-white">
        {stepLabels[currentStep - 1]}
      </h2>
      <p className="text-indigo-100 mt-1">
        {getStepDescription()}
      </p>
    </div>
  );
};

export default CardHeader;
