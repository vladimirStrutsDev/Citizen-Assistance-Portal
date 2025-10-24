import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AssistanceRequestState {
  currentStep: number;
  totalSteps: number;
  formData: Record<string, any>;
  isLoading: boolean;
  error: string | null;
}

const initialState: AssistanceRequestState = {
  currentStep: 1,
  totalSteps: 3,
  formData: {},
  isLoading: false,
  error: null,
};

const assistanceRequestSlice = createSlice({
  name: "assistanceRequest",
  initialState,
  reducers: {
    navigateToStep: (state, action: PayloadAction<number>) => {
      if (action.payload >= 1 && action.payload <= state.totalSteps) {
        state.currentStep = action.payload;
      }
    },

    nextStep: (state) => {
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },

    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },

    updatePersonalInfo: (state, action: PayloadAction<Record<string, any>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    updateFamilyFinancialInfo: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    updateRequestDetails: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    updateFormField: (
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },


    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    resetForm: (state) => {
      state.currentStep = 1;
      state.formData = {};
      state.isLoading = false;
      state.error = null;
    },

    submitFormStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    submitFormSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
      state.currentStep = 1;
      state.formData = {};
    },

    submitFormFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  navigateToStep,
  nextStep,
  previousStep,
  updatePersonalInfo,
  updateFamilyFinancialInfo,
  updateRequestDetails,
  updateFormField,
  setLoading,
  setError,
  resetForm,
  submitFormStart,
  submitFormSuccess,
  submitFormFailure,
} = assistanceRequestSlice.actions;

export default assistanceRequestSlice.reducer;
