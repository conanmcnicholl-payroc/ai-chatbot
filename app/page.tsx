"use client";

import {
  Message,
  // import as useAssistant:
  experimental_useAssistant as useAssistant,
} from "ai/react";

import { Card, Textfield } from "@payroc/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";

const prompts = [
  "What is the technology stack?",
  "What are the best practices for E2E tests?",
  "Who can I reach out to for more information?",
  "Who can I reach out to for more information?",
];

export default function Chat() {
  const {
    status,
    messages,
    input,
    submitMessage,
    handleInputChange,
    setInput,
  } = useAssistant({ api: "/api/assistant" });

  return (
    <div className="flex flex-col w-full max-w-4xl py-8 mx-auto stretch chat-wrapper">
      {messages.length === 0 && (
        <div className="empty-message">
          <Card>
            <p>
              I am a digital onboarding assistant to help speed up time to
              proficiency and improve the overall employee induction experience.
              Rocky ensures the process is on-brand, reduces internal time and
              cost resource and streamlines the user experience.
            </p>
            <p className="mt-4">Ask me anything!</p>
          </Card>
        </div>
      )}

      {messages.map((m: Message) => (
        <div key={m.id} className={`whitespace-pre-wrap ${m.role}-message`}>
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
        </div>
      ))}

      {status === "in_progress" && (
        <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 rounded-lg animate-pulse flex"></div>
      )}

      <div className="bottom-section">
        <div className="prompt-grid">
          {prompts.map((prompt) => (
            <div className="prompt-card" onClick={() => setInput(prompt)}>
              {prompt}
            </div>
          ))}
        </div>

        <form onSubmit={submitMessage} className="form">
          <Textfield
            disabled={status !== "awaiting_message"}
            onChange={handleInputChange}
            placeholder="What do you need?"
            postfixContent={<FontAwesomeIcon icon={faArrowRight} />}
            value={input}
          />
        </form>
      </div>
    </div>
  );
}
