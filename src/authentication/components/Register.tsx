import {
  Button,
  Checkbox,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { useRegisterMutation } from "../hooks/useRegisterMutation";
import { useState } from "react";
import { getPhoneNumberWithCode } from "src/helpers/phone-numbers";
import { Conditional } from "src/components";
import { VerifyOtp } from "./VerifyOtp";

export const Register: React.FC = () => {
  const [showOtp, setShowOtp] = useState(true);
  const [phoneNumber, sesPhoneNumber] = useState<string>("");
  const form = useRegisterForm();
  const { register, loading } = useRegisterMutation();

  const handleSubmit = async () => {
    const created = await register({
      ...form.values,
      phoneNumber: getPhoneNumberWithCode(form.values.phoneNumber),
    });
    if (created) {
      sesPhoneNumber(form.values.phoneNumber);
      setShowOtp(true);
      form.resetForm();
    }
  };

  return (
    <Container size="xs">
      <Paper p="xl" radius="xl" mt="md" maw={500} withBorder>
        <Conditional condition={!showOtp}>
          <Stack gap="sm" w={400} mx="auto">
            <TextInput
              size="md"
              radius="xl"
              name="firstName"
              label="First Nmae"
              placeholder="Enter first name"
              value={form.values.firstName}
              onChange={form.handleChange}
              error={form.touched.firstName ? form.errors.firstName : ""}
            />
            <TextInput
              name="lastName"
              label="last Name"
              placeholder="Enter last name"
              radius="xl"
              value={form.values.lastName}
              onChange={form.handleChange}
              error={form.touched.lastName ? form.errors.lastName : ""}
            />
            <TextInput
              size="md"
              radius="xl"
              withAsterisk
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter phone Number"
              value={form.values.phoneNumber}
              onChange={form.handleChange}
              error={form.errors.phoneNumber}
            />
            <PasswordInput
              size="md"
              radius="xl"
              name="password"
              label="Password"
              placeholder="Enter password"
              value={form.values.password}
              onChange={form.handleChange}
              error={form.touched.password ? form.errors.password : ""}
            />
            <Checkbox label="Remember me" />
            <Button
              size="md"
              radius="xl"
              mt="md"
              disabled={!form.isValid}
              loading={loading}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Stack>
        </Conditional>
        <Conditional condition={showOtp}>
          <VerifyOtp phoneNumber={phoneNumber} />
        </Conditional>
      </Paper>
    </Container>
  );
};
