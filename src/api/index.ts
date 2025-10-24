import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`;
  } else {
    console.warn(
      "OpenAI API key is not set. Please set VITE_OPENAI_API_KEY in your .env file."
    );
  }
  return config;
});

export default apiClient;
