export interface Model {
  id: string;
  label: string;
  description: string;
  features: "tools"[];
}

export const models: Array<Model> = [
  {
    id: "google/gemini-flash-1.5",
    label: "Gemini Flash 1.5",
    description: "",
    features: ["tools"],
  },
  {
    id: "meta-llama/llama-3.3-70b-instruct",
    label: "Llama 3.3 70B",
    description: "",
    features: ["tools"],
  },
  {
    id: "deepseek/deepseek-r1",
    label: "DeepSeek R1",
    description: "",
    features: [],
  },
  {
    id: "meta-llama/llama-3.2-1b-instruct",
    label: "Llama 3.2 1B",
    description: "",
    features: [],
  },
  {
    id: "meta-llama/llama-3.2-3b-instruct",
    label: "Llama 3.2 3B",
    description: "",
    features: [],
  },
  {
    id: "mistralai/mistral-nemo",
    label: "Mistral Nemo",
    description: "",
    features: ["tools"],
  },
  {
    id: "openai/gpt-4o",
    label: "ChatGPT 4o",
    description: "",
    features: ["tools"],
  },
  {
    id: "openai/gpt-4o-mini",
    label: "ChatGPT 4o Mini",
    description: "",
    features: ["tools"],
  },
] as const;

export const DEFAULT_MODEL_NAME: string = "google/gemini-flash-1.5";
