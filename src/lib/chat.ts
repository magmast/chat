import { z } from "zod";

const missingApiKeySchema = z.object({
  success: z.literal(false),
  code: z.literal("missing-api-key"),
});

export function createMissingApiKeyResponse() {
  return new Response(
    JSON.stringify({
      success: false,
      code: "missing-api-key",
    } satisfies z.infer<typeof missingApiKeySchema>),
    { status: 400, headers: { "content-type": "application/json" } },
  );
}

export async function isMissingApiKeyResponse(response: Response) {
  if (response.status !== 400) {
    console.log("Invalid status");
    return false;
  }

  const contentType = response.headers.get("content-type");
  if (contentType !== "application/json") {
    console.log("Invalid content type");
    return false;
  }

  const json = await response.json();
  const result = missingApiKeySchema.safeParse(json);
  if (!result.success) {
    console.log("Invalid response body", json);
    return false;
  }

  return true;
}
