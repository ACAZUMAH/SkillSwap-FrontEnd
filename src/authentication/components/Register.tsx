import { useState } from "react";
import {
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";

export const Register: React.FC = () => {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Paper withBorder p="xl" radius="xl">
      <Stack gap="md" w={400} mx="auto">
        <TextInput
          size="md"
          radius="xl"
          name="firstName"
          label="First Nmae"
          placeholder="Enter first name"
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
        />
        <TextInput
          name="lastName"
          label="last Name"
          placeholder="Enter last name"
          radius="xl"
        />
        <TextInput
          size="md"
          radius="xl"
          withAsterisk
          name="phoneNumber"
          label="Phone Number"
          placeholder="Enter phone Number"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <PasswordInput
          size="md"
          radius="xl"
          name="password"
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Checkbox label="Remember me" />
        <Button size="md" radius="xl" mt="md">
          Register
        </Button>
      </Stack>
    </Paper>
  );
};
