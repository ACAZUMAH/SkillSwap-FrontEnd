import { Anchor, Table, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { leveldata } from "src/helpers";
import { Skill } from "src/interfaces";

interface SkillsTableProps {
  skills?: Array<Skill | null>;
  addSkill?: () => void;
  remove: (index: number) => void;
}

export const SkillsTable: React.FC<SkillsTableProps> = ({
  skills,
  addSkill,
  remove,
}) => {
  return (
    <>
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th ta="left">Skill</Table.Th>
            <Table.Th ta="center">Level</Table.Th>
            <Table.Th ta="right">
              <Anchor underline="never" onClick={addSkill}>
                Add New
              </Anchor>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {skills?.map((skill, index) => (
            <Table.Tr key={index}>
              <Table.Td ta="left">
                <Text>{skill?.name}</Text>
              </Table.Td>
              <Table.Td ta="center">
                <Text>
                  {
                    leveldata.find((l) => l.value === String(skill?.level))
                      ?.label
                  }
                </Text>
              </Table.Td>
              <Table.Td ta="right">
                <Anchor
                  mr="md"
                  underline="never"
                  c="red"
                  onClick={() => remove(index)}
                >
                  <IconTrash stroke={1.5} size={20} />
                </Anchor>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};
