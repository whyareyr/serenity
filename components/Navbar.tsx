"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserIcon, PlusIcon, LinkIcon, LogOutIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  toggleDarkMode: () => void;
  userProfile: {
    name: string;
    email: string;
  };
  setUserProfile: React.Dispatch<
    React.SetStateAction<{ name: string; email: string }>
  >;
  setConversations: React.Dispatch<
    React.SetStateAction<{ id: number; title: string }[]>
  >;
  handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isSidebarOpen,
  userProfile,
  setUserProfile,
  setConversations,
  handleLogout,
}) => {
  return (
    <div
      className={`bg-teal-800 dark:bg-teal-900 text-white w-64 flex flex-col ${
        isSidebarOpen ? "block" : "hidden"
      } md:block`}
    >
      <div className="p-4">
        <Button
          variant="outline"
          className="w-full justify-start text-white border-white/20"
          onClick={() =>
            setConversations((prev) => [
              ...prev,
              { id: prev.length + 1, title: "New conversation" },
            ])
          }
        >
          <PlusIcon className="mr-2 h-4 w-4" /> New conversation
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        {/* Conversations will be listed here */}
      </ScrollArea>
      <div className="p-4 border-t border-white/20">
        <div className="bg-gray-800 p-4 mb-4">
          <h4 className="text-md font-semibold leading-none ">
            Mental Wellbeing Articles
          </h4>
        </div>
        <ul className="space-y-2">
          <li>
            <a
              href="https://www.psychologytoday.com/intl/blog/mental-health-nerd/202101/7-strategies-manage-anxiety"
              className="flex items-center space-x-2 text-white hover:bg-teal-700 p-2 rounded"
            >
              <LinkIcon className="h-4 w-4" />
              <span>Dealing with Anxiety</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.healthline.com/nutrition/17-tips-to-sleep-better"
              className="flex items-center space-x-2 text-white hover:bg-teal-700 p-2 rounded"
            >
              <LinkIcon className="h-4 w-4" />
              <span>Improving Sleep Habits</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.verywellmind.com/tips-to-reduce-stress-3145195"
              className="flex items-center space-x-2 text-white hover:bg-teal-700 p-2 rounded"
            >
              <LinkIcon className="h-4 w-4" />
              <span>Managing Stress</span>
            </a>
          </li>
          {/* Additional links */}
          <li>
            <a
              href="https://www.mindful.org/how-to-practice-mindfulness/"
              className="flex items-center space-x-2 text-white hover:bg-teal-700 p-2 rounded"
            >
              <LinkIcon className="h-4 w-4" />
              <span>Practicing Mindfulness</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.verywellmind.com/self-care-strategies-overall-stress-reduction-3144729"
              className="flex items-center space-x-2 text-white hover:bg-teal-700 p-2 rounded"
            >
              <LinkIcon className="h-4 w-4" />
              <span>Self-Care Tips</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="p-4 border-t border-white/20">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-white">
              <UserIcon className="mr-2 h-4 w-4" /> {userProfile.name}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Profile</h4>
                <p className="text-sm text-muted-foreground">
                  Manage your profile settings.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={userProfile.name}
                    className="col-span-2 h-8"
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={userProfile.email}
                    className="col-span-2 h-8"
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, email: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button
          variant="outline"
          className="w-full mt-4 text-white border-white/20"
          onClick={handleLogout}
        >
          <LogOutIcon className="mr-2 h-4 w-4" /> Log Out
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
