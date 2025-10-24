import apiClient from "./index";

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
};
