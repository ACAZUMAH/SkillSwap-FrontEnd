import { Button, PinInput, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconDeviceMobileMessage } from "@tabler/icons-react";
import React from "react";
import { getPhoneNumberWithoutCode } from "src/helpers/phone-numbers";
import { useVerifyOtpForm } from "../hooks/useVerifyOtpForm";
import { useVerifyOtpMutation } from "../hooks/useVerifyOtpMutation";

interface Props {
  phoneNumber: string;
}

export const VerifyOtp: React.FC<Props> = ({ phoneNumber }) => {
  const form = useVerifyOtpForm();

  const { verifyOtp, loading } = useVerifyOtpMutation()

  const handleVerify = async () => {
    const verified = await verifyOtp({ ...form.values })

    if (verified) {
      form.resetForm();
    }
  };

  return (
    <Stack align="center" gap="md" w={400} mx="auto">
      <Text>
        Enter the OTP sent to&nbsp;{" "}
        <b>{getPhoneNumberWithoutCode(phoneNumber)}</b>
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
        fullWidth
        onClick={handleVerify}
        disabled={!form.isValid || !form.values.otp}
        loading={loading}
      >
        Verify
      </Button>
    </Stack>
  );
};
