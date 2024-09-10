// components/MessageDisplay.tsx
"use client";
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { UserIcon, BotIcon } from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
}

interface MessageDisplayProps {
  messages: Message[];
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ messages }) => {
  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          } mb-4`}
        >
          <div
            className={`flex ${
              message.sender === "user" ? "flex-row-reverse" : "flex-row"
            } items-start max-w-3xl`}
          >
            <Avatar className="h-8 w-8">
              {message.sender === "user" ? (
                <UserIcon className="h-6 w-6" />
              ) : (
                <BotIcon className="h-6 w-6" />
              )}
            </Avatar>
            <div
              className={`mx-2 p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {message.content}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MessageDisplay;
