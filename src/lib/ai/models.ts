export interface Model {
  id: string;
  label: string;
  description: string;
  features: "tools"[];
  provider: "openrouter" | "local";
}

export const models: Array<Model> = [
  {
    id: "google/gemini-flash-1.5",
    label: "Gemini Flash 1.5",
    description: "",
    features: ["tools"],
    provider: "openrouter",
  },
  {
    id: "meta-llama/llama-3.3-70b-instruct",
    label: "Llama 3.3 70B",
    description: "",
    features: ["tools"],
    provider: "openrouter",
  },
  {
    id: "deepseek/deepseek-r1",
    label: "DeepSeek R1",
    description: "",
    features: [],
    provider: "openrouter",
  },
  {
    id: "meta-llama/llama-3.2-3b-instruct",
    label: "Llama 3.2 3B",
    description: "",
    features: [],
    provider: "openrouter",
  },
  {
    id: "openai/gpt-4o",
    label: "ChatGPT 4o",
    description: "",
    features: ["tools"],
    provider: "openrouter",
  },
  {
    id: "openai/gpt-4o-mini",
    label: "ChatGPT 4o Mini",
    description: "",
    features: ["tools"],
    provider: "openrouter",
  },
  {
    id: "deepseek-r1:8b",
    label: "DeepSeek R1 (local)",
    description:
      "DeepSeek R1 model on local network, keeping all your data private.",
    features: [],
    provider: "local",
  },
  {
    id: "llama3.2:3b",
    label: "Llama 3.2 (local)",
    description: "",
    features: [],
    provider: "local",
  },
] as const;

export const DEFAULT_MODEL_NAME: string = "google/gemini-flash-1.5";
