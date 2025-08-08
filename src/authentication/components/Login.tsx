import { useState } from "react";
import { VerifyOtp } from "./VerifyOtp";
import { Conditional } from "src/components";
import { useLoginForm } from "../hooks/useLoginForm";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { getPhoneNumberWithCode } from "src/helpers/phone-numbers";
import {
  Paper,
  TextInput,
  Container,
  Button,
  PasswordInput,
  Anchor,
  Group,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ResetPasswordModal } from "./ResetPasswordModal";

export const Login: React.FC = () => {
  const form = useLoginForm();
  const [showOtp, setShowOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const { handleLogin, loading } = useLoginMutation();

  const handleSubmit = async () => {
    const created = await handleLogin({
      ...form.values,
      phoneNumber: getPhoneNumberWithCode(form.values.phoneNumber),
    });
    if (created) {
      setPhoneNumber(form.values.phoneNumber);
      setShowOtp(true);
      form.resetForm();
    }
  };

  return (
    <>
      <Container size="xs">
        <Paper p="xl" radius="xl" w={500} withBorder>
          <Conditional condition={!showOtp}>
            <TextInput
              size="md"
              mb="md"
              radius="xl"
              withAsterisk
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter Phone Number"
              value={form.values.phoneNumber}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.phoneNumber}
            />
            <PasswordInput
              size="md"
              radius="xl"
              withAsterisk
              name="password"
              label="Password"
              placeholder="Enter password"
              value={form.values.password}
              onChange={form.handleChange}
              error={form.errors.password}
            />
            <Group justify="flex-end">
              <Anchor onClick={open} component="b">
                <Text size="sm">Forget password</Text>
              </Anchor>
            </Group>
            <Button
              size="md"
              radius="xl"
              mt="lg"
              loading={loading}
              disabled={!form.isValid}
              onClick={handleSubmit}
              fullWidth
            >
              Login
            </Button>
          </Conditional>
          <Conditional condition={showOtp}>
            <VerifyOtp phoneNumber={phoneNumber} />
          </Conditional>
        </Paper>
      </Container>
      <ResetPasswordModal opened={opened} onClose={close} />
    </>
  );
};
