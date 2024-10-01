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

function Desktop() {
  const menuItems = [
    { name: "Home", icon: <FiHome /> },
    { name: "Search", icon: <FiSearch /> },
    { name: "Notifications", icon: <FiBell /> },
    { name: "Chat", icon: <FiMessageSquare /> },
    { name: "Feeds", icon: <FiGrid /> },
    { name: "Lists", icon: <FiList /> },
    { name: "Profile", icon: <FiUser /> },
    { name: "Settings", icon: <FiSettings /> },
  ];

  return (
    <nav className="w-60 bg-gray-800 border-r border-gray-700 p-4 h-full">
      <ul className="space-y-4 w-full">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Button
              variant="subtle"
              className="text-white w-full hover:text-blue-500/80 flex items-center justify-start space-x-2 text-base rounded-lg py-4 h-[50px]"
              leftSection={item.icon}
            >
              {item.name}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Desktop;
