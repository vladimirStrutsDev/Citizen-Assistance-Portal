import apiClient from "./index";

const FAKE_API_RESPONSE =
  "Based on the information you provided, here is a suggested text: I am currently facing significant financial hardship due to a recent job loss. With no stable monthly income and a family to support, I am struggling to cover basic living expenses such as rent and utilities. This assistance would provide crucial support during this challenging period.";

export const getAIAssistance = async (prompt: string): Promise<string> => {
  console.log("Sending prompt to AI:", prompt);

  try {
    // const response = await apiClient.post('/chat/completions', {
    //   model: 'gpt-3.5-turbo',
    //   messages: [{ role: 'user', content: prompt }],
    // });

    const response = await apiClient.post("/chat/completions", {
      model: "glm-4.6",
      messages: [{ role: "user", content: prompt }],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching AI assistance:", error);
    throw new Error("Failed to get AI suggestion.");
  }

  // --- MOCK-LOGIC ---
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(FAKE_API_RESPONSE);
  //   }, 1500); // Имитация задержки сети
  // });
};
