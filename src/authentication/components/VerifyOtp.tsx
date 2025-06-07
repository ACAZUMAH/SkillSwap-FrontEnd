import { Button, PinInput, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconDeviceMobileMessage } from "@tabler/icons-react";
import React from "react";
import { getPhoneNumberWithoutCode } from "src/helpers/phone-numbers";
import { useVerifyOtpForm } from "../hooks/useVerifyOtpForm";

interface Props {
  phoneNumber: string;
}

export const VerifyOtp: React.FC<Props> = ({ phoneNumber }) => {
  const form = useVerifyOtpForm();

  const handleVerity = async () => {};

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
        onChange={form.handleChange}
      />
      <Button radius="xl" mt="sm" fullWidth onClick={handleVerity} disabled={!form.isValid}>
        Verify
      </Button>
    </Stack>
  );
};
