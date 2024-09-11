// components/MessageInput.tsx
"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";

interface MessageInputProps {
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  onSendMessage: (message: string) => void;
  loading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  inputMessage,
  setInputMessage,
  onSendMessage,
  loading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      onSendMessage(inputMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 items-center">
      <Textarea
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type your message here 😇..."
        className="flex-grow resize-none dark:bg-gray-800 dark:text-gray-100"
        rows={1}
      />
      <Button
        type="submit"
        size="icon"
        className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700"
        disabled={loading}
      >
        {loading ? (
          <div className="w-6 h-6 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-2"></div>
        ) : (
          <SendIcon className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};

export default MessageInput;
