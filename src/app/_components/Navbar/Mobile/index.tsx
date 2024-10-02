"use client";

import { useState } from "react";
import { TextInput, Button, Drawer, Burger, ActionIcon } from "@mantine/core";
import {
  FiHome,
  FiSearch,
  FiBell,
  FiMessageSquare,
  FiGrid,
  FiList,
  FiUser,
  FiSettings,
} from "react-icons/fi";
import { FiBell as BellIcon } from "react-icons/fi";
import { usePathname } from "next/navigation";
import CreatePostButton from "../../CreatePostButton";
import SearchInput from "../../SearchInput";
import { PiNewspaper } from "react-icons/pi";
import { useRouter } from "next/navigation";

const menuItems = [
  { name: "Home", icon: <FiHome />, path: "/" },
  { name: "Search", icon: <FiSearch />, path: "/search" },
  { name: "Notifications", icon: <FiBell />, path: "/notifications" },
  { name: "Chat", icon: <FiMessageSquare />, path: "/chat" },
  { name: "Feeds", icon: <FiGrid />, path: "/feeds" },
  { name: "Lists", icon: <FiList />, path: "/lists" },
  { name: "Profile", icon: <FiUser />, path: "/profile" },
  { name: "Settings", icon: <FiSettings />, path: "/settings" },
];

export default function CustomMenu() {
  const [opened, setOpened] = useState(false);
  const pathname = usePathname();
  const navigate = useRouter()

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-4 bg-foreground text-white">
        <ActionIcon size="lg" variant="light" onClick={() => navigate.push("/")}>
          <PiNewspaper size={24} />
        </ActionIcon>

        <Burger
          opened={opened}
          onClick={() => setOpened(!opened)}
          size="md"
          color="white"
        />
      </div>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Menu"
        padding="md"
        size="sm"
        className="bg-gray-800"
        styles={{
          body: {
            backgroundColor: "#1f2937",
          },
          header: {
            backgroundColor: "#1f2937",
          },
          content: {
            backgroundColor: "#1f2937",
          },
          title: {
            color: "white",
          },
        }}
      >
        <SearchInput onClickResult={() => setOpened(false)} />

        <ul className="space-y-4 mt-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Button
                variant={pathname === item.path ? "filled" : "subtle"} 
                className={`text-white w-full flex items-center justify-start space-x-2 ${
                  pathname === item.path ? "bg-blue-500/70" : ""
                }`}
                leftSection={item.icon}
              >
                {item.name}
              </Button>
            </li>
          ))}
          <li><CreatePostButton/></li>
        </ul>
      </Drawer>
    </div>
  );
}
