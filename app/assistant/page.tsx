"use client";

import {
  Message,
  // import as useAssistant:
  experimental_useAssistant as useAssistant,
} from "ai/react";

import { Textfield } from "@payroc/react";

const roleToColorMap: Record<Message["role"], string> = {
  system: "red",
  user: "black",
  function: "blue",
  assistant: "green",
  data: "orange",
};

export default function Chat() {
  const { status, messages, input, submitMessage, handleInputChange } =
    useAssistant({ api: "/api/assistant" });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m: Message) => (
        <div
          key={m.id}
          className="whitespace-pre-wrap"
          style={{ color: roleToColorMap[m.role] }}
        >
          <strong>{`${m.role}: `}</strong>
          {m.role !== "data" && m.content}
          {m.role === "data" && (
            <>
              {/* here you would provide a custom display for your app-specific data:*/}
              {(m.data as any).description}
              <br />
              <pre className={"bg-gray-200"}>
                {JSON.stringify(m.data, null, 2)}
              </pre>
            </>
          )}
          <br />
          <br />
        </div>
      ))}

      {status === "in_progress" && (
        <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
      )}

      <form onSubmit={submitMessage}>
        <Textfield
          disabled={status !== "awaiting_message"}
          value={input}
          placeholder="What is the temperature in the living room?"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
