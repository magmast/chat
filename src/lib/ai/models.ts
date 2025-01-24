export interface Model {
  id: string;
  label: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: "deepseek/deepseek-chat",
    label: "DeepSeek V3",
    description: "",
  },
  {
    id: "deepseek/deepseek-r1",
    label: "DeepSeek R1",
    description: "",
  },
  {
    id: "google/gemini-flash-1.5",
    label: "Gemini Flash 1.5",
    description: "",
  },
  {
    id: "mistralai/mistral-nemo",
    label: "Mistral Nemo",
    description: "",
  },
  {
    id: "openai/gpt-4o",
    label: "ChatGPT 4o",
    description: "",
  },
  {
    id: "openai/gpt-4o-mini",
    label: "ChatGPT 4o Mini",
    description: "",
  },
  {
    id: "meta-llama/llama-3.2-1b-instruct",
    label: "Llama 3.2 1B",
    description: "",
  },
] as const;

export const DEFAULT_MODEL_NAME: string = "deepseek/deepseek-chat";
