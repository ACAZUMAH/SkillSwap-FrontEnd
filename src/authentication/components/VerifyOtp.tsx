import { Button, PinInput, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconDeviceMobileMessage } from "@tabler/icons-react";
import React from "react";
import { getPhoneNumberWithoutCode } from "src/helpers/phone-numbers";

interface Props {
  phoneNumber: string;
}
export const VerifyOtp: React.FC<Props> = ({ phoneNumber }) => {
  return (
    <Stack align="center" gap="md" w={400} mx="auto">
      <Text>
        Enter the OTP sent to&nbsp;{" "}
        <b>{getPhoneNumberWithoutCode(phoneNumber)}</b>
      </Text>
      <ThemeIcon c="brand" bg="transparent" size={80}>
        <IconDeviceMobileMessage size={80} stroke={1.5}/>
      </ThemeIcon>
      <PinInput size="md" length={5} />
      <Button radius="xl" mt="sm" fullWidth>
        Verify
      </Button>
    </Stack>
  );
};
