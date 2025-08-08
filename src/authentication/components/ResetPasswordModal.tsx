import { Modal } from "@mantine/core";
import React, { useState } from "react";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { useResetPasswordForm } from "../hooks/useResetPasswordForm";
import { ResetPasswordOtp } from "./ResetPasswordOtp";
import { Conditional } from "src/components";

interface ResetPasswordModalProps {
  opened: boolean;
  onClose: () => void;
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ opened, onClose }) => {
  const [showOtp, setShowOtp] = useState(false);

  const form = useResetPasswordForm();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Reset Password"
      overlayProps={{ backgroundOpacity: 0.55, blur: 4 }}
    >
      <Conditional condition={!showOtp}>
        <ResetPasswordForm
          form={form}
          setVerifyOtp={() => setShowOtp(!showOtp)}
        />
      </Conditional>
      <Conditional condition={showOtp}>
        <ResetPasswordOtp onClose={onClose} />
      </Conditional>
    </Modal>
  );
};
