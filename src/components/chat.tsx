"use client";

import type { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { useState } from "react";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";

import { ChatHeader } from "@/components/chat-header";
import { useBlockSelector } from "@/hooks/use-block";
import { isMissingApiKeyResponse } from "@/lib/chat";
import type { Vote } from "@/lib/db/schema";
import { fetcher } from "@/lib/utils";

import { Block } from "./block";
import { Messages } from "./messages";
import { MultimodalInput } from "./multimodal-input";
import { VisibilityType } from "./visibility-selector";

export function Chat({
  id,
  initialMessages,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const { mutate } = useSWRConfig();

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    reload,
  } = useChat({
    id,
    body: { id, modelId: selectedModelId },
    initialMessages,
    experimental_throttle: 100,
    async onResponse(response) {
      if (response.ok) {
        return;
      }

      setMessages((messages) => messages.slice(0, -1));

      const isMissingApiKey = await isMissingApiKeyResponse(response);
      if (isMissingApiKey) {
        toast.error(
          "Before starting a new chat, please set your API key in the settings.",
        );
      } else {
        toast.error(
          "Something went wrong. Please try again later or try a different model.",
        );
      }
    },
    onFinish: () => {
      mutate("/api/history");
    },
  });

  const { data: votes } = useSWR<Array<Vote>>(
    `/api/vote?chatId=${id}`,
    fetcher,
  );

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const isBlockVisible = useBlockSelector((state) => state.isVisible);

  return (
    <>
      <div className="flex h-dvh min-w-0 flex-col bg-background">
        <ChatHeader
          chatId={id}
          selectedModelId={selectedModelId}
          selectedVisibilityType={selectedVisibilityType}
          isReadonly={isReadonly}
        />

        <Messages
          chatId={id}
          isLoading={isLoading}
          votes={votes}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
          isBlockVisible={isBlockVisible}
        />

        <form className="mx-auto flex w-full gap-2 bg-background px-4 pb-4 md:max-w-3xl md:pb-6">
          {!isReadonly && (
            <MultimodalInput
              chatId={id}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              stop={stop}
              attachments={attachments}
              setAttachments={setAttachments}
              messages={messages}
              setMessages={setMessages}
              append={append}
            />
          )}
        </form>
      </div>

      <Block
        chatId={id}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
        attachments={attachments}
        setAttachments={setAttachments}
        append={append}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
        votes={votes}
        isReadonly={isReadonly}
      />
    </>
  );
}
