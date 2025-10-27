import type { FC } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../../shared/components/Button/Button";

interface IProps {
  onGoHome: () => void;
  onViewRequests: () => void;
}

const ActionButtonsSection: FC<IProps> = ({
  onGoHome,
  onViewRequests,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button onClick={onGoHome} variant="primary" size="lg">
        {t("actions.continue")}
      </Button>

      <Button
        onClick={onViewRequests}
        variant="secondary"
        size="lg"
      >
        {t("success.viewMyRequests")}
      </Button>
    </div>
  );
};

export default ActionButtonsSection;
