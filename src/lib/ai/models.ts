export interface Model {
  id: string;
  label: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: "deepseek/deepseek-chat",
    label: "DeepSeek V3",
    description:
      "General-purpose model from DeepSeek. Perfect for a wide range of tasks.",
  },
  {
    id: "deepseek/deepseek-r1",
    label: "DeepSeek R1",
    description:
      "Reasoning model from DeepSeek. Perfect for complex tasks that require reasoning and logic.",
  },
  {
    id: "google/gemini-flash-1.5",
    label: "Gemini Flash 1.5",
    description: "Small, but cheap model from Google. Good for quick tasks.",
  },
] as const;

export const DEFAULT_MODEL_NAME: string = "deepseek/deepseek-chat";
