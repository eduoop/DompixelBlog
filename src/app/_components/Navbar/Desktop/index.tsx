"use client";

import React from "react";
import { Button } from "@mantine/core";
import {
  FiHome,
  FiSearch,
  FiBell,
  FiMessageSquare,
  FiList,
  FiUser,
  FiSettings,
  FiGrid,
} from "react-icons/fi";
import { usePathname } from "next/navigation";
import CreatePostButton from "../../CreatePostButton";

function Desktop() {
  const pathname = usePathname();

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

  return (
    <nav className="w-60 bg-gray-800 border-r border-gray-700 p-4 h-full">
      <ul className="space-y-4 w-full">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Button
              variant={pathname === item.path ? "filled" : "subtle"}
              className={`text-white w-full flex items-center justify-start space-x-2 text-base rounded-lg py-4 h-[50px] ${
                pathname === item.path ? "bg-blue-500/70" : "hover:bg-blue-500/20"
              }`}
              leftSection={item.icon}
            >
              {item.name}
            </Button>
          </li>
        ))}
        <li>
          <CreatePostButton />
        </li>
      </ul>
    </nav>
  );
}

export default Desktop;
