import { Modal } from "@mantine/core";
import React from "react";

interface UpdateEducationModalProps {
  opened: boolean;
  onClose: () => void;
}

export const UpdateEducationModal: React.FC<UpdateEducationModalProps> = ({
  opened,
  onClose,
}) => {
  return (
    <Modal onClose={onClose} opened={opened}>
      UpdateEducationModal
    </Modal>
  );
};
