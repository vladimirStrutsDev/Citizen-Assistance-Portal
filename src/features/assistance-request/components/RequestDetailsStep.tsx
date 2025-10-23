import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/core/store";
import {
  clearValidationError,
  setValidationError,
  updateRequestDetails,
  submitFormStart,
  submitFormSuccess,
  submitFormFailure,
  previousStep,
} from "@/core/store/slices/assistanceRequestSlice";

import Button from "@/shared/components/ui/Button";
import ModalDialog from "@/shared/components/ui/ModalDialog";
import {
  type RequestDetailsStep,
  AssistanceType,
  UrgencyLevel,
} from "../types";
import { getAIAssistance } from "@/api/openai";

const RequestDetailsStep: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector(
    (state: RootState) => state.assistanceRequest.formData
  );
  const validationErrors = useSelector(
    (state: RootState) => state.assistanceRequest.validationErrors
  );
  const isLoading = useSelector(
    (state: RootState) => state.assistanceRequest.isLoading
  );

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiSuggestion, setAISuggestion] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RequestDetailsStep>({
    defaultValues: {
      requestType: formData.requestType || AssistanceType.FINANCIAL_AID,
      description: formData.description || "",
      urgencyLevel: formData.urgencyLevel || UrgencyLevel.MEDIUM,
      supportingDocuments: formData.supportingDocuments || [],
    },
  });

  const watchedValues = watch();

  const validateForm = (data: RequestDetailsStep): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    // Clear previous validation errors
    Object.keys(validationErrors).forEach((field) => {
      if (field.startsWith("requestDetails.")) {
        dispatch(clearValidationError(field));
      }
    });

    // Validate required fields
    if (!data.description.trim()) {
      newErrors["requestDetails.description"] = t("validation.fieldRequired");
      isValid = false;
    }

    if (data.description.trim().length < 50) {
      newErrors["requestDetails.description"] = t("validation.minLength", {
        min: 50,
      });
      isValid = false;
    }

    // Set validation errors
    Object.entries(newErrors).forEach(([field, error]) => {
      dispatch(setValidationError({ field, error }));
    });

    return isValid;
  };

  const onSubmit = async (data: RequestDetailsStep) => {
    if (validateForm(data)) {
      dispatch(submitFormStart());

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        dispatch(updateRequestDetails(data));
        dispatch(submitFormSuccess());
        navigate("/success");
      } catch (error) {
        dispatch(
          submitFormFailure("Failed to submit request. Please try again.")
        );
      }
    }
  };

  const handleBack = () => {
    dispatch(previousStep());
  };

  const handleFieldChange = (field: string, value: any) => {
    setValue(field as keyof RequestDetailsStep, value);

    const errorField = `requestDetails.${field}`;
    if (validationErrors[errorField]) {
      dispatch(clearValidationError(errorField));
    }
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
        "Sorry, I couldn't generate a suggestion at this time. Please try again."
      );
    } finally {
      setIsGeneratingAI(false);
    }

    // try {
    //   // Simulate AI API call
    //   await new Promise((resolve) => setTimeout(resolve, 2000));

    //   // Mock AI response based on request type
    //   const mockResponses = {
    //     [AssistanceType.FINANCIAL_AID]: "I am applying for financial assistance due to unexpected medical expenses that have significantly impacted my family's financial stability. My monthly income has been reduced due to taking time off work for medical treatment, and I am struggling to cover basic living expenses including rent, utilities, and food for my family.",
    //     [AssistanceType.HOUSING_ASSISTANCE]: "I am seeking housing assistance as I am currently facing eviction due to job loss and inability to pay rent. I have been actively searching for employment but have not been successful. I have two young children and need stable housing to ensure their well-being and education.",
    //     [AssistanceType.MEDICAL_SUPPORT]: "I require medical support for ongoing treatment of a chronic condition that requires regular medication and specialist visits. My current insurance does not cover all necessary treatments, and the out-of-pocket costs are beyond my financial means.",
    //     [AssistanceType.FOOD_ASSISTANCE]: "I am requesting food assistance as I have been struggling to provide adequate nutrition for my family due to reduced work hours and increased living costs. I have three school-age children who need proper nutrition for their development and education.",
    //     [AssistanceType.EDUCATION_SUPPORT]: "I am applying for education support to help cover tuition and educational expenses for my children. As a single parent with limited income, I want to ensure my children have access to quality education and necessary school supplies.",
    //     [AssistanceType.EMPLOYMENT_SERVICES]: "I am seeking employment services to help me find suitable work opportunities. I have been unemployed for several months and need assistance with job search, resume preparation, and skill development to re-enter the workforce.",
    //   };

    //   setAISuggestion(mockResponses[watchedValues.requestType] || "AI-generated description based on your request type.");
    // } catch (error) {
    //   setAISuggestion("Sorry, I couldn't generate a suggestion at this time. Please try again.");
    // } finally {
    //   setIsGeneratingAI(false);
    // }
  };

  const handleAcceptAI = () => {
    setValue("description", aiSuggestion);
    setIsAIModalOpen(false);
    setAISuggestion("");
  };

  const handleDiscardAI = () => {
    setIsAIModalOpen(false);
    setAISuggestion("");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("steps.requestDetails.title")}
        </h2>
        <p className="text-gray-600">{t("steps.requestDetails.description")}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Request Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("sections.requestInformation")}
          </h3>

          <div className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {t("fields.requestType")}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                {...register("requestType")}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={AssistanceType.FINANCIAL_AID}>
                  {t("options.assistanceType.financialAid")}
                </option>
                <option value={AssistanceType.HOUSING_ASSISTANCE}>
                  {t("options.assistanceType.housingAssistance")}
                </option>
                <option value={AssistanceType.MEDICAL_SUPPORT}>
                  {t("options.assistanceType.medicalSupport")}
                </option>
                <option value={AssistanceType.FOOD_ASSISTANCE}>
                  {t("options.assistanceType.foodAssistance")}
                </option>
                <option value={AssistanceType.EDUCATION_SUPPORT}>
                  {t("options.assistanceType.educationSupport")}
                </option>
                <option value={AssistanceType.EMPLOYMENT_SERVICES}>
                  {t("options.assistanceType.employmentServices")}
                </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {t("fields.urgencyLevel")}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                {...register("urgencyLevel")}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={UrgencyLevel.LOW}>
                  {t("options.urgencyLevel.low")}
                </option>
                <option value={UrgencyLevel.MEDIUM}>
                  {t("options.urgencyLevel.medium")}
                </option>
                <option value={UrgencyLevel.HIGH}>
                  {t("options.urgencyLevel.high")}
                </option>
                <option value={UrgencyLevel.CRITICAL}>
                  {t("options.urgencyLevel.critical")}
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  {t("fields.description")}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Button
                  type="button"
                  variant="info"
                  size="sm"
                  onClick={() => setIsAIModalOpen(true)}
                >
                  {t("actions.helpMeWrite")}
                </Button>
              </div>

              <textarea
                {...register("description")}
                rows={6}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={t("fields.descriptionPlaceholder")}
                value={watchedValues.description || ""}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
              />

              {validationErrors["requestDetails.description"] && (
                <p className="text-sm text-red-600">
                  {validationErrors["requestDetails.description"]}
                </p>
              )}

              <p className="text-xs text-gray-500">
                {t("fields.descriptionHelp")}
              </p>
            </div>
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

      {/* AI Help Modal */}
      <ModalDialog
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        title={t("actions.helpMeWrite")}
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-gray-600">{t("aiHelp.description")}</p>

          <div className="flex justify-center">
            <Button
              onClick={handleAIGenerate}
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
                <Button variant="secondary" onClick={handleDiscardAI}>
                  {t("actions.discard")}
                </Button>
                <Button variant="success" onClick={handleAcceptAI}>
                  {t("actions.accept")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </ModalDialog>
    </div>
  );
};

export default RequestDetailsStep;
