// app/chatbot/page.tsx
"use client";

import { useSession, signIn } from "next-auth/react";
import ChatWindow from "@/components/ChatWindow";
import AccessDeniedPage from "@/components/AccessDenied";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <AccessDeniedPage />;
  }

  return (
    <div>
      <ChatWindow />
    </div>
  );
}
