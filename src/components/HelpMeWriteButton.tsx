// src/components/HelpMeWriteButton.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getAIAssistance } from "../api/openai";
import Button from "./Button";
import Modal from "./Modal";
import CommonTextarea from "./CommonTextarea"; // Новый импорт

interface HelpMeWriteButtonProps {
  fieldName: string;
  onSuggestionAccept: (text: string) => void;
}

const HelpMeWriteButton = ({
  fieldName,
  onSuggestionAccept,
}: HelpMeWriteButtonProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedSuggestion, setEditedSuggestion] = useState("");

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const prompt = `Help me write a concise paragraph about my "${fieldName.replace(
        /([A-Z])/g,
        " $1"
      )}" for a social support application.`;
      const result = await getAIAssistance(prompt);
      setSuggestion(result);
      setEditedSuggestion(result);
      setIsModalOpen(true);
    } catch (error) {
      alert("Failed to get suggestion from AI.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    onSuggestionAccept(editedSuggestion);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        onClick={handleClick}
        isLoading={isLoading}
      >
        {t("helpMeWrite")}
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={t("aiSuggestion")}
      >
        <div>
          <CommonTextarea
            value={editedSuggestion}
            onChange={setEditedSuggestion}
            placeholder={t("enterYourText")}
            rows={6}
            className="h-40"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="secondary" onClick={handleClose}>
              {t("discard")}
            </Button>
            <Button onClick={handleAccept}>{t("accept")}</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HelpMeWriteButton;
