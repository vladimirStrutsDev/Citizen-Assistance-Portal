import type { FC } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../../shared/components/Button/Button";
import ModalDialog from "../../../../../shared/components/ModalDialog/ModalDialog";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  aiSuggestion: string;
  isGeneratingAI: boolean;
  onGenerateAI: () => void;
  onAcceptAI: () => void;
  onDiscardAI: () => void;
}

const AIHelpModal: FC<IProps> = ({
  isOpen,
  onClose,
  aiSuggestion,
  isGeneratingAI,
  onGenerateAI,
  onAcceptAI,
  onDiscardAI,
}) => {
  const { t } = useTranslation();

  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={onClose}
      title={t("actions.helpMeWrite")}
      size="lg"
    >
      <div className="space-y-4">
        <p className="text-gray-600">{t("aiHelp.description")}</p>

        <div className="flex justify-center">
          <Button
            onClick={onGenerateAI}
            isLoading={isGeneratingAI}
            isDisabled={isGeneratingAI}
          >
            {isGeneratingAI
              ? t("messages.loading")
              : t("actions.generateSuggestion")}
          </Button>
        </div>

        {aiSuggestion && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">
              {t("aiHelp.suggestion")}:
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {aiSuggestion}
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={onDiscardAI}>
                {t("actions.discard")}
              </Button>
              <Button variant="success" onClick={onAcceptAI}>
                {t("actions.accept")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </ModalDialog>
  );
};

export default AIHelpModal;
