import { Group, Pagination } from "@mantine/core";
import { usePagination } from "src/hooks";
import { PageInfo } from "src/interfaces";

interface Props {
  pageInfo?: PageInfo;
  onPageChange?: (page: number) => void;
}

export const Paginations: React.FC<Props> = ({ pageInfo, onPageChange }) => {
  const totalPages = usePagination(pageInfo);

  return (
    <>
      <Pagination.Root
        boundaries={1}
        total={totalPages}
        value={pageInfo?.page}
        onChange={onPageChange}
        size="md"
        radius="xl"
      >
        <Group gap={4} justify="center">
          <Pagination.First />
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
          <Pagination.Last />
        </Group>
      </Pagination.Root>
    </>
  );
};
