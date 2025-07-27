import { Drawer, TextInput } from "@mantine/core";
import React from "react";
import { SearchDropdownProps } from "../interfaces";
import { IconSearch } from "@tabler/icons-react";

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  opened,
  onClose,
  search,
  setSearch,
}) => {
  return (
    <Drawer opened={opened} onClose={onClose} position="top" size="20%">
      <TextInput
        radius="xl"
        size="md"
        placeholder="Search for skills, users, or topics..."
        rightSection={<IconSearch stroke={1.5} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
    </Drawer>
  );
};
