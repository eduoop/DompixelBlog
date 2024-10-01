"use client";

import { useState } from "react";
import {
  TextInput,
  Button,
  Drawer,
  Burger,
  Group,
  ActionIcon,
} from "@mantine/core";
import {
  FiMenu,
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

export default function CustomMenu() {
  const [opened, setOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-4 bg-foreground text-white">
        {/* Ícone principal à esquerda */}
        <ActionIcon size="lg" variant="light">
          <BellIcon size={24} />
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
        {/* Campo de pesquisa */}
        <TextInput
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search"
          rightSection={<FiSearch />}
          className="mb-4"
          radius="md"
          size="md"
          styles={{
            input: {
              backgroundColor: "#1A1B1E",
              border: "1px solid #2C2E33",
              color: "white",
            },
          }}
        />

        {/* Menu de opções dentro do Drawer */}
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Button
                variant="subtle"
                className="text-white w-full hover:text-blue-500 flex items-center justify-start space-x-2"
                leftSection={item.icon}
              >
                {item.name}
              </Button>
            </li>
          ))}
        </ul>
      </Drawer>
    </div>
  );
}
