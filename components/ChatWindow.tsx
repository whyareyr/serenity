import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuIcon, SunIcon, MoonIcon, LogOutIcon } from "lucide-react";
import MessageDisplay from "./MessageDisplay";
import MessageInput from "./MessageInput";
import Navbar from "./Navbar";
import { useSession, signOut } from "next-auth/react"; // Import signOut for logout functionality

interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userProfile, setUserProfile] = useState({
    email: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch user session if using NextAuth.js
  const { data: session } = useSession();

  const setConversations = () => {
    // Placeholder function; add actual logic here if needed
  };

  useEffect(() => {
    // If session is available, update user profile
    if (session?.user) {
      setUserProfile({
        email: session.user.email || "",
        name: session.user.name?.split(" ")[0] || "", // Take first name from the full name
      });
    }
  }, [session]);

  const handleSendMessage = async (message: string) => {
    setLoading(true);
    try {
      const res = await axios.post<{ response: string }>("/api/chat", {
        message,
      });
      setMessages([
        ...messages,
        { id: messages.length + 1, content: message, sender: "user" },
        { id: messages.length + 2, content: res.data.response, sender: "bot" },
      ]);
      setInputMessage("");
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut(); // Use next-auth's signOut function
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div
      className={`flex h-screen ${
        darkMode
          ? "dark bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        setConversations={setConversations}
        // Remove setConversations if not needed
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Serenity Chat</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden md:flex items-center"
              onClick={() => {
                setDarkMode(!darkMode);
                document.documentElement.classList.toggle("dark", !darkMode);
              }}
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="outline"
              className="hidden md:flex items-center"
              onClick={handleLogout}
            >
              <LogOutIcon className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Chat Area */}
        <ScrollArea className="flex-grow p-4">
          <MessageDisplay messages={messages} />
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t dark:border-gray-700">
          <MessageInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            onSendMessage={handleSendMessage}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
