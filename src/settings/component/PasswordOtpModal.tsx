import { Button, Modal, PinInput, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconDeviceMobileMessage } from "@tabler/icons-react";
import React from "react";
import { getPhoneNumberWithoutCode } from "src/helpers/phone-numbers";
import { useAppAuthentication } from "src/hooks";
import { usePasswodOtpForm } from "../hooks/usePasswordOtpForm";
import { useVerifyPasswordOtpMutation } from "../hooks/useVerifyPasswordOtpMutation";

interface PasswordOtpModalProps {
  opened: boolean;
  onClose: () => void;
}

export const PasswordOtpModal: React.FC<PasswordOtpModalProps> = ({
  opened,
  onClose,
}) => {
  const { user } = useAppAuthentication();
  const form = usePasswodOtpForm();

  const { verifyHandler, loading } = useVerifyPasswordOtpMutation();

  const handleSubmit = async () => {
    const res = await verifyHandler(form.values.otp);

    if (res) {
      onClose();
      form.resetForm();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Verify Password Change"
      centered
    >
      <Stack align="center" gap="md" w={400} mx="auto">
        <Text>
          Enter the OTP sent to&nbsp;{" "}
          <b>{getPhoneNumberWithoutCode(user?.phoneNumber!)}</b>
        </Text>
        <ThemeIcon c="brand" bg="transparent" size={80}>
          <IconDeviceMobileMessage size={80} stroke={1.5} />
        </ThemeIcon>
        <PinInput
          name="otp"
          size="md"
          length={5}
          type="number"
          value={form.values.otp}
          onChange={(value) => form.setFieldValue("otp", value)}
          disabled={loading}
        />
        <Button
          radius="xl"
          mt="sm"
          mb="md"
          fullWidth
          onClick={handleSubmit}
          disabled={!form.isValid || !form.values.otp}
          loading={loading}
        >
          Verify
        </Button>
      </Stack>
    </Modal>
  );
};
