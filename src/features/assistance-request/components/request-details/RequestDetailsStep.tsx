import { useState } from "react";
import type { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../../core/store";
import {
  updateRequestDetails,
  submitFormStart,
  submitFormSuccess,
  submitFormFailure,
  previousStep,
} from "../../../../core/store/slices/assistanceRequestSlice";
import Button from "../../../../shared/components/Button/Button";
import { 
  ASSISTANCE_TYPE,
  URGENCY_LEVEL,
} from "./types";
import { requestDetailsSchema, type RequestDetailsFormData } from "../../schemas/validation";
import { getAIAssistance } from "../../../../api/openai";
import RequestTypeSection from "./components/RequestTypeSection";
import DescriptionSection from "./components/DescriptionSection";
import AIHelpModal from "./components/AIHelpModal";

const RequestDetailsStep: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector(
    (state: RootState) => state.assistanceRequest.formData
  );
  const isLoading = useSelector(
    (state: RootState) => state.assistanceRequest.isLoading
  );

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiSuggestion, setAISuggestion] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const methods = useForm<RequestDetailsFormData>({
    resolver: zodResolver(requestDetailsSchema),
    defaultValues: {
      requestType: formData.requestType || ASSISTANCE_TYPE.FINANCIAL_AID,
      description: formData.description || "",
      urgencyLevel: formData.urgencyLevel || URGENCY_LEVEL.MEDIUM,
      supportingDocuments: formData.supportingDocuments || [],
    },
  });

  const onSubmit = async (data: RequestDetailsFormData) => {
    dispatch(submitFormStart());

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      dispatch(updateRequestDetails(data));
      dispatch(submitFormSuccess());
      navigate("/success");
    } catch (error) {
      dispatch(
        submitFormFailure(t("errors.submissionError"))
      );
    }
  };

  const handleBack = () => {
    dispatch(previousStep());
  };

  const handleAIGenerate = async () => {
    setIsGeneratingAI(true);

    try {
      const aiSuggestion = await getAIAssistance(
        "I am applying for financial assistance due to unexpected medical expenses that have significantly impacted my family's financial stability. My monthly income has been reduced due to taking time off work for medical treatment, and I am struggling to cover basic living expenses including rent, utilities, and food for my family."
      );

      setIsGeneratingAI(false);
      setAISuggestion(aiSuggestion);
    } catch (error) {
      setAISuggestion(
        t("errors.aiGenerationError")
      );
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleAcceptAI = () => {
    methods.setValue("description", aiSuggestion);
    setIsAIModalOpen(false);
    setAISuggestion("");
  };

  const handleDiscardAI = () => {
    setIsAIModalOpen(false);
    setAISuggestion("");
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("steps.requestDetails.title")}
          </h2>
          <p className="text-gray-600">{t("steps.requestDetails.description")}</p>
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t("sections.requestInformation")}
            </h3>

            <div className="space-y-6">
              <RequestTypeSection />

              <DescriptionSection
                onOpenAIModal={() => setIsAIModalOpen(true)}
              />
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={handleBack}
            >
              {t("actions.back")}
            </Button>

            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {isLoading ? t("messages.loading") : t("actions.submit")}
            </Button>
          </div>
        </form>

        <AIHelpModal
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          aiSuggestion={aiSuggestion}
          isGeneratingAI={isGeneratingAI}
          onGenerateAI={handleAIGenerate}
          onAcceptAI={handleAcceptAI}
          onDiscardAI={handleDiscardAI}
        />
      </div>
    </FormProvider>
  );
};

export default RequestDetailsStep;
