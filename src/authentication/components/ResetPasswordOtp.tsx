import { Button, PinInput, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconDeviceMobileMessage } from "@tabler/icons-react";
import React from "react";
import { getPhoneNumberWithoutCode } from "src/helpers/phone-numbers";
import { useResetPasswodOtpForm } from "../hooks/useResetPasswordOtp";
import { useVerifyPasswordOtpMutation } from "../hooks/useVerifyPasswordOtpMutation";

interface ResetOtpFormProps {
  onClose: () => void;
}

export const ResetPasswordOtp: React.FC<ResetOtpFormProps> = ({ onClose }) => {
  const form = useResetPasswodOtpForm();
  const { verifyHandler, loading } = useVerifyPasswordOtpMutation();
  
  const handleSubmit = async () => {
    const res = await verifyHandler(form.values.otp);
    if (res) {
      form.resetForm();
      onClose();
    }
  }

  return (
    <Stack align="center" gap="md" w={400} mx="auto">
      <Text>
        Enter the OTP sent to&nbsp; <b>{getPhoneNumberWithoutCode("")}</b>
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
  );
};
