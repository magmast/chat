import { streamText } from "ai";
import { createOllama } from "ollama-ai-provider";

const ollama = createOllama({
  baseURL: "http://chaos.ide-alioth.ts.net:11434/api",
});

const model = ollama("deepseek-r1:8b");
const result = streamText({
  model,
  prompt: "Solve |3x-4| < 6",
});

for await (const token of result.textStream) {
  process.stdout.write(token);
}
